import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {AppMainElementsTypes} from "../types/AppMainElementsTypes";
import { UserInterface } from "types";
import {MenuLabelTypes} from "../types/MenuLabelTypes";
import {AddPlace} from "../components/places/AddPlace";
import {PlacesList} from "../components/places/PlacesList";
import {usePlaces} from "../hooks/usePlaces";
import {Fab} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface Props extends AppMainElementsTypes {
    userData: UserInterface;
    page: keyof MenuLabelTypes;
    setUserData: Dispatch<SetStateAction<UserInterface | null>>;
}

export const PlacesView = (props: Props) => {

    const [showAddPlace, setShowAddPlace] = useState<boolean>(false);
    const {syncPlaces} = usePlaces();

    // Wejście na listę miejsc – pobierz w tle i podmień tylko gdy różne od stanu globalnego.
    useEffect(() => {
        syncPlaces();
    }, [syncPlaces]);

    return (
        <>
            <div className="TableView__toolbar">
                {!showAddPlace &&
                    <Fab onClick={() => setShowAddPlace(true)} color="primary" aria-label="add" size="medium"><AddIcon /></Fab>
                }
            </div>
            <AddPlace lang={props.userData.lang} show={showAddPlace} setShow={setShowAddPlace}/>
            <PlacesList userData={props.userData} setUserData={props.setUserData}/>
        </>
    );
};
