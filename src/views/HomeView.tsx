import React, {Dispatch, SetStateAction, useEffect} from "react";
import {apiPaths} from "../config/api";
import {ActivitiesFields} from "../components/main/ActivitiesFields";
import {useApi} from "../hooks/useApi";
import {AppMainElementsTypes} from "../types/AppMainElementsTypes";
import {UserInterface, TourInterface, DayInterface, LogInterface} from "types";
import {MenuLabelTypes} from "../types/MenuLabelTypes";
import {NotesField} from "../components/main/NotesField";
import {DivClear} from "../components/common/DivClear";

interface Props extends AppMainElementsTypes {
    userData: UserInterface;
    setUserData: Dispatch<SetStateAction<UserInterface | null>>,
    page: keyof MenuLabelTypes;
    tourData: TourInterface | null,
    setTourData: Dispatch<SetStateAction<TourInterface | null>>,
    // Stan współdzielony z InfoBarem – trzymany w LoggedInView.
    dayData: DayInterface | null,
    setDayData: Dispatch<SetStateAction<DayInterface | null>>,
    setDayLoaded: Dispatch<SetStateAction<boolean>>,
    lastLogData: LogInterface | null,
    setLastLogData: Dispatch<SetStateAction<LogInterface | null>>,
    refresh: boolean,
    setRefresh: Dispatch<SetStateAction<boolean>>,
}

export const HomeView = (props: Props) => {

    const {fetchData} = useApi();
    const {refresh, setDayData, setLastLogData} = props;

    useEffect(() => {
        fetchData<TourInterface>(apiPaths.getActiveRoute, {
            setData: props.setTourData,
        }).then();
        fetchData<UserInterface>(apiPaths.get, {
            setData: props.setUserData,
        }).then();
        fetchData<LogInterface>(apiPaths.getLastLog, {
            setData: setLastLogData,
        }).then();
        // eslint-disable-next-line
    }, [refresh]);

    useEffect(() => {
        fetchData<DayInterface>(apiPaths.getActiveDay, {
            setData: setDayData,
        }).then(() => props.setDayLoaded(true));
        // eslint-disable-next-line
    }, [props.tourData]);

    return (
        <>
            <ActivitiesFields
                lang={props.userData.lang}
                tourData={props.tourData}
                userData={props.userData}
                setUserData={props.setUserData}
                setTourData={props.setTourData}
                dayData={props.dayData}
                setDayData={props.setDayData}
                setRefresh={props.setRefresh}
                lastLogData={props.lastLogData}
            />
            <DivClear/>
            <NotesField
                lang={props.userData.lang}
            />
        </>
    );
};
