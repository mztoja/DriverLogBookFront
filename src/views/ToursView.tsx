import {AppMainElementsTypes} from "../types/AppMainElementsTypes";
import {MenuLabelTypes} from "../types/MenuLabelTypes";
import {TopBar} from "../components/bars/TopBar/TopBar";
import {Content} from "../components/bars/Content/Content";
import { UserInterface } from "types";
import React, {useState} from "react";
import {ToursList} from "../components/tours/ToursList";
import {ToursSettlementList} from "../components/tours/ToursSettlementList";
import {TourDetails} from "../components/tours/TourDetails";
import {Link} from "react-router-dom";
import {home} from "../assets/txt/home";

interface Props extends AppMainElementsTypes {
    userData: UserInterface;
    page: keyof MenuLabelTypes;
}

export const ToursView = (props:Props) => {
    const [refresh, setRefresh] = useState<boolean>(false);
    const [tourId, setTourId] = useState<number | null>(null);
    return (
        <>
            <TopBar page={props.page} lang={props.userData.lang} userData={props.userData} setUserData={props.setUserData}/>
            <Content>
                {
                    tourId
                        ?
                        <>
                            <Link to="" className="Link" onClick={() => setTourId(null)}>{home[props.userData.lang].back}</Link><br/><br/>
                            <TourDetails lang={props.userData.lang} tourId={tourId}/>
                            <Link to="" className="Link" onClick={() => setTourId(null)}>{home[props.userData.lang].back}</Link><br/><br/>
                        </>
                        :
                        <>
                            <ToursList lang={props.userData.lang} refresh={refresh} setRefresh={setRefresh} setSelectedTour={setTourId}/>
                            <br/>
                            <ToursSettlementList lang={props.userData.lang} refresh={refresh} setRefresh={setRefresh} setSelectedTour={setTourId}/>
                        </>
                }
            </Content>
        </>
    );
}