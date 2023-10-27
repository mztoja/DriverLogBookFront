import React, {Dispatch, SetStateAction} from "react";
import {userLangEnum} from "types";
import {SaveToLocalStorage} from "../../../hooks/LocalStorageHook";

const plFlag = require("../../../assets/img/pl.jpg");
const enFlag = require("../../../assets/img/en.jpg");

interface Props {
    setLang?: Dispatch<SetStateAction<userLangEnum>>
}

export const ChangeLang = (props: Props) => {

    const changeLang = (lang: number): void => {
        if (props.setLang !== undefined) {
            props.setLang(lang);
        }
        SaveToLocalStorage('lang', lang.toString());
    }

    return (
        <>
            <img className="TopBar__LangImg" src={plFlag} onClick={() => changeLang(userLangEnum.pl)} alt="pl"/>
            <img className="TopBar__LangImg" src={enFlag} onClick={() => changeLang(userLangEnum.en)} alt="en"/>
        </>
    )
}