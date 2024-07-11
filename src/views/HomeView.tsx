import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {apiPaths} from "../config/api";
import {TopBar} from "../components/bars/TopBar/TopBar";
import {Content} from "../components/bars/Content/Content";
import {ActivitiesFields} from "../components/main/ActivitiesFields";
import {InfoBar} from "../components/bars/InfoBar/InfoBar";
import {useApi} from "../hooks/useApi";
import {AppMainElementsTypes} from "../types/AppMainElementsTypes";
import {UserInterface, TourInterface, DayInterface, LogInterface} from "types";
import {MenuLabelTypes} from "../types/MenuLabelTypes";
import { NotesField } from "../components/main/NotesField";

interface Props extends AppMainElementsTypes {
    userData: UserInterface;
    setUserData: Dispatch<SetStateAction<UserInterface | null>>,
    page: keyof MenuLabelTypes;
    tourData: TourInterface | null,
    setTourData: Dispatch<SetStateAction<TourInterface | null>>,
}

export const HomeView = (props: Props) => {

    const {fetchData} = useApi();
    const [refresh, setRefresh] = useState<boolean>(false);
    const [lastLogData, setLastLogData] = useState<LogInterface | null>(null);
    const [dayData, setDayData] = useState<DayInterface | null>(null);

    useEffect(() => {
        fetchData<TourInterface>(apiPaths.getActiveRoute, {
            setData: props.setTourData,
        }).then();
        fetchData<UserInterface>(apiPaths.get, {
            setData: props.setUserData,
        }).then((res) => {
            if (!res.success) {
                props.setUserData(null);
            }
        });
        fetchData<LogInterface>(apiPaths.getLastLog, {
            setData: setLastLogData,
        }).then();
        // eslint-disable-next-line
    }, [refresh]);

    useEffect(() => {
        fetchData<DayInterface>(apiPaths.getActiveDay, {
            setData: setDayData,
        }).then();
        // eslint-disable-next-line
    }, [props.tourData]);

    return (
        <>
            <TopBar
                page={props.page}
                lang={props.userData.lang}
                userData={props.userData}
                setUserData={props.setUserData}
            />
            <Content>
                {props.tourData &&
                    <>
                        <InfoBar
                            lang={props.userData.lang}
                            tourData={props.tourData}
                            dayData={dayData}
                            lastLogData={lastLogData}
                            userData={props.userData}
                            setUserData={props.setUserData}
                            refresh={refresh}
                            setRefresh={setRefresh}
                        />
                        <br/>
                    </>
                }
                <ActivitiesFields
                    lang={props.userData.lang}
                    tourData={props.tourData}
                    userData={props.userData}
                    setUserData={props.setUserData}
                    setTourData={props.setTourData}
                    dayData={dayData}
                    setDayData={setDayData}
                    setRefresh={setRefresh}
                    lastLogData={lastLogData}
                />
                <NotesField
                    notes={props.userData.notes}
                    lang={props.userData.lang}
                />
            </Content>
        </>
    )
};