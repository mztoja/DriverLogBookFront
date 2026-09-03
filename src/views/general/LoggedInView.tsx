import React, {Dispatch, SetStateAction, useState} from "react";
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import {DayInterface, LogInterface, TourInterface, UserInterface} from "types";
import {AppLayout} from "../../components/layout/AppLayout";
import {PlacesProvider} from "../../context/PlacesContext";
import {InfoBar} from "../../components/bars/InfoBar/InfoBar";
import {useDocumentTitle} from "../../hooks/useDocumentTitle";
import {HomeView} from "../HomeView";
import {LogsView} from "../LogsView";
import {DaysView} from "../DaysView";
import {FinancesView} from "../FinancesView";
import {PlacesView} from "../PlacesView";
import {ProfileView} from "../ProfileView";
import {VehiclesView} from "../VehiclesView";
import {LoadingsView} from "../LoadingsView";
import {ToursView} from "../ToursView";

interface Props {
    userData: UserInterface;
    setUserData: Dispatch<SetStateAction<UserInterface | null>>;
    tourData: TourInterface | null;
    setTourData: Dispatch<SetStateAction<TourInterface | null>>;
}

export const LoggedInView = (props: Props) => {
    const {userData, setUserData, tourData, setTourData} = props;
    const location = useLocation();
    useDocumentTitle(userData.lang);

    // Stan współdzielony przez HomeView (który go pobiera) oraz InfoBar (renderowany w shellu).
    const [refresh, setRefresh] = useState<boolean>(false);
    const [dayData, setDayData] = useState<DayInterface | null>(null);
    const [dayLoaded, setDayLoaded] = useState<boolean>(false);
    const [lastLogData, setLastLogData] = useState<LogInterface | null>(null);

    const showInfoBar = location.pathname === "/" && !!tourData;

    return (
        <PlacesProvider>
        <AppLayout
            lang={userData.lang}
            userData={userData}
            setUserData={setUserData}
            infoBar={showInfoBar
                ? <InfoBar
                    lang={userData.lang}
                    tourData={tourData}
                    dayData={dayData}
                    dayLoaded={dayLoaded}
                    lastLogData={lastLogData}
                    userData={userData}
                    setUserData={setUserData}
                    refresh={refresh}
                    setRefresh={setRefresh}
                />
                : undefined}
        >
            <Routes>
                    <Route path="*" element={<Navigate to="/"/>}/>
                    <Route path="/"
                           element={<HomeView page="home" userData={userData} setUserData={setUserData}
                                              tourData={tourData} setTourData={setTourData}
                                              dayData={dayData} setDayData={setDayData} setDayLoaded={setDayLoaded}
                                              lastLogData={lastLogData} setLastLogData={setLastLogData}
                                              refresh={refresh} setRefresh={setRefresh}/>}/>
                    <Route path="logs"
                           element={<LogsView page="logs" userData={userData} setUserData={setUserData}/>}/>
                    <Route path="days"
                           element={<DaysView page="days" userData={userData} setUserData={setUserData}/>}/>
                    <Route path="finances"
                           element={<FinancesView page="finances" userData={userData} setUserData={setUserData}/>}/>
                    <Route path="loadings"
                           element={<LoadingsView page="loadings" userData={userData} setUserData={setUserData}/>}/>
                    <Route path="tours"
                           element={<ToursView page="tours" userData={userData} setUserData={setUserData}/>}/>
                    <Route path="places"
                           element={<PlacesView page="places" userData={userData} setUserData={setUserData}/>}/>
                    <Route path="profile"
                           element={<ProfileView page="profile" userData={userData} setUserData={setUserData}
                                                 tourData={tourData}/>}/>
                    <Route path="vehicles/:id?"
                           element={<VehiclesView page="vehicles" userData={userData} setUserData={setUserData}
                                                  tourData={tourData}/>}/>
            </Routes>
        </AppLayout>
        </PlacesProvider>
    );
};
