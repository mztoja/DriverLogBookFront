import {createContext, Dispatch, ReactNode, SetStateAction, useCallback, useMemo, useRef, useState} from 'react';
import {PlaceInterface, userLangEnum} from 'types';
import {apiPaths} from '../config/api';
import {apiFetch} from '../utils/apiFetch';
import {useApi} from '../hooks/useApi';
import {SetAlertType} from './AlertContext';
import {places as placesTxt} from '../assets/txt/places';

export type GeocodeMode = 'full' | 'partial';

interface PlacesCtx {
    places: PlaceInterface[] | null; // null = jeszcze nie pobrano / błąd
    loading: boolean;
    ensurePlaces: () => void;           // pobierz, jeśli listy nie ma (leniwie, z dedupe)
    refreshPlaces: () => Promise<void>; // wymuś pobranie i podmień (po dodaniu / edycji miejsca)
    syncPlaces: () => Promise<void>;    // pobierz w tle, podmień tylko gdy dane się różnią
    // Stan geokodowania (mapa /places) trzymany tutaj — nie lokalnie w PlacesMap — żeby
    // przetrwał przełączenie karty Lista/Mapa albo wyjście z /places i powrót: PlacesProvider
    // opina cały routing w LoggedInView i nie odmontowuje się przy tych nawigacjach, a sama
    // pętla geokodowania i tak leci dalej w tle niezależnie od tego, czy ktoś ją ogląda.
    geocodeRunning: boolean;
    geocodeActiveMode: GeocodeMode | null;
    geocodeDone: number;
    geocodeTotal: number;
    startGeocode: (mode: GeocodeMode, lang: userLangEnum, setAlert: (text: string, type: SetAlertType) => void) => void;
    // Stan widoku karty /places (aktywna karta Lista/Mapa, przełączniki warstw pinezek na mapie,
    // filtr kategorii) trzymany tutaj z tego samego powodu co stan geokodowania wyżej — żeby
    // przetrwał odmontowanie PlacesView/PlacesMap (przełączenie na inną trasę i powrót).
    mapTab: 'list' | 'map';
    setMapTab: Dispatch<SetStateAction<'list' | 'map'>>;
    showPlacesLayer: boolean;
    setShowPlacesLayer: Dispatch<SetStateAction<boolean>>;
    showFriendsLayer: boolean;
    setShowFriendsLayer: Dispatch<SetStateAction<boolean>>;
    mapFilterType: string;
    setMapFilterType: Dispatch<SetStateAction<string>>;
}

export const PlacesContext = createContext<PlacesCtx>({
    places: null,
    loading: false,
    ensurePlaces: () => {},
    refreshPlaces: async () => {},
    syncPlaces: async () => {},
    geocodeRunning: false,
    geocodeActiveMode: null,
    geocodeDone: 0,
    geocodeTotal: 0,
    startGeocode: () => {},
    mapTab: 'list',
    setMapTab: () => {},
    showPlacesLayer: false,
    setShowPlacesLayer: () => {},
    showFriendsLayer: true,
    setShowFriendsLayer: () => {},
    mapFilterType: '999',
    setMapFilterType: () => {},
});

interface Props {
    children?: ReactNode;
}

