import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {AppMainElementsTypes} from "../types/AppMainElementsTypes";
import { UserInterface } from "types";
import {MenuLabelTypes} from "../types/MenuLabelTypes";
import {LogsList} from "../components/logs/LogsList";
import {usePlaces} from "../hooks/usePlaces";

interface Props extends AppMainElementsTypes {
    userData: UserInterface;
    page: keyof MenuLabelTypes;
}

export const LogsView = (props: Props) => {
    const {placeId} = useParams<{placeId?: string}>();
    const {places, ensurePlaces} = usePlaces();
    const id = placeId ? Number(placeId) : undefined;

    // przy wejściu z linku (bez wcześniejszej wizyty na /places) zapewnij listę miejsc – potrzebna do nazwy w nagłówku
    useEffect(() => {
        if (id) ensurePlaces();
    }, [id, ensurePlaces]);

    const place = id ? places?.find((p) => p.id === id) : undefined;

    return (
        <LogsList
            key={id ?? 'all'}
            lang={props.userData.lang}
            placeId={id}
            placeName={place ? `${place.name} - ${place.city}` : undefined}
        />
    );
};
