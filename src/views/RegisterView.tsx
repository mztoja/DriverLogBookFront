import React, {Dispatch, SetStateAction} from "react";
import {AppMainElementsTypes} from "../types/AppMainElementsTypes";
import {TopBar} from "../components/bars/TopBar/TopBar";
import {Content} from "../components/bars/Content/Content";
import {Register} from "../components/bars/Content/pages/Register";
import { UserLangEnum } from "types";
import {MenuLabelTypes} from "../types/MenuLabelTypes";

interface Props extends AppMainElementsTypes {
    lang: UserLangEnum;
    setLang: Dispatch<SetStateAction<UserLangEnum>>;
    page: keyof MenuLabelTypes;
}

export const RegisterView = (props: Props) => (
    <>
        <TopBar page={props.page} lang={props.lang} setLang={props.setLang}/>
        <Content>
            <Register lang={props.lang}/>
        </Content>
    </>
);