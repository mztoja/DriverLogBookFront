import React, {Dispatch, SetStateAction, useState} from "react";
import {TopBar} from "../components/bars/TopBar/TopBar";
import {Content} from "../components/bars/Content/Content";
import {AppMainElementsTypes} from "../types/AppMainElementsTypes";
import { UserInterface } from "types";
import {MenuLabelTypes} from "../types/MenuLabelTypes";
import {AddPlace} from "../components/places/AddPlace";
import {PlacesList} from "../components/places/PlacesList";
import {Fab} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface Props extends AppMainElementsTypes {
    userData: UserInterface;
    page: keyof MenuLabelTypes;
    setUserData: Dispatch<SetStateAction<UserInterface | null>>;
}

export const PlacesView = (props: Props) => {

    const [refresh, setRefresh] = useState<boolean>(false);
    const [showAddPlace, setShowAddPlace] = useState<boolean>(false);

    return (
        <>
            <TopBar page={props.page} lang={props.userData.lang} userData={props.userData} setUserData={props.setUserData}/>
            <Content>
                <div>
                    {!showAddPlace &&
                        <Fab  onClick={() => setShowAddPlace(true)} color="primary" aria-label="add"><AddIcon /></Fab>
                    }
                </div>
                <br/>
                <AddPlace lang={props.userData.lang} setRefresh={setRefresh} show={showAddPlace} setShow={setShowAddPlace}/>
                <PlacesList userData={props.userData} setUserData={props.setUserData} refresh={refresh} setRefresh={setRefresh}/>
            </Content>
        </>
    );
};