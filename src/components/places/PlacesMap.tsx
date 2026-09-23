import React, {Dispatch, SetStateAction, useEffect, useMemo, useState} from "react";
import {MapContainer, Marker, Tooltip, TileLayer, useMap} from "react-leaflet";
import L from "leaflet";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import {CircularProgress} from "@mui/material";
import {places} from "../../assets/txt/places";
import {friends as friendsTxt} from "../../assets/txt/friends";
import {form} from "../../assets/txt/form";
import {FriendCargoInterface, FriendPositionInterface, FriendSummaryInterface, PlaceInterface, UserInterface, userLangEnum} from "types";
import {usePlaces} from "../../hooks/usePlaces";
import {useFriends} from "../../hooks/useFriends";
import {PlaceEdit} from "./PlaceEdit";
import {PlaceDetailCard} from "./PlaceDetailCard";
import {AddFriend} from "./AddFriend";
import {Modal, ModalContent, StyledBackdrop} from "../common/Modal";
import {useAlert} from "../../hooks/useAlert";
import {useApi} from "../../hooks/useApi";
import {apiPaths} from "../../config/api";
import {WindowYesNo} from "../common/WindowYesNo";
import {WindowConfirm} from "../common/WindowConfirm";
import {getPlaceMarkerIcon} from "./placeMarkerIcon";
import {getFriendMarkerIcon, getSelfMarkerIcon} from "./friendMarkerIcon";
import {formatDate} from "../../utils/formats/formatDate";
import {getInitials} from "../../utils/getInitials";
import {PlaceTypeSelect} from "../common/form/place/PlaceTypeSelect";
import {ActionButton} from "../common/ActionButton";
import PeopleIcon from "@mui/icons-material/People";
import RoomIcon from "@mui/icons-material/Room";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

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

