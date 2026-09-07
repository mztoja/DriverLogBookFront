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
import {REACT_APP_PREFIX} from "./config/set";

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
    const {loading, fetchDataOld} = useApi();

    useEffect(() => {
        const updateFavicon = (online: boolean): void => {
            const favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;;
            if (favicon) {
                favicon.href = online ? `${REACT_APP_PREFIX}/icon-online.ico` : `${REACT_APP_PREFIX}/icon-offline.ico`;
            }
        };
        updateFavicon(navigator.onLine);
        window.addEventListener('online', () => updateFavicon(true));
        window.addEventListener('offline', () => updateFavicon(false));
        return () => {
            window.removeEventListener('online', () => updateFavicon(true));
            window.removeEventListener('offline', () => updateFavicon(false));
        };
    }, []);

    useEffect(() => {
        (async () => {
            const result = await fetchDataOld(apiPaths.get, 'GET');
            if ((result && result.responseData) &&

                (!result.responseData.dtc)) {
                setUserData(result.responseData);
            } else {
                const lang = DownloadFromLocalStorage('lang');
                if (lang !== null) {
                    setLang(Number(lang))
                }
            }
        })();
        // eslint-disable-next-line
    }, [appView]);

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
// eslint-disable-next-line
    }, [userData?.currentTokenId, userData?.status]);

    if (loading) {
        return <LinearProgress/>;
    }

    return (
        <>
            {appView === AppView.blocked && userData ? BlockedUserView(userData, setUserData) : null}
            {appView === AppView.loggedIn && userData
                ? <LoggedInView userData={userData} setUserData={setUserData}
                                tourData={tourData} setTourData={setTourData}/>
                : null
            }
            {appView === AppView.loggedOut ? LoggedOutView(lang, setLang, setUserData) : null}
        </>
    );
}

