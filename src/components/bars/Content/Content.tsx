import React from "react";
import "./Content.css";
import {AlertProvider} from "../../../context/AlertContext";
import {AlertPopup} from "../../common/AlertPopup/AlertPopup";

export const Content = (props:any) => {

    return (
    <AlertProvider>
        <div id="Content">
            <AlertPopup/><br/>
            {props.children}
        </div>
    </AlertProvider>
    );
}