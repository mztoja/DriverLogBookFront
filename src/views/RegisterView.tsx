import React, {Dispatch, SetStateAction} from "react";
import {AppMainElementsTypes} from "../types/AppMainElementsTypes";
import {TopBar} from "../components/bars/TopBar/TopBar";
import {Content} from "../components/bars/Content/Content";
import { UserLangEnum } from "types";
import {MenuLabelTypes} from "../types/MenuLabelTypes";
import {login} from "../assets/txt/login";
import {Link} from "react-router-dom";
import {RegisterForm} from "../components/auth/RegisterForm";

interface Props extends AppMainElementsTypes {
    lang: UserLangEnum;
    setLang: Dispatch<SetStateAction<UserLangEnum>>;
    page: keyof MenuLabelTypes;
}

export const RegisterView = (props: Props) => (
    <>
        <TopBar page={props.page} lang={props.lang} setLang={props.setLang}/>
        <Content>
            <RegisterForm lang={props.lang}/>
            <p>
                {login[props.lang].loginPar} <Link to="/" className="Link">{login[props.lang].here}</Link>.
            </p>
        </Content>
    </>
);