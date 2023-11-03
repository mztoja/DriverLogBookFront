import React from "react";
import {AppMainElementsTypes} from "../types/AppMainElementsTypes";
import {MenuLabelTypes} from "../types/MenuLabelTypes";
import {TopBar} from "../components/bars/TopBar/TopBar";
import {Content} from "../components/bars/Content/Content";
import { ProfileSet } from "../components/common/ProfileSet";

interface Props extends AppMainElementsTypes {
    page: keyof MenuLabelTypes;
}

export const ProfileView = (props: Props) => {
    if (props.userData && props.setUserData) {
        return (
            <>
                <TopBar page={props.page} lang={props.userData.lang} userData={props.userData} setUserData={props.setUserData}/>
                <Content>
                    <ProfileSet userData={props.userData} setUserData={props.setUserData}/>
                </Content>
            </>
        );
    }
    return <></>;
}
