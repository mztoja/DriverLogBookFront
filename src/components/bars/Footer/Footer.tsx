import React from "react";
import { userLangEnum } from "types";
import {commons} from "../../../assets/txt/commons";
import './Footer.css';

interface Props {
    lang: userLangEnum;
}

export const Footer = (props:Props) => {
    const txt = commons[props.lang];
    return <div id="Footer">{txt.footer}</div>
}