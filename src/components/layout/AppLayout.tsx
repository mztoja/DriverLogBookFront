import React, {Dispatch, SetStateAction, useEffect} from "react";
import "./AppLayout.css";
import {UserInterface, userLangEnum} from "types";
import {Header} from "./Header";
import {Footer} from "../bars/Footer/Footer";
import {AlertProvider} from "../../context/AlertContext";
import {AlertPopup} from "../common/AlertPopup/AlertPopup";

interface Props {
    lang: userLangEnum;
    userData: UserInterface;
    setUserData: Dispatch<SetStateAction<UserInterface | null>>;
    /** InfoBar renderowany poza contentem – tylko na stronie głównej. */
    infoBar?: React.ReactNode;
    children: React.ReactNode;
}

export const AppLayout = (props: Props) => {
    // Shell zajmuje dokładnie wysokość okna – blokujemy przewijanie <body>,
    // żeby jedynym paskiem przewijania był #AppMain.
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, []);

    return (
        <div id="AppLayout">
            <Header
                className="AppLayout__Header"
                lang={props.lang}
                userData={props.userData}
                setUserData={props.setUserData}
            />
            <AlertProvider>
                {props.infoBar && <div className="AppLayout__InfoBar">{props.infoBar}</div>}
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
