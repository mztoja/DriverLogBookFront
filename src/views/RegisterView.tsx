import React, {Dispatch, SetStateAction} from "react";
import {AppMainElementsTypes} from "../types/AppMainElementsTypes";
import {AuthLayout} from "../components/layout/AuthLayout";
import { userLangEnum } from "types";
import {MenuLabelTypes} from "../types/MenuLabelTypes";
import {login} from "../assets/txt/login";
import {Link} from "react-router-dom";
import {RegisterForm} from "../components/auth/RegisterForm";

interface Props extends AppMainElementsTypes {
    lang: userLangEnum;
    setLang: Dispatch<SetStateAction<userLangEnum>>;
    page: keyof MenuLabelTypes;
}

export const RegisterView = (props: Props) => (
    <AuthLayout lang={props.lang} setLang={props.setLang} page={props.page}>
        <RegisterForm lang={props.lang}/>
        <p>
            {login[props.lang].loginPar} <Link to="/" className="Link">{login[props.lang].here}</Link>.
        </p>
    </AuthLayout>
);