// Blok "Ostatnia pozycja" + "Cel" — identyczny dla znajomego i dla nas samych, więc wydzielony
// zamiast powielony w obu modalach.
const FriendPositionInfo = (props: {
    lang: userLangEnum;
    position: FriendPositionInterface | null;
    cargo: FriendCargoInterface | null;
}) => (
    <>
        <div className="PlacesMap__category">
            {friendsTxt[props.lang].lastPositionLabel}
        </div>
        <div className="PlacesMap__address">
            {props.position
                ? `${formatDate(props.position.date, props.lang)} - ` +
                    `${props.position.placeName}` +
                    `${props.position.city ? ' - ' + props.position.city : ''}`
                : friendsTxt[props.lang].noPosition}
        </div>
        <br/>
        <div className="PlacesMap__category">
            {friendsTxt[props.lang].currentCargoLabel}
        </div>
        {props.cargo && (props.cargo.targetPlace || props.cargo.destinations.length > 0)
            ? (
                <>
                    {props.cargo.targetPlace && (
                        <div className="PlacesMap__address">
                            {friendsTxt[props.lang].targetPlaceLabel}: {props.cargo.targetPlace}
                        </div>
                    )}
                    {props.cargo.destinations.length > 0 && (
                        <div className="PlacesMap__address">
                            {friendsTxt[props.lang].loadDestinationsLabel}: {props.cargo.destinations.join(', ')}
                        </div>
                    )}
                </>
            )
            : <div className="PlacesMap__address">{friendsTxt[props.lang].noActiveTour}</div>
        }
    </>
);

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
        // Przełączniki warstw i filtr kategorii trzymane w PlacesContext (nie lokalnie) —
        // żeby przetrwały odmontowanie tego komponentu (przełączenie karty Lista/Mapa,
        // wyjście z /places i powrót), tak samo jak stan geokodowania wyżej.
        showPlacesLayer: showPlaces, setShowPlacesLayer: setShowPlaces,
        showFriendsLayer: showFriends, setShowFriendsLayer: setShowFriends,
        mapFilterType: filterType, setMapFilterType: setFilterType,
    } = usePlaces();
    const {friends: friendsData, refreshFriends} = useFriends();
    const {fetchDataOld} = useApi();
    const [chosenPlace, setChosenPlace] = useState<PlaceInterface | null>(null);
    const [selectedPlace, setSelectedPlace] = useState<PlaceInterface | null>(null);
    const [selectedFriend, setSelectedFriend] = useState<FriendSummaryInterface | null>(null);
    // null = brak otwartego potwierdzenia; inaczej tryb, którego dotyczy pytanie
    const [geocodeConfirmMode, setGeocodeConfirmMode] = useState<'full' | 'partial' | null>(null);
    const [showAddFriend, setShowAddFriend] = useState<boolean>(false);
    const [confirmRemoveFriend, setConfirmRemoveFriend] = useState<boolean>(false);
    const [showSelf, setShowSelf] = useState<boolean>(false);

    // Za każdym wejściem na mapę (zamontowanie tego komponentu) — nie tylko przy braku danych —
    // żeby lista znajomych i oczekujących zaproszeń była aktualna po powrocie z innego miejsca.
    useEffect(() => {
        refreshFriends();
        // eslint-disable-next-line
    }, []);

    const respondToFriendRequest = (friendshipId: number, accept: boolean): void => {
        const path = accept ? apiPaths.acceptFriendRequest : apiPaths.declineFriendRequest;
        fetchDataOld(path, 'POST', {id: friendshipId}).then(() => refreshFriends());
    };

    const removeFriend = (): void => {
        if (!selectedFriend) return;
        fetchDataOld(apiPaths.declineFriendRequest, 'POST', {id: selectedFriend.friendshipId}).then(() => {
            refreshFriends();
            setSelectedFriend(null);
        });
    };

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

    const friendPositions = useMemo<[number, number][]>(
        () => {
            const positions: [number, number][] = (friendsData?.accepted ?? [])
                .filter((friend) => friend.position)
                .map((friend): [number, number] => [friend.position!.lat, friend.position!.lon]);
            if (friendsData?.self.position) {
                positions.push([friendsData.self.position.lat, friendsData.self.position.lon]);
            }
            return positions;
        },
        [friendsData]
    );

    const positions = useMemo<[number, number][]>(
        () => [
            ...(showPlaces ? pinnedPlaces.map((place): [number, number] => [Number(place.lat), Number(place.lon)]) : []),
            ...(showFriends ? friendPositions : []),
        ],
        [pinnedPlaces, friendPositions, showPlaces, showFriends]
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
                    {selectedFriend && (
                        <Modal
                            aria-labelledby="unstyled-modal-title"
                            aria-describedby="unstyled-modal-description"
                            open={selectedFriend !== null}
                            onClose={() => setSelectedFriend(null)}
                            slots={{backdrop: StyledBackdrop}}
                        >
                            <ModalContent sx={{width: 400}}>
                                <h2 onClick={() => setSelectedFriend(null)}>
                                    {selectedFriend.firstName} {selectedFriend.lastName}
                                </h2>
                                <FriendPositionInfo
                                    lang={props.userData.lang}
                                    position={selectedFriend.position}
                                    cargo={selectedFriend.cargo}
                                />
                                <br/>
                                <ActionButton
                                    variant="danger"
                                    icon={<PersonRemoveIcon/>}
                                    onClick={() => setConfirmRemoveFriend(true)}
                                >
                                    {friendsTxt[props.userData.lang].removeFriend}
                                </ActionButton>
                            </ModalContent>
                        </Modal>
                    )}
                    {showSelf && friendsData?.self && (
                        <Modal
                            aria-labelledby="unstyled-modal-title"
                            aria-describedby="unstyled-modal-description"
                            open={showSelf}
                            onClose={() => setShowSelf(false)}
                            slots={{backdrop: StyledBackdrop}}
                        >
                            <ModalContent sx={{width: 400}}>
                                <h2 onClick={() => setShowSelf(false)}>
                                    {friendsTxt[props.userData.lang].selfLabel}
                                    {' '}({friendsData.self.firstName} {friendsData.self.lastName})
                                </h2>
                                <FriendPositionInfo
                                    lang={props.userData.lang}
                                    position={friendsData.self.position}
                                    cargo={friendsData.self.cargo}
                                />
                            </ModalContent>
                        </Modal>
                    )}
                    {selectedFriend && (
                        <WindowConfirm
                            lang={props.userData.lang}
                            show={confirmRemoveFriend}
                            setShow={setConfirmRemoveFriend}
                            text={friendsTxt[props.userData.lang].removeFriendConfirm(
                                `${selectedFriend.firstName} ${selectedFriend.lastName}`,
                            )}
                            execute={removeFriend}
                        />
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
                        <div className="PlacesMap__layerToggles">
                            <ActionButton
                                variant={showFriends ? 'accent' : 'default'}
                                icon={<PeopleIcon/>}
                                onClick={() => setShowFriends(v => !v)}
                            >
                                {friendsTxt[props.userData.lang].friendsToggleLabel}
                            </ActionButton>
                            <ActionButton
                                variant={showPlaces ? 'accent' : 'default'}
                                icon={<RoomIcon/>}
                                onClick={() => setShowPlaces(v => !v)}
                            >
                                {friendsTxt[props.userData.lang].placesToggleLabel}
                            </ActionButton>
                        </div>
                        <ActionButton round icon={<AddIcon/>} onClick={() => setShowAddFriend(true)}
                                      ariaLabel={friendsTxt[props.userData.lang].addFriend}/>
                        {!!friendsData?.incoming.length && (
                            <div className="PlacesMap__friendRequests">
                                <div className="PlacesMap__friendRequestsHeader">
                                    {friendsTxt[props.userData.lang].incomingRequestsHeader}
                                </div>
                                {friendsData.incoming.map((request) => (
                                    <div key={request.friendshipId} className="PlacesMap__friendRequest">
                                        <span>{request.firstName} {request.lastName} ({request.email})</span>
                                        <ActionButton round icon={<CheckIcon/>}
                                                      ariaLabel={friendsTxt[props.userData.lang].accept}
                                                      onClick={() => respondToFriendRequest(request.friendshipId, true)}/>
                                        <ActionButton round variant="danger" icon={<ClearIcon/>}
                                                      ariaLabel={friendsTxt[props.userData.lang].decline}
                                                      onClick={() => respondToFriendRequest(request.friendshipId, false)}/>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <AddFriend lang={props.userData.lang} show={showAddFriend} setShow={setShowAddFriend}/>
                    <MapContainer center={[52, 19]} zoom={5} scrollWheelZoom={true}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <FitBounds positions={positions}/>
                        {showPlaces && pinnedPlaces.map((place) => {
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
                        {showFriends && (friendsData?.accepted ?? []).filter((friend) => friend.position).map((friend) => (
                            <Marker
                                key={friend.friendshipId}
                                position={[friend.position!.lat, friend.position!.lon]}
                                icon={getFriendMarkerIcon(getInitials(friend.firstName, friend.lastName), !!friend.cargo?.destinations.length)}
                                eventHandlers={{click: () => setSelectedFriend(friend)}}
                            >
                                <Tooltip>
                                    {friend.firstName} {friend.lastName}
                                    <br/>
                                    {formatDate(friend.position!.date, props.userData.lang)}
                                </Tooltip>
                            </Marker>
                        ))}
                        {showFriends && friendsData?.self.position && (
                            <Marker
                                position={[friendsData.self.position.lat, friendsData.self.position.lon]}
                                icon={getSelfMarkerIcon(
                                    getInitials(friendsData.self.firstName, friendsData.self.lastName),
                                    !!friendsData.self.cargo?.destinations.length,
                                )}
                                eventHandlers={{click: () => setShowSelf(true)}}
                            >
                                <Tooltip>
                                    {friendsTxt[props.userData.lang].selfLabel}
                                    <br/>
                                    {formatDate(friendsData.self.position.date, props.userData.lang)}
                                </Tooltip>
                            </Marker>
                        )}
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
