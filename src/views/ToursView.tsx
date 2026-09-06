import {AppMainElementsTypes} from "../types/AppMainElementsTypes";
import {MenuLabelTypes} from "../types/MenuLabelTypes";
import {UserInterface} from "types";
import React, {useState} from "react";
import {ToursList} from "../components/tours/ToursList";
import {ToursSettlementList} from "../components/tours/ToursSettlementList";
import {ToursStats} from "../components/tours/ToursStats";
import {TourDetails} from "../components/tours/TourDetails";
import {tours} from "../assets/txt/tours";
import {TableTabs} from "../components/common/TableTabs";

type ToursTab = "unaccounted" | "settlements" | "stats";

interface Props extends AppMainElementsTypes {
    userData: UserInterface;
    page: keyof MenuLabelTypes;
}

export const ToursView = (props: Props) => {
    const [refresh, setRefresh] = useState<boolean>(false);
    const [tourId, setTourId] = useState<number | null>(null);
    const [tab, setTab] = useState<ToursTab>("unaccounted");

    if (tourId) {
        return (
            <TourDetails
                lang={props.userData.lang}
                tourId={tourId}
                tourGenerator={props.userData.tourGenerator}
                onBack={() => setTourId(null)}
            />
        );
    }

    return (
        <>
            <TableTabs
                active={tab}
                onChange={(k) => setTab(k as ToursTab)}
                tabs={[
                    {key: "unaccounted", label: tours[props.userData.lang].unaccountedRoutes},
                    {key: "settlements", label: tours[props.userData.lang].settlementsHeader},
                    {key: "stats", label: tours[props.userData.lang].statsHeader},
                ]}
            />
            {tab === "unaccounted" &&
                <ToursList lang={props.userData.lang} refresh={refresh} setRefresh={setRefresh} setSelectedTour={setTourId}/>}
            {tab === "settlements" &&
                <ToursSettlementList lang={props.userData.lang} refresh={refresh} setRefresh={setRefresh} setSelectedTour={setTourId}/>}
            {tab === "stats" &&
                <ToursStats lang={props.userData.lang}/>}
        </>
    );
}
