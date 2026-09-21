import React, {Dispatch, SetStateAction, useMemo, useState} from "react";
import {MapContainer, Marker, Tooltip, TileLayer, useMap} from "react-leaflet";
import L from "leaflet";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import {CircularProgress} from "@mui/material";
import {places} from "../../assets/txt/places";
import {form} from "../../assets/txt/form";
import {PlaceInterface, UserInterface} from "types";
import {usePlaces} from "../../hooks/usePlaces";
import {PlaceEdit} from "./PlaceEdit";
import {PlaceDetailCard} from "./PlaceDetailCard";
import {Modal, ModalContent, StyledBackdrop} from "../common/Modal";
import {useAlert} from "../../hooks/useAlert";
import {WindowYesNo} from "../common/WindowYesNo";
import {getPlaceMarkerIcon} from "./placeMarkerIcon";
import {PlaceTypeSelect} from "../common/form/place/PlaceTypeSelect";

// Gotcha webpack+Leaflet: domyślne ścieżki ikon pinezki liczone są względem base URL
// budowanego bundla i wychodzą błędne — trzeba je jawnie podpiąć.
L.Icon.Default.mergeOptions({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
});

interface Props {
    userData: UserInterface;
    setUserData: Dispatch<SetStateAction<UserInterface | null>>;
}

// Dopasowuje widoczny obszar mapy do wszystkich pinezek, raz przy pierwszym renderze.
const FitBounds = ({positions}: { positions: [number, number][] }) => {
    const map = useMap();
    React.useEffect(() => {
        if (positions.length > 0) {
            map.fitBounds(positions, {padding: [30, 30], maxZoom: 14});
        }
        // eslint-disable-next-line
    }, [positions.length]);
    return null;
};