export const PlacesProvider = ({children}: Props) => {
    const [places, setPlaces] = useState<PlaceInterface[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const inFlight = useRef<boolean>(false);
    const placesRef = useRef<PlaceInterface[] | null>(null);
    placesRef.current = places;

    // apiFetch (nie useApi) – żeby wewnętrzny `loading` useApi nie re-renderował providera,
    // ale wciąż z obsługą 401 → odnowienie sesji → retry.
    const load = useCallback(async (): Promise<PlaceInterface[] | null> => {
        if (inFlight.current) return null;
        inFlight.current = true;
        setLoading(true);
        try {
            const r = await apiFetch(apiPaths.getPlaces, {
                method: 'GET',
                headers: {Accept: 'application/json'},
            });
            if (!r.ok) return null;
            const d = await r.json();
            return Array.isArray(d) ? (d as PlaceInterface[]) : null; // {dtc} → nie tablica → null
        } catch {
            return null;
        } finally {
            inFlight.current = false;
            setLoading(false);
        }
    }, []);

    const ensurePlaces = useCallback(() => {
        if (places === null && !inFlight.current) {
            load().then((l) => {
                if (l) setPlaces(l);
            });
        }
    }, [places, load]);

    const refreshPlaces = useCallback(async () => {
        const l = await load();
        if (l) setPlaces(l);
    }, [load]);

    const syncPlaces = useCallback(async () => {
        const l = await load();
        if (l) {
            setPlaces((prev) => (JSON.stringify(prev) === JSON.stringify(l) ? prev : l));
        }
    }, [load]);

    // Ta sama instancja useApi() dla całego przebiegu geokodowania — nie próbujemy tu użyć
    // jej `loading` (pulsuje między pojedynczymi wywołaniami pętli), postęp liczymy sami.
    const {fetchData: fetchGeocode} = useApi();
    const [geocodeRunning, setGeocodeRunning] = useState<boolean>(false);
    const [geocodeActiveMode, setGeocodeActiveMode] = useState<GeocodeMode | null>(null);
    const [geocodeDone, setGeocodeDone] = useState<number>(0);
    const [geocodeTotal, setGeocodeTotal] = useState<number>(0);
    const geocodeRunningRef = useRef<boolean>(false);

    const [mapTab, setMapTab] = useState<'list' | 'map'>('list');
    // Domyślnie tylko znajomi — miejsca trzeba świadomie włączyć (przełącznik w PlacesMap).
    const [showPlacesLayer, setShowPlacesLayer] = useState<boolean>(false);
    const [showFriendsLayer, setShowFriendsLayer] = useState<boolean>(true);
    const [mapFilterType, setMapFilterType] = useState<string>('999');

    const startGeocode = useCallback((
        mode: GeocodeMode,
        lang: userLangEnum,
        setAlert: (text: string, type: SetAlertType) => void,
    ): void => {
        if (geocodeRunningRef.current) return;
        geocodeRunningRef.current = true;

        const hasLat = (place: PlaceInterface): boolean => Number(place.lat) > 0.001;
        const hasLon = (place: PlaceInterface): boolean => Number(place.lon) > 0.001;
        const current = placesRef.current ?? [];
        const total = mode === 'full'
            ? current.filter((place) => !hasLat(place) && !hasLon(place)).length
            : current.filter((place) => hasLat(place) !== hasLon(place)).length;

        setGeocodeActiveMode(mode);
        setGeocodeTotal(total);
        setGeocodeDone(0);
        setGeocodeRunning(true);

        (async () => {
            const excludeIds: number[] = [];
            let geocoded = 0;
            let failed = 0;

            // Zakończenie gwarantowane: każda iteracja trwale usuwa jedno miejsce z puli
            // do przetworzenia (udane — znika z puli, nieudane — trafia do excludeIds).
            while (true) {
                const res = await fetchGeocode<{ finished: boolean; placeId?: number; success?: boolean }>(
                    apiPaths.geocodeNextPlace,
                    {method: 'POST', sendData: {excludeIds, mode}},
                    {setAlert, lang}
                );
                if (!res.success || !res.responseData || res.responseData.finished) {
                    break;
                }
                if (res.responseData.placeId !== undefined) {
                    excludeIds.push(res.responseData.placeId);
                }
                if (res.responseData.success) {
                    geocoded++;
                } else {
                    failed++;
                }
                setGeocodeDone((prev) => prev + 1);
            }

            setGeocodeRunning(false);
            setGeocodeActiveMode(null);
            geocodeRunningRef.current = false;
            setAlert(placesTxt[lang].mapGeocodeResult(geocoded, failed), 'success');
            await refreshPlaces();
        })();
    }, [fetchGeocode, refreshPlaces]);

    const value = useMemo(
        () => ({
            places, loading, ensurePlaces, refreshPlaces, syncPlaces,
            geocodeRunning, geocodeActiveMode, geocodeDone, geocodeTotal, startGeocode,
            mapTab, setMapTab, showPlacesLayer, setShowPlacesLayer,
            showFriendsLayer, setShowFriendsLayer, mapFilterType, setMapFilterType,
        }),
        [places, loading, ensurePlaces, refreshPlaces, syncPlaces,
            geocodeRunning, geocodeActiveMode, geocodeDone, geocodeTotal, startGeocode,
            mapTab, showPlacesLayer, showFriendsLayer, mapFilterType],
    );

    return <PlacesContext.Provider value={value}>{children}</PlacesContext.Provider>;
};
