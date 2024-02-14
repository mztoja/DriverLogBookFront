import React, {Dispatch, SetStateAction} from "react";
import {Menu} from "../../components/bars/Menu/Menu";
import {Navigate, Route, Routes} from "react-router-dom";
import {HomeView} from "../HomeView";
import {LogsView} from "../LogsView";
import {DaysView} from "../DaysView";
import {FinancesView} from "../FinancesView";
import {PlacesView} from "../PlacesView";
import {Footer} from "../../components/bars/Footer/Footer";
import {TourInterface, UserInterface, DayInterface} from "types";
import { ProfileView } from "../ProfileView";
import {VehiclesView} from "../VehiclesView";

export const LoggedInView = (
    userData: UserInterface,
    setUserData: Dispatch<SetStateAction<UserInterface | null>>,
    tourData: TourInterface | null,
    setTourData: Dispatch<SetStateAction<TourInterface | null>>,
    dayData: DayInterface | null,
    setDayData: Dispatch<SetStateAction<DayInterface | null>>,
) => (
    <div className="App">
        <Menu lang={userData.lang}/>
        <Routes>
            <Route path="*" element={<Navigate to="/"/>}/>
            <Route path="/"
                   element={<HomeView page="home" userData={userData} setUserData={setUserData} tourData={tourData} setTourData = {setTourData} dayData={dayData} setDayData={setDayData}/>}/>
            <Route path="logs"
                   element={<LogsView page="logs" userData={userData} setUserData={setUserData}/>}/>
            <Route path="days"
                   element={<DaysView page="days" userData={userData} setUserData={setUserData}/>}/>
            <Route path="finances"
                   element={<FinancesView page="finances" userData={userData} setUserData={setUserData}/>}/>
            <Route path="places"
                   element={<PlacesView page="places" userData={userData} setUserData={setUserData}/>}/>
            <Route path="profile"
                   element={<ProfileView page="profile" userData={userData} setUserData={setUserData} tourData={tourData}/>}/>
            <Route path="vehicles"
                   element={<VehiclesView page="vehicles" userData={userData} setUserData={setUserData}/>}/>
        </Routes>
        <Footer lang={userData.lang}/>
    </div>
);