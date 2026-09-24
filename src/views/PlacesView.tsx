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
import {friends} from "../assets/txt/friends";
import {FriendsList} from "../components/places/FriendsList";

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
                onChange={(k) => setMapTab(k as "list" | "map" | "friends")}
                tabs={[
                    {key: "list", label: places[props.userData.lang].tableHeader},
                    {key: "map", label: places[props.userData.lang].mapTab},
                    {key: "friends", label: friends[props.userData.lang].friendsTab},
                ]}
            />

            {mapTab === "list" &&
                <PlacesList userData={props.userData} setUserData={props.setUserData} showAddButton={showAddPlace} setShowAddPlace={setShowAddPlace} />}
            {mapTab === "map" && <PlacesMap userData={props.userData} setUserData={props.setUserData} />}
            {mapTab === "friends" && <FriendsList lang={props.userData.lang} />}
        </>
    );
};
