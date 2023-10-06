import React, {Dispatch, SetStateAction} from "react";
import {UserInterface, UserLangEnum } from "types";
import {ChangeLang} from "./ChangeLang";
import {LogoutLink} from "../../auth/LogoutLink";

interface Props {
    setLang?: Dispatch<SetStateAction<UserLangEnum>>;
    userData?: UserInterface;
    setUserData?: Dispatch<SetStateAction<UserInterface | null>>;
}

export const TopBarRight = (props: Props) => {
    if (props.userData !== undefined) {
        return <LogoutLink lang={props.userData.lang} setUserData={props.setUserData}/>
    }
    return <ChangeLang setLang={props.setLang}/>
}