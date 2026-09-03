import {createContext, ReactNode, useCallback, useMemo, useRef, useState} from 'react';
import {PlaceInterface} from 'types';
import {apiPaths, apiURL} from '../config/api';

interface PlacesCtx {
    places: PlaceInterface[] | null; // null = jeszcze nie pobrano / błąd
    loading: boolean;
    ensurePlaces: () => void;           // pobierz, jeśli listy nie ma (leniwie, z dedupe)
    refreshPlaces: () => Promise<void>; // wymuś pobranie i podmień (po dodaniu / edycji miejsca)
    syncPlaces: () => Promise<void>;    // pobierz w tle, podmień tylko gdy dane się różnią
}

export const PlacesContext = createContext<PlacesCtx>({
    places: null,
    loading: false,
    ensurePlaces: () => {},
    refreshPlaces: async () => {},
    syncPlaces: async () => {},
});

interface Props {
    children?: ReactNode;
}

export const PlacesProvider = ({children}: Props) => {
    const [places, setPlaces] = useState<PlaceInterface[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const inFlight = useRef<boolean>(false);

    // Surowy fetch (bez useApi – żeby jego wewnętrzny `loading` nie re-renderował providera).
    const load = useCallback(async (): Promise<PlaceInterface[] | null> => {
        if (inFlight.current) return null;
        inFlight.current = true;
        setLoading(true);
        try {
            const r = await fetch(apiURL + apiPaths.getPlaces, {
                method: 'GET',
                headers: {Accept: 'application/json'},
                credentials: 'include',
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

    const value = useMemo(
        () => ({places, loading, ensurePlaces, refreshPlaces, syncPlaces}),
        [places, loading, ensurePlaces, refreshPlaces, syncPlaces],
    );

    return <PlacesContext.Provider value={value}>{children}</PlacesContext.Provider>;
};
