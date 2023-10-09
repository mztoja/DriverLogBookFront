import React, {useEffect, useState} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {Footer} from "./components/bars/Footer/Footer";
import {GetUserData} from "./hooks/GetUserData";
import {HomeView} from "./views/HomeView";
import {LogsView} from "./views/LogsView";
import {Menu} from "./components/bars/Menu/Menu";
import {DaysView} from "./views/DaysView";
import {FinancesView} from "./views/FinancesView";
import {LoginView} from "./views/LoginView";
import {RegisterView} from "./views/RegisterView";
import {UserInterface, UserLangEnum, UserStatusEnum} from "types";
import './App.css';
import {DownloadFromLocalStorage} from "./hooks/LocalStorageHook";
import {LinearProgress} from "@mui/material";
import {BlockedUserView} from "./views/BlockedUserView";
import {PlacesView} from "./views/PlacesView";


export const App = () => {

    const [userData, setUserData] = useState<UserInterface | null>(null);
    const [lang, setLang] = useState<UserLangEnum>(UserLangEnum.en);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        GetUserData()
            .then(data => {
                if (data !== undefined) {
                    setUserData(data);
                } else {
                    const lang = DownloadFromLocalStorage('lang');
                    if (lang !== null) {
                        setLang(Number(lang))
                    }
                }
            })
            .finally(() => {
                setLoading(false)
            });
    }, []);

    if (loading) {
        return <LinearProgress/>;
    }


    if ((userData !== null) && (userData !== undefined)) {
        if (userData.status === UserStatusEnum.blocked) {
            return (
                <div className="App">
                    <Routes>
                        <Route path="*"
                               element={<BlockedUserView page="blockedUser" userData={userData} setUserData={setUserData}/>}/>
                    </Routes>
                    <Footer lang={userData.lang}/>
                </div>
            );
        } else {
            return (
                <div className="App">
                    <Menu lang={userData.lang}/>
                    <Routes>
                        <Route path="*" element={<Navigate to="/"/>}/>
                        <Route path="/"
                               element={<HomeView page="home" userData={userData} setUserData={setUserData}/>}/>
                        <Route path="logs"
                               element={<LogsView page="logs" userData={userData} setUserData={setUserData}/>}/>
                        <Route path="days"
                               element={<DaysView page="days" userData={userData} setUserData={setUserData}/>}/>
                        <Route path="finances"
                               element={<FinancesView page="finances" userData={userData} setUserData={setUserData}/>}/>
                        <Route path="places"
                               element={<PlacesView page="places" userData={userData} setUserData={setUserData}/>}/>
                    </Routes>
                    <Footer lang={userData.lang}/>
                </div>
            );
        }
    }


    return (
        <div className="App">
            <Routes>
                <Route path="login"
                       element={<LoginView page="login" lang={lang} setLang={setLang} setUserData={setUserData}/>}/>
                <Route path="*"
                       element={<LoginView page="login" lang={lang} setLang={setLang} setUserData={setUserData}/>}/>
                <Route path="register" element={<RegisterView page="register" lang={lang} setLang={setLang}/>}/>
            </Routes>
            <Footer lang={lang}/>
        </div>
    );
}

