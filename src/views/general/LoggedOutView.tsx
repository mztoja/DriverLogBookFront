import React, {Dispatch, SetStateAction} from "react";
import {Route, Routes} from "react-router-dom";
import {LoginView} from "../LoginView";
import {RegisterView} from "../RegisterView";
import {Footer} from "../../components/bars/Footer/Footer";
import {UserInterface, UserLangEnum} from "types";

export const LoggedOutView = (lang: UserLangEnum, setLang: Dispatch<SetStateAction<UserLangEnum>>, setUserData: Dispatch<SetStateAction<UserInterface | null>>) => (
    <div className="App">
        <Routes>
            <Route path="login"
                   element={<LoginView page="login" lang={lang} setLang={setLang} setUserData={setUserData}/>}/>
            <Route path="*"
                   element={<LoginView page="login" lang={lang} setLang={setLang} setUserData={setUserData}/>}/>
            <Route path="register"
                   element={<RegisterView page="register" lang={lang} setLang={setLang} setUserData={setUserData}/>}/>
        </Routes>
        <Footer lang={lang}/>
    </div>
);