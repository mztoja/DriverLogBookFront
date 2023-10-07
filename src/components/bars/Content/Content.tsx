import React from "react";
import "./Content.css";
import {AlertProvider} from "../../../context/AlertContext";
import {AlertPopup} from "../../common/AlertPopup/AlertPopup";

export const Content = (props:any) => {

    return (
    <AlertProvider>
        <div id="Content">
            <AlertPopup/>
            {props.children}
        </div>
    </AlertProvider>
    );

    // const txt = commons['pl'];
    //
    // if (props.page === 'register') {
    //     return <div id="Content">
    //         <Register />
    //     </div>
    // }
    //
    // if (props.page === 'login') {
    //     return <div id="Content">
    //         <Login />
    //     </div>
    // }
    //
    // if (props.page === 'home') {
    //     return <div id="Content">
    //         <HomePage page={props.page} userData={props.userData} />
    //     </div>
    // }
    //
    // return <div id="Content"><h2>{txt.notFound}.</h2></div>
}