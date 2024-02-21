import {AppMainElementsTypes} from "../types/AppMainElementsTypes";
import {MenuLabelTypes} from "../types/MenuLabelTypes";
import {TopBar} from "../components/bars/TopBar/TopBar";
import {Content} from "../components/bars/Content/Content";
import { UserInterface } from "types";
import React from "react";
import { LoadingsList } from "../components/loadings/LoadingsList";

interface Props extends AppMainElementsTypes {
    userData: UserInterface;
    page: keyof MenuLabelTypes;
}

export const LoadingsView = (props:Props) => (
    <>
        <TopBar page={props.page} lang={props.userData.lang} userData={props.userData} setUserData={props.setUserData}/>
        <Content>
            <LoadingsList lang={props.userData.lang}/>
        </Content>
    </>
);