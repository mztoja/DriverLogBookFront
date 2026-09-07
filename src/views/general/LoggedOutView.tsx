import React, {Dispatch, SetStateAction} from "react";
import {Route, Routes} from "react-router-dom";
import {LoginView} from "../LoginView";
import {RegisterView} from "../RegisterView";
import {UserInterface, userLangEnum} from "types";

export const LoggedOutView = (lang: userLangEnum, setLang: Dispatch<SetStateAction<userLangEnum>>, setUserData: Dispatch<SetStateAction<UserInterface | null>>) => (
    <Routes>
        <Route path="register"
               element={<RegisterView page="register" lang={lang} setLang={setLang}/>}/>
        <Route path="*"
               element={<LoginView page="login" lang={lang} setLang={setLang} setUserData={setUserData}/>}/>
    </Routes>
);
