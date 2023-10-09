import React from "react";
import "./Menu.css";
import {Option} from "./Option";
import { labels } from "../../../assets/txt/menuLabels";
import { DivClear } from "../../common/DivClear";
import { UserLangEnum } from "types";

interface Props {
    lang: UserLangEnum;
}

export const Menu = (props: Props) => {
    const txt = labels[props.lang];
    return (
        <nav id="Menu">
            <Option name={txt.home} url="/"/>
            <Option name={txt.logs} url="logs"/>
            <Option name={txt.days} url="days"/>
            <Option name={txt.finances} url="finances"/>
            <Option name={txt.places} url="places"/>
            <DivClear/>
        </nav>
    );
}