import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {AppMainElementsTypes} from "../types/AppMainElementsTypes";
import { UserInterface } from "types";
import {MenuLabelTypes} from "../types/MenuLabelTypes";
import {AddPlace} from "../components/places/AddPlace";
import {PlacesList} from "../components/places/PlacesList";
import {PlacesMap} from "../components/places/PlacesMap";
import { usePlaces } from "../hooks/usePlaces";
import {TableTabs} from "../components/common/TableTabs";
import {places} from "../assets/txt/places";

interface Props extends AppMainElementsTypes {
    userData: UserInterface;
    page: keyof MenuLabelTypes;
    setUserData: Dispatch<SetStateAction<UserInterface | null>>;
}

export const PlacesView = (props: Props) => {

    const [showAddPlace, setShowAddPlace] = useState<boolean>(false);
    const {syncPlaces, mapTab, setMapTab} = usePlaces();

    // Wejście na listę miejsc – pobierz w tle i podmień tylko gdy różne od stanu globalnego.
    useEffect(() => {
        syncPlaces();
    }, [syncPlaces]);

    return (
        <>
            <AddPlace lang={props.userData.lang} show={showAddPlace} setShow={setShowAddPlace}/>

            <TableTabs
                active={mapTab}
                onChange={(k) => setMapTab(k as "list" | "map")}
                tabs={[
                    {key: "list", label: places[props.userData.lang].tableHeader},
                    {key: "map", label: places[props.userData.lang].mapTab},
                ]}
            />

            {mapTab === "list"
                ? <PlacesList userData={props.userData} setUserData={props.setUserData} showAddButton={showAddPlace} setShowAddPlace={setShowAddPlace} />
                : <PlacesMap userData={props.userData} setUserData={props.setUserData} />}
        </>
    );
};
