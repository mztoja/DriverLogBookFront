import React from "react";
import {TopBar} from "../components/bars/TopBar/TopBar";
import {Content} from "../components/bars/Content/Content";
import {AppMainElementsTypes} from "../types/AppMainElementsTypes";
import { UserInterface, TourInterface } from "types";
import {MenuLabelTypes} from "../types/MenuLabelTypes";
import {ActivitiesFieldsets} from "../components/main/ActivitiesFieldsets";

interface Props extends AppMainElementsTypes {
    userData: UserInterface;
    page: keyof MenuLabelTypes;
    tourData: TourInterface | null;
}

export const HomeView = (props: Props) => (
    <>
        <TopBar page={props.page} lang={props.userData.lang} userData={props.userData} setUserData={props.setUserData}/>
        <Content>
            <ActivitiesFieldsets lang={props.userData.lang} tourData={props.tourData} userData={props.userData}/>
        </Content>
    </>
);
