import React, {Dispatch, SetStateAction} from "react";
import {UserLangEnum} from "types";
import {SaveToLocalStorage} from "../../../hooks/LocalStorageHook";

const plFlag = require("../../../data/img/pl.jpg");
const enFlag = require("../../../data/img/en.jpg");

interface Props {
    setLang?: Dispatch<SetStateAction<UserLangEnum>>
}

export const ChangeLang = (props: Props) => {

    const changeLang = (lang: number): void => {
        console.log('zmieniłem na ', lang);
        if (props.setLang !== undefined) {
            props.setLang(lang);
        }
        SaveToLocalStorage('lang', lang.toString());
    }

    return (
        <>
            <img className="TopBar__LangImg" src={plFlag} onClick={() => changeLang(UserLangEnum.pl)} alt="pl"/>
            <img className="TopBar__LangImg" src={enFlag} onClick={() => changeLang(UserLangEnum.en)} alt="en"/>
        </>
    )
}