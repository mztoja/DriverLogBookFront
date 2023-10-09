import {AppMainElementsTypes} from "../../../../types/AppMainElementsTypes";
import React from "react";

export const HomePage = (props: AppMainElementsTypes) => {
    return (
        <>
            Witaj {props.userData?.firstName}.
        </>
    )
};
