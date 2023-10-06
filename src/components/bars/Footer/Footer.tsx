import React from "react";
import { UserLangEnum } from "types";
import {commons} from "../../../data/txt/common";
import './Footer.css';

interface Props {
    lang: UserLangEnum;
}

export const Footer = (props:Props) => {
    const txt = commons[props.lang];
    return <div id="Footer">{txt.footer}. Tu wstaw formularz kontaktowy! </div>
}