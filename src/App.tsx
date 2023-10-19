import React, {useEffect, useState} from 'react';
import {UserInterface, UserLangEnum, UserStatusEnum, TourInterface} from "types";
import './App.css';
import {DownloadFromLocalStorage} from "./hooks/LocalStorageHook";
import {LinearProgress} from "@mui/material";
import {BlockedUserView} from "./views/general/BlockedUserView";
import {useApiGetData} from "./hooks/useApiGetData";
import {GetUserData} from "./hooks/GetUserData";
import {LoggedOutView} from "./views/general/LoggedOutView";
import {LoggedInView} from "./views/general/LoggedInView";

enum AppView {
    loggedOut,
    loggedIn,
    blocked,
}

export const App = () => {

    const [lang, setLang] = useState<UserLangEnum>(UserLangEnum.en);
    const [appView, setAppView] = useState<AppView>(AppView.loggedOut);
    const [userData, setUserData] = useState<UserInterface | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [tourData, setTourData] = useState<TourInterface | null>(null);

    // setUserData
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

    useEffect(() => {
        if (userData) {
            if (userData.status === UserStatusEnum.blocked) {
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
    const {data: fetchedTourData, loading: tourLoading} = useApiGetData<TourInterface>('/tours/getActiveRoute', false);

    useEffect(() => {
        if (fetchedTourData) {
            setTourData(fetchedTourData);
        }
    }, [fetchedTourData]);


    if (loading || tourLoading) {
        return <LinearProgress/>;
    }

    return (
        <>
            {appView === AppView.blocked && userData ? BlockedUserView(userData, setUserData) : null}
            {appView === AppView.loggedIn && userData ? LoggedInView(userData, setUserData, tourData) : null}
            {appView === AppView.loggedOut ? LoggedOutView(lang, setLang, setUserData) : null}
        </>
    );
}

