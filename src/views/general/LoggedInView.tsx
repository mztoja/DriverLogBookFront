import React, {Dispatch, SetStateAction} from "react";
import {Menu} from "../../components/bars/Menu/Menu";
import {Navigate, Route, Routes} from "react-router-dom";
import {HomeView} from "../HomeView";
import {LogsView} from "../LogsView";
import {DaysView} from "../DaysView";
import {FinancesView} from "../FinancesView";
import {PlacesView} from "../PlacesView";
import {Footer} from "../../components/bars/Footer/Footer";
import {TourInterface, UserInterface} from "types";
import { ProfileView } from "../ProfileView";
import {VehiclesView} from "../VehiclesView";
import {LoadingsView} from "../LoadingsView";
import {ToursView} from "../ToursView";

export const LoggedInView = (
    userData: UserInterface,
    setUserData: Dispatch<SetStateAction<UserInterface | null>>,
    tourData: TourInterface | null,
    setTourData: Dispatch<SetStateAction<TourInterface | null>>,
) => (
    <div className="App">
        <Menu lang={userData.lang}/>
        <Routes>
            <Route path="*" element={<Navigate to="/"/>}/>
            <Route path="/"
                   element={<HomeView page="home" userData={userData} setUserData={setUserData} tourData={tourData} setTourData={setTourData}/>}/>
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
                   element={<ProfileView page="profile" userData={userData} setUserData={setUserData} tourData={tourData}/>}/>
            <Route path="vehicles/:id?"
                   element={<VehiclesView page="vehicles" userData={userData} setUserData={setUserData} tourData={tourData}/>}/>
        </Routes>
        <Footer lang={userData.lang}/>
    </div>
);