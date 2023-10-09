import {login} from "../assets/txt/login";
import {Link} from "react-router-dom";
import {AppMainElementsTypes} from "../types/AppMainElementsTypes";
import {TopBar} from "../components/bars/TopBar/TopBar";
import {MenuLabelTypes} from "../types/MenuLabelTypes";
import { UserLangEnum, UserInterface } from "types";
import {Dispatch, SetStateAction} from "react";
import {Content} from "../components/bars/Content/Content";
import {commons} from "../assets/txt/common";

interface Props {
    page: keyof MenuLabelTypes;
    userData: UserInterface;
    setUserData?: Dispatch<SetStateAction<UserInterface | null>>;
}

export const BlockedUserView = (props:Props) => (
    <>
        <TopBar page={props.page} lang={props.userData.lang} userData={props.userData} setUserData={props.setUserData}/>
        <Content>{commons[props.userData.lang].userBlockedSite}</Content>
    </>
);