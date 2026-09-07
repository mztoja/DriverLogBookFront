import React from "react";
import {AppMainElementsTypes} from "../types/AppMainElementsTypes";
import {MenuLabelTypes} from "../types/MenuLabelTypes";
import { UserInterface } from "types";
import { LoadingsList } from "../components/loadings/LoadingsList";

interface Props extends AppMainElementsTypes {
    userData: UserInterface;
    page: keyof MenuLabelTypes;
}

export const LoadingsView = (props: Props) => (
    <LoadingsList lang={props.userData.lang}/>
);
