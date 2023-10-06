import React from "react";
import {AppMainElementsTypes} from "../types/AppMainElementsTypes";
import {TopBar} from "../components/bars/TopBar/TopBar";
import {Content} from "../components/bars/Content/Content";
import { UserInterface } from "types";
import {MenuLabelTypes} from "../types/MenuLabelTypes";

interface Props extends AppMainElementsTypes {
    userData: UserInterface;
    page: keyof MenuLabelTypes;
}

export const LogsView = (props: Props) => (
    <>
        <TopBar page={props.page} lang={props.userData.lang}/>
        <Content></Content>
    </>
);
