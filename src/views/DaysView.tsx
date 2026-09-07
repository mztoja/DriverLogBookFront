import React from "react";
import {AppMainElementsTypes} from "../types/AppMainElementsTypes";
import { UserInterface } from "types";
import {MenuLabelTypes} from "../types/MenuLabelTypes";
import { DaysList } from "../components/days/DaysList";

interface Props extends AppMainElementsTypes {
    userData: UserInterface;
    page: keyof MenuLabelTypes;
}

export const DaysView = (props: Props) => (
    <DaysList lang={props.userData.lang}/>
);
