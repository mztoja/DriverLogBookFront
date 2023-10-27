import React, {useState} from "react";
import {TopBar} from "../components/bars/TopBar/TopBar";
import {Content} from "../components/bars/Content/Content";
import {AppMainElementsTypes} from "../types/AppMainElementsTypes";
import { UserInterface } from "types";
import {MenuLabelTypes} from "../types/MenuLabelTypes";
import {AddPlace} from "../components/places/AddPlace";
import {PlacesList} from "../components/places/PlacesList";

interface Props extends AppMainElementsTypes {
    userData: UserInterface;
    page: keyof MenuLabelTypes;
}

export const PlacesView = (props: Props) => {

    const [refresh, setRefresh] = useState<boolean>(false);

    return (
        <>
            <TopBar page={props.page} lang={props.userData.lang} userData={props.userData} setUserData={props.setUserData}/>
            <Content>
                <AddPlace userId={props.userData.id} lang={props.userData.lang} setRefresh={setRefresh}/>
                <PlacesList userData={props.userData} refresh={refresh}/>
            </Content>
        </>
    );
};