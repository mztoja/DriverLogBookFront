import React from "react";
import {AppMainElementsTypes} from "../types/AppMainElementsTypes";
import {TopBar} from "../components/bars/TopBar/TopBar";
import {Content} from "../components/bars/Content/Content";
import { UserInterface } from "types";
import {MenuLabelTypes} from "../types/MenuLabelTypes";
import { DaysList } from "../components/days/DaysList";

interface Props extends AppMainElementsTypes {
    userData: UserInterface;
    page: keyof MenuLabelTypes;
}

export const DaysView = (props: Props) => (
    <>
        <TopBar page={props.page} lang={props.userData.lang} userData={props.userData} setUserData={props.setUserData}/>
        <Content>
            <DaysList lang={props.userData.lang}/>
        </Content>
    </>
);