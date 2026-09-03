import React, {Dispatch, SetStateAction, useEffect} from "react";
import "./AppLayout.css";
import "./AuthLayout.css";
import {AppBar, Toolbar} from "@mui/material";
import {UserInterface, userLangEnum} from "types";
import {MenuLabelTypes} from "../../types/MenuLabelTypes";
import {commons} from "../../assets/txt/commons";
import {labels} from "../../assets/txt/menuLabels";
import {ChangeLang} from "./ChangeLang";
import {LogoutLink} from "../auth/LogoutLink";
import {Footer} from "../bars/Footer/Footer";
import {AlertProvider} from "../../context/AlertContext";
import {AlertPopup} from "../common/AlertPopup/AlertPopup";

interface Props {
    lang: userLangEnum;
    page: keyof MenuLabelTypes;
    /** Ekrany logowania/rejestracji – flagi języka po prawej. */
    setLang?: Dispatch<SetStateAction<userLangEnum>>;
    /** Ekran zablokowanego konta – zamiast flag pokazuje wylogowanie. */
    setUserData?: Dispatch<SetStateAction<UserInterface | null>>;
    children: React.ReactNode;
}

/** Szkielet ekranów wylogowanych / zablokowanego konta – wygląd jak reszta aplikacji, pasek bez menu. */
export const AuthLayout = (props: Props) => {
    const pageName = labels[props.lang][props.page];
    const title = commons[props.lang].title;

    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, []);

    useEffect(() => {
        document.title = `${title} - ${pageName}`;
    }, [title, pageName]);

    return (
        <div id="AppLayout">
            <AppBar position="static" elevation={2} className="AppLayout__Header AuthHeader">
                <Toolbar className="AuthHeader__toolbar" disableGutters>
                    <div className="AuthHeader__brand">
                        <span className="AuthHeader__brandTitle">{title}</span>
                        <span className="AuthHeader__brandPage">- {pageName}</span>
                    </div>
                    <div className="AuthHeader__flags">
                        {props.setLang
                            ? <ChangeLang setLang={props.setLang}/>
                            : props.setUserData &&
                                <LogoutLink lang={props.lang} setUserData={props.setUserData}/>}
                    </div>
                </Toolbar>
            </AppBar>

            <AlertProvider>
                <main id="AppMain">
                    <div className="AppMain__content">
                        <AlertPopup/>
                        {props.children}
                    </div>
                </main>
            </AlertProvider>

            <Footer lang={props.lang}/>
        </div>
    );
};
