import React, {Dispatch, SetStateAction} from "react";
import {UserInterface, userLangEnum } from "types";
import {ChangeLang} from "./ChangeLang";
import {LogoutLink} from "../../auth/LogoutLink";

interface Props {
    setLang?: Dispatch<SetStateAction<userLangEnum>>;
    userData?: UserInterface;
    setUserData?: Dispatch<SetStateAction<UserInterface | null>>;
}

export const TopBarRight = (props: Props) => {
    if (props.userData !== undefined) {
        return <LogoutLink lang={props.userData.lang} setUserData={props.setUserData}/>
    }
    return <ChangeLang setLang={props.setLang}/>
}