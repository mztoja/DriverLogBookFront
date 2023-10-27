import React, {Dispatch, SetStateAction, useEffect} from "react";
import './TopBar.css';
import {AppMainElementsTypes} from "../../../types/AppMainElementsTypes";
import {labels} from "../../../assets/txt/menuLabels";
import {commons} from "../../../assets/txt/commons";
import {DivClear} from "../../common/DivClear";
import { userLangEnum } from "types";
import {MenuLabelTypes} from "../../../types/MenuLabelTypes";
import {TopBarRight} from "./TopBarRight";



interface Props extends AppMainElementsTypes {
    setLang?: Dispatch<SetStateAction<userLangEnum>>;
    lang: userLangEnum;
    page: keyof MenuLabelTypes;
}

export const TopBar = (props: Props) => {

        const txtLabel = labels[props.lang];
        const txtSubTitle = commons[props.lang]["subTitle"];
        const txtTitle = commons[props.lang]["title"];


    useEffect(() => {
        document.title = `${txtTitle} - ${txtLabel[props.page]}`;
    }, [props.page, txtLabel, txtTitle]);


        return (
            <div id="TopBar">
                <div className="TopBar_Left">
                    {txtSubTitle} - {txtLabel[props.page]}
                </div>
                <div className="TopBar_Right">
                    <TopBarRight setLang={props.setLang} userData={props.userData} setUserData={props.setUserData}/>
                </div>
                <DivClear/>
            </div>

        );
}
