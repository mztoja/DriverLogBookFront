import React, {Dispatch, SetStateAction} from "react";
import {TopBar} from "../components/bars/TopBar/TopBar";
import {Content} from "../components/bars/Content/Content";
import {AppMainElementsTypes} from "../types/AppMainElementsTypes";
import { UserInterface, TourInterface, DayInterface } from "types";
import {MenuLabelTypes} from "../types/MenuLabelTypes";
import {ActivitiesFields} from "../components/main/ActivitiesFields";

interface Props extends AppMainElementsTypes {
    userData: UserInterface;
    setUserData: Dispatch<SetStateAction<UserInterface | null>>,
    page: keyof MenuLabelTypes;
    tourData: TourInterface | null;
    setTourData: Dispatch<SetStateAction<TourInterface | null>>;
    dayData: DayInterface | null,
    setDayData: Dispatch<SetStateAction<DayInterface | null>>,
}

export const HomeView = (props: Props) => (
    <>
        <TopBar page={props.page} lang={props.userData.lang} userData={props.userData} setUserData={props.setUserData}/>
        <Content>
            <ActivitiesFields lang={props.userData.lang} tourData={props.tourData} userData={props.userData} setUserData={props.setUserData} setTourData={props.setTourData} dayData={props.dayData} setDayData={props.setDayData}/>
        </Content>
    </>
);
