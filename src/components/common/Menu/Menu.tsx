import React, {useContext} from "react";
import "./Menu.css";
import {Option} from "./Option";
import { labels } from "../../../data/txt/menuLabels";
import {AppMainElementsTypes} from "../../../types/AppMainElementsTypes";
import { DivClear } from "../DivClear";

//!TODO: Change lang variable!

const lang = 'pl';


export const Menu = (props: AppMainElementsTypes) => {
    const txt = labels[lang];
    return (
        <nav id="Menu">
            <Option name={txt["home"]} url="/"/>
            <Option name={txt["logs"]} url="logs"/>
            <Option name={txt["days"]} url="days"/>
            <Option name={txt["finances"]} url="finances"/>
            <DivClear/>
        </nav>
    );
}