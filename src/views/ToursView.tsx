import {AppMainElementsTypes} from "../types/AppMainElementsTypes";
import {MenuLabelTypes} from "../types/MenuLabelTypes";
import {UserInterface} from "types";
import React, {useState} from "react";
import {ToursList} from "../components/tours/ToursList";
import {ToursSettlementList} from "../components/tours/ToursSettlementList";
import {TourDetails} from "../components/tours/TourDetails";
import {tours} from "../assets/txt/tours";
import {TableTabs} from "../components/common/TableTabs";

interface Props extends AppMainElementsTypes {
    userData: UserInterface;
    page: keyof MenuLabelTypes;
}

export const ToursView = (props: Props) => {
    const [refresh, setRefresh] = useState<boolean>(false);
    const [tourId, setTourId] = useState<number | null>(null);
    const [tab, setTab] = useState<"unaccounted" | "settlements">("unaccounted");

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
                onChange={(k) => setTab(k as "unaccounted" | "settlements")}
                tabs={[
                    {key: "unaccounted", label: tours[props.userData.lang].unaccountedRoutes},
                    {key: "settlements", label: tours[props.userData.lang].settlementsHeader},
                ]}
            />
            {tab === "unaccounted"
                ? <ToursList lang={props.userData.lang} refresh={refresh} setRefresh={setRefresh} setSelectedTour={setTourId}/>
                : <ToursSettlementList lang={props.userData.lang} refresh={refresh} setRefresh={setRefresh} setSelectedTour={setTourId}/>}
        </>
    );
}
