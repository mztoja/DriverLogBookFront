import React, {Dispatch, SetStateAction} from "react";
import {TopBar} from "../components/bars/TopBar/TopBar";
import {AppMainElementsTypes} from "../types/AppMainElementsTypes";
import {LoginForm} from "../components/auth/LoginForm";
import {Content} from "../components/bars/Content/Content";
import {UserInterface, userLangEnum } from "types";
import {MenuLabelTypes} from "../types/MenuLabelTypes";
import {Heading} from "../components/bars/Content/Heading";
import {login} from "../assets/txt/login";
import {Link} from "react-router-dom";

interface Props extends AppMainElementsTypes {
    lang: userLangEnum;
    setLang: Dispatch<SetStateAction<userLangEnum>>;
    page: keyof MenuLabelTypes;
    setUserData?: Dispatch<SetStateAction<UserInterface | null>>;
}

export const LoginView = (props:Props) => (
    <>
        <TopBar page={props.page} lang={props.lang} setLang={props.setLang}/>
        <Content>
            <Heading text={login[props.lang].welcome}/>
            <LoginForm lang={props.lang} setUserData={props.setUserData}/>
            <p>
                {login[props.lang].registerPar} <Link to="/register" className="Link">{login[props.lang].here}</Link>.
            </p>
        </Content>
    </>
);