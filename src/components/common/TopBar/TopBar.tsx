import React, {useContext} from "react";
import './TopBar.css';
import {AppMainElementsTypes} from "../../../types/AppMainElementsTypes";
import {labels} from "../../../data/txt/menuLabels";
import {commons} from "../../../data/txt/common";
import {DivClear} from "../DivClear";
import { SetTitle } from "../../../hooks/SetTitle";
const plFlag = require("../../../data/img/pl.jpg");
const enFlag = require("../../../data/img/en.jpg");

//!TODO: Change lang variable!

const lang = 'pl';

export const TopBar = (props: AppMainElementsTypes) => {

    const txtLabel = labels[lang];
    const txtSubTitle = commons[lang]["subTitle"];
    const txtTitle = commons[lang]["title"];
    if (typeof props.page === "string") {
        SetTitle(`${txtTitle} - ${txtLabel[props.page]}`);
        return (
            <div id="TopBar">
                <div className="TopBar_Left">
                    {txtSubTitle} - {txtLabel[props.page]}
                </div>
                <div className="TopBar_Right">
                    <img className="TopBar__LangImg" src={plFlag} alt="pl"/>
                    <img className="TopBar__LangImg" src={enFlag} alt="en" />
                </div>
                <DivClear/>
            </div>

        );
    } else {
        return <></>
    }

}