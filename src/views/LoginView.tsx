import React, {Dispatch, SetStateAction} from "react";
import {TopBar} from "../components/bars/TopBar/TopBar";
import {AppMainElementsTypes} from "../types/AppMainElementsTypes";
import {LoginForm} from "../components/auth/LoginForm";
import {Content} from "../components/bars/Content/Content";
import {UserInterface, UserLangEnum } from "types";
import {MenuLabelTypes} from "../types/MenuLabelTypes";
import {Heading} from "../components/bars/Content/Heading";
import {login} from "../assets/txt/login";

interface Props extends AppMainElementsTypes {
    lang: UserLangEnum;
    setLang: Dispatch<SetStateAction<UserLangEnum>>;
    page: keyof MenuLabelTypes;
    setUserData?: Dispatch<SetStateAction<UserInterface | null>>;
}

export const LoginView = (props:Props) => (
    <>
        <TopBar page={props.page} lang={props.lang} setLang={props.setLang}/>
        <Content>
            <Heading text={login[props.lang].welcome}/>
            <LoginForm lang={props.lang} setUserData={props.setUserData}/>
        </Content>
    </>
);