export const PlacesMap = (props: Props) => {

    const {setAlert} = useAlert();
    // geocodeRunning/geocodeActiveMode/geocodeDone/geocodeTotal/startGeocode żyją w PlacesContext
    // (nie lokalnie tutaj) — dzięki temu przebieg i jego pasek postępu przetrwają odmontowanie
    // tego komponentu (przełączenie karty Lista/Mapa, wyjście z /places i powrót): sam request
    // do backendu i tak leciałby dalej w tle, ale bez tego lokalny stan spinnera by go "gubił".
    const {
        places: data, loading, refreshPlaces,
        geocodeRunning, geocodeActiveMode, geocodeDone, geocodeTotal, startGeocode,
    } = usePlaces();
    const [chosenPlace, setChosenPlace] = useState<PlaceInterface | null>(null);
    const [selectedPlace, setSelectedPlace] = useState<PlaceInterface | null>(null);
    // null = brak otwartego potwierdzenia; inaczej tryb, którego dotyczy pytanie
    const [geocodeConfirmMode, setGeocodeConfirmMode] = useState<'full' | 'partial' | null>(null);
    const [filterType, setFilterType] = useState<string>('999');

    const hasLat = (place: PlaceInterface): boolean => Number(place.lat) > 0.001;
    const hasLon = (place: PlaceInterface): boolean => Number(place.lon) > 0.001;

    // pinezka wymaga CHOĆ JEDNEJ wpisanej współrzędnej — miejsca z tylko jedną (partial)
    // trafiają na mapę też, ale z widocznym oznaczeniem niekompletności (patrz placeMarkerIcon.ts),
    // bo ich pozycja jest z definicji niedokładna (brakująca współrzędna wynosi 0)
    const coordPlaces = useMemo(
        () => (data ?? []).filter((place) => hasLat(place) || hasLon(place)),
        [data]
        // eslint-disable-next-line react-hooks/exhaustive-deps
    );

    // liczniki liczone zawsze po wszystkich kategoriach — geokodowanie naprawia współrzędne
    // niezależnie od tego, co akurat pokazuje filtr kategorii
    const hiddenCount = useMemo(
        () => (data ?? []).filter((place) => !hasLat(place) && !hasLon(place)).length,
        [data]
        // eslint-disable-next-line react-hooks/exhaustive-deps
    );
    const partialCount = useMemo(
        () => (data ?? []).filter((place) => hasLat(place) !== hasLon(place)).length,
        [data]
        // eslint-disable-next-line react-hooks/exhaustive-deps
    );

    const pinnedPlaces = useMemo(
        () => Number(filterType) === 999 ? coordPlaces : coordPlaces.filter((place) => place.type === Number(filterType)),
        [coordPlaces, filterType]
    );

    const positions = useMemo<[number, number][]>(
        () => pinnedPlaces.map((place) => [Number(place.lat), Number(place.lon)]),
        [pinnedPlaces]
    );

    // Uruchamia geokodowanie w PlacesContext (patrz komentarz przy destrukturyzacji usePlaces()
    // powyżej) — od tego momentu ten komponent tylko odczytuje współdzielony stan postępu.
    const runGeocode = (mode: 'full' | 'partial'): void => {
        setGeocodeConfirmMode(null);
        startGeocode(mode, props.userData.lang, setAlert);
    }

    if (!data && loading) {
        return <CircularProgress/>
    }
    if (!data) {
        return <>{places[props.userData.lang].apiError}</>
    }

    return (
        <div className="TableView">
            <main className="Table">
                <section className="Table__Header">
                    <div className="Table__HeaderRow">
                        <span className="Table__Title">{places[props.userData.lang].tableHeader}</span>
                    </div>
                </section>
                <section className="Table__Body PlacesMap">
                    {chosenPlace && <PlaceEdit
                        lang={props.userData.lang}
                        place={chosenPlace}
                        setPlace={setChosenPlace}
                        setAlert={setAlert}
                    />}
                    {selectedPlace && (
                        <Modal
                            aria-labelledby="unstyled-modal-title"
                            aria-describedby="unstyled-modal-description"
                            open={selectedPlace !== null}
                            onClose={() => setSelectedPlace(null)}
                            slots={{backdrop: StyledBackdrop}}
                        >
                            <ModalContent sx={{width: 400}}>
                                <h2 onClick={() => setSelectedPlace(null)}>
                                    {selectedPlace.name} - {selectedPlace.city}
                                </h2>
                                <div className="PlacesMap__address">
                                    {selectedPlace.street ? `${selectedPlace.street}, ` : ''}
                                    {selectedPlace.code} {selectedPlace.city}, {selectedPlace.country}
                                </div>
                                <div className="PlacesMap__category">
                                    {form[props.userData.lang][`placeType${selectedPlace.type}`]}
                                </div>
                                <PlaceDetailCard
                                    userData={props.userData}
                                    setUserData={props.setUserData}
                                    place={selectedPlace}
                                    onEdit={(place) => {
                                        setSelectedPlace(null);
                                        setChosenPlace(place);
                                    }}
                                />
                            </ModalContent>
                        </Modal>
                    )}
                    <WindowYesNo
                        lang={props.userData.lang}
                        show={geocodeConfirmMode !== null}
                        text={geocodeConfirmMode === 'partial'
                            ? places[props.userData.lang].mapGeocodePartialConfirm
                            : places[props.userData.lang].mapGeocodeConfirm}
                        onYes={() => geocodeConfirmMode && runGeocode(geocodeConfirmMode)}
                        onNo={() => setGeocodeConfirmMode(null)}
                    />
                    <div className="PlacesMap__filter">
                        <PlaceTypeSelect lang={props.userData.lang} value={filterType}
                                         onChange={e => setFilterType(e)} displayAll={true}/>
                    </div>
                    <MapContainer center={[52, 19]} zoom={5} scrollWheelZoom={true}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <FitBounds positions={positions}/>
                        {pinnedPlaces.map((place) => {
                            const isPartial = hasLat(place) !== hasLon(place);
                            return (
                                <Marker
                                    key={place.id}
                                    position={[Number(place.lat), Number(place.lon)]}
                                    icon={getPlaceMarkerIcon(place.type, isPartial)}
                                    eventHandlers={{click: () => setSelectedPlace(place)}}
                                >
                                    <Tooltip>
                                        {place.name} - {place.city}
                                        {isPartial ? ` ${places[props.userData.lang].mapPartialMarkerNote}` : ''}
                                    </Tooltip>
                                </Marker>
                            );
                        })}
                    </MapContainer>
                    {(hiddenCount > 0 || partialCount > 0) && (
                        <div className="PlacesMap__badges">
                            {hiddenCount > 0 && (
                                <div
                                    className={"PlacesMap__badge" + (geocodeActiveMode === 'full' ? " PlacesMap__badge--loading" : "")}
                                    onClick={() => !geocodeRunning && setGeocodeConfirmMode('full')}
                                >
                                    {geocodeActiveMode === 'full'
                                        ? <><CircularProgress size={14}/>&nbsp;{places[props.userData.lang].mapGeocodeProgress(geocodeDone, geocodeTotal)}</>
                                        : places[props.userData.lang].mapHiddenPlaces(hiddenCount)}
                                </div>
                            )}
                            {partialCount > 0 && (
                                <div
                                    className={"PlacesMap__badge" + (geocodeActiveMode === 'partial' ? " PlacesMap__badge--loading" : "")}
                                    onClick={() => !geocodeRunning && setGeocodeConfirmMode('partial')}
                                >
                                    {geocodeActiveMode === 'partial'
                                        ? <><CircularProgress size={14}/>&nbsp;{places[props.userData.lang].mapGeocodeProgress(geocodeDone, geocodeTotal)}</>
                                        : places[props.userData.lang].mapPartialPlaces(partialCount)}
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};
