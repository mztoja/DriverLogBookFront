import React from "react";
import {AppMainElementsTypes} from "../types/AppMainElementsTypes";
import {MenuLabelTypes} from "../types/MenuLabelTypes";
import { ProfileSet } from "../components/common/ProfileSet";
import { TourInterface } from "types";

interface Props extends AppMainElementsTypes {
    page: keyof MenuLabelTypes;
    tourData: TourInterface | null;
}

export const ProfileView = (props: Props) => {
    if (props.userData && props.setUserData) {
        return (
            <ProfileSet userData={props.userData} setUserData={props.setUserData} tourData={props.tourData}/>
        );
    }
    return <></>;
}
