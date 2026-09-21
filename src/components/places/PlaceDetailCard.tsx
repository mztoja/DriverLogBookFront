import React, {Dispatch, SetStateAction} from "react";
import {useNavigate} from "react-router-dom";
import {places} from "../../assets/txt/places";
import {PlaceInterface, UserInterface} from "types";
import {ActionButton} from "../common/ActionButton";
import {useAlert} from "../../hooks/useAlert";
import {useApi} from '../../hooks/useApi';
import {apiPaths} from "../../config/api";
import {commons} from "../../assets/txt/commons";
import DetailsIcon from '@mui/icons-material/Details';
import RoomIcon from '@mui/icons-material/Room';
import NavigationIcon from '@mui/icons-material/Navigation';
import EditIcon from "@mui/icons-material/Edit";
import {formatText} from "../../utils/formats/formatText";
import DirectionsIcon from '@mui/icons-material/Directions';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import AssignmentIcon from '@mui/icons-material/Assignment';

interface Props {
    userData: UserInterface;
    setUserData: Dispatch<SetStateAction<UserInterface | null>>;
    place: PlaceInterface;
    onEdit: (place: PlaceInterface) => void;
}

// Karta szczegółów miejsca (GPS, opis, akcje) — wydzielona z PlacesList, żeby lista i mapa
// pokazywały dokładnie tę samą treść po kliknięciu w punkt.
export const PlaceDetailCard = (props: Props) => {

    const {setAlert} = useAlert();
    const {fetchDataOld} = useApi();
    const navigate = useNavigate();

    const markPlace = async (id: number, info: string): Promise<void> => {
        const result = await fetchDataOld(apiPaths.markDepart, 'PATCH', {placeId: id});
        if (result && !result.success) {
            setAlert(commons[props.userData.lang].apiConnectionError, 'error');
        } else {
            if (result && result.responseData) {
                if (!result.responseData.dtc) {
                    setAlert(places[props.userData.lang].markedPlace + ' ' + info, 'success');
                    const changedUser = props.userData;
                    changedUser.markedDepart = result.responseData;
                    props.setUserData(changedUser);
                } else {
                    setAlert(places[props.userData.lang].markedPlaceError, 'warning');
                }
            }
        }
    }

    const openGoogleMaps = (co: string): void => {
        window.open(`https://www.google.com/maps/search/?api=1&query=${co}`, '_blank', 'noopener,noreferrer');
    }

    const place = props.place;

    return (
        <>
            <div>
                <RoomIcon/><br/>
                {place.lat}, {place.lon}
            </div>
            {place.description !== null && (
                <div>
                    <DetailsIcon/><br/>
                    <div dangerouslySetInnerHTML={{__html: formatText(place.description)}}/>
                </div>
            )}
            <br/>
            <div>
                <ActionButton
                    icon={<DirectionsIcon/>}
                    onClick={() => openGoogleMaps(place.street + ' ' + place.code + ' ' + place.city)}>
                    {places[props.userData.lang].googleMapsLabel} ({places[props.userData.lang].directions})
                </ActionButton>
            </div>
            {Number(place.lat) > 0.001 && <div>
                <ActionButton
                    icon={<LocationSearchingIcon/>}
                    onClick={() => openGoogleMaps(place.lat + ', ' + place.lon)}>
                    {places[props.userData.lang].googleMapsLabel} ({places[props.userData.lang].gps})
                </ActionButton>
            </div>}
            <br/>
            <div>
                <ActionButton
                    icon={<NavigationIcon/>}
                    onClick={() => markPlace(place.id, place.name + ' - ' + place.city)}>
                    {places[props.userData.lang].navigateSwitchLabel}
                </ActionButton>
            </div>
            <br/>
            <div>
                <ActionButton
                    icon={<EditIcon/>}
                    onClick={() => props.onEdit(place)}>
                    {places[props.userData.lang].edit}
                </ActionButton>
            </div>
            <br/>
            <div>
                <ActionButton
                    icon={<AssignmentIcon/>}
                    onClick={() => navigate('/logs/' + place.id)}>
                    {places[props.userData.lang].showActivities}
                </ActionButton>
            </div>
        </>
    );
};
