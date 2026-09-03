import React, {Dispatch, SetStateAction} from "react";
import {MenuLabelTypes} from "../types/MenuLabelTypes";
import {UserInterface} from "types";
import {AuthLayout} from "../components/layout/AuthLayout";
import {commons} from "../assets/txt/commons";

interface Props {
    page: keyof MenuLabelTypes;
    userData: UserInterface;
    setUserData?: Dispatch<SetStateAction<UserInterface | null>>;
}

export const BlockedUserView = (props: Props) => (
    <AuthLayout lang={props.userData.lang} page={props.page} setUserData={props.setUserData}>
        <p>{commons[props.userData.lang].userBlockedSite}</p>
    </AuthLayout>
);
