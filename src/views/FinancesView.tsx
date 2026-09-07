import React from "react";
import {AppMainElementsTypes} from "../types/AppMainElementsTypes";
import { UserInterface } from "types";
import {MenuLabelTypes} from "../types/MenuLabelTypes";
import {FinancesList} from "../components/finances/FinancesList";

interface Props extends AppMainElementsTypes {
    userData: UserInterface;
    page: keyof MenuLabelTypes;
}

export const FinancesView = (props: Props) => (
    <FinancesList lang={props.userData.lang}/>
);
