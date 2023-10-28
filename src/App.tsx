import React, {useEffect, useState} from 'react';
import {UserInterface, userLangEnum, userStatusEnum, TourInterface} from "types";
import './App.css';
import {DownloadFromLocalStorage} from "./hooks/LocalStorageHook";
import {LinearProgress} from "@mui/material";
import {BlockedUserView} from "./views/general/BlockedUserView";
import {LoggedOutView} from "./views/general/LoggedOutView";
import {LoggedInView} from "./views/general/LoggedInView";
import {useApi} from './hooks/useApi';
import {apiPaths} from "./config/api";

enum AppView {
    loggedOut,
    loggedIn,
    blocked,
}

export const App = () => {

    const [lang, setLang] = useState<userLangEnum>(userLangEnum.en);
    const [appView, setAppView] = useState<AppView>(AppView.loggedOut);
    const [userData, setUserData] = useState<UserInterface | null>(null);
    const [tourData, setTourData] = useState<TourInterface | null>(null);
    const {loading, fetchData} = useApi();

    // setUserData
    useEffect(() => {
        (async () => {
            const result = await fetchData(apiPaths.get, {
                headers: {'Content-Type': 'application/json'},
                credentials: "include",
            });
            if ((result && result.data) && (!result.data.dtc)) {
                setUserData(result.data);
            } else {
                const lang = DownloadFromLocalStorage('lang');
                if (lang !== null) {
                    setLang(Number(lang))
                }
            }
        })();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (userData) {
            if (userData.status === userStatusEnum.blocked) {
                setAppView(AppView.blocked);
            } else {
                setAppView(AppView.loggedIn);
            }
        } else {
            const lang = DownloadFromLocalStorage('lang');
            if (lang !== null) {
                setLang(Number(lang))
            }
            setAppView(AppView.loggedOut);
        }

    }, [userData]);


    //setTourData

    useEffect(() => {
        (async () => {
            const result = await fetchData(apiPaths.getActiveRoute, {
                headers: {'Content-Type': 'application/json'},
                credentials: "include",
            });
            if ((result && result.data) && (!result.data.dtc)) {
                setUserData(result.data);
            }
        })();
        // eslint-disable-next-line
    }, []);

    if (loading) {
        return <LinearProgress/>;
    }

    return (
        <>
            {appView === AppView.blocked && userData ? BlockedUserView(userData, setUserData) : null}
            {appView === AppView.loggedIn && userData ? LoggedInView(userData, setUserData, tourData, setTourData) : null}
            {appView === AppView.loggedOut ? LoggedOutView(lang, setLang, setUserData) : null}
        </>
    );
}

