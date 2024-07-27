import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {ActivitiesTypes, userLangEnum, TourInterface, GeneralFormData, UserInterface, DayInterface, ExpenseEnum, ServiceEnum, LogInterface} from "types";
import {home} from "../../assets/txt/home";
import {DivClear} from "../common/DivClear";
import {NavigateButton} from "./NavigateButton";
import {TourStart} from "./actions/TourStart";
import {DayStart} from "./actions/DayStart";
import {useAlert} from "../../hooks/useAlert";
import {DayStop} from "./actions/DayStop";
import { AnotherLog } from "./actions/AnotherLog";
import { BorderCross } from "./actions/BorderCross";
import {AttachTrailer} from "./actions/AttachTrailer";
import {DetachTrailer} from "./actions/DetachTrailer";
import {LoadingArrival} from "./actions/LoadingArrival";
import {LoadingCompleted} from "./actions/LoadingCompleted";
import {UnloadingArrival} from "./actions/UnloadingArrival";
import { UnloadingCompleted } from "./actions/UnloadingCompleted";
import {AddExpense} from "./actions/AddExpense";
import {AddService} from "./actions/AddService";
import {TourStop} from "./actions/TourStop";
import { DeleteFromLocalStorage } from "../../hooks/LocalStorageHook";

interface Props {
    lang: userLangEnum;
    tourData: TourInterface | null;
    userData: UserInterface;
    setUserData: Dispatch<SetStateAction<UserInterface | null>>;
    setTourData: Dispatch<SetStateAction<TourInterface | null>>;
    dayData: DayInterface | null;
    setDayData: Dispatch<SetStateAction<DayInterface | null>>;
    setRefresh: Dispatch<SetStateAction<boolean>>;
    lastLogData: LogInterface | null;
}

export const ActivitiesFields = (props: Props) => {

    const {setAlert} = useAlert();
    const [activityForm, setActivityForm] = useState<ActivitiesTypes | null>(null);
    const [generalFormData, setGeneralFormData] = useState<GeneralFormData>({
        date: '',
        truck: '',
        trailer: '',
        vehicle: '',
        odometer: '',
        action: '',
        fuelQuantity: '',
        fuelCombustion: '',
        place: '',
        placeId: '',
        country: '',
        senderId: '',
        receiverId: '',
        notes: '',
        doubleCrew: 'false',
        cardInserted: 'false',
        cardTakeOut: 'false',
        driveTime: '',
        driveTime2: '',
        addNewBorder: 'false',
        description: '',
        quantity: '',
        weight: '',
        reference: '',
        loadId: '',
        payment: '',
        expenseItemDescription: '',
        expenseQuantity: '1',
        expenseUnitPrice: '',
        expenseAmount: '',
        expenseCurrency: '',
        expenseForeignAmount: '',
        expenseForeignCurrency: '',
        serviceEntry: '',
        serviceType: '',
        serviceVehicleId: '',
        serviceVehicleType: '',
    });

    const updateGeneralFormData = (key: keyof GeneralFormData, value: string): void => {
        setGeneralFormData((values: GeneralFormData) => ({
            ...values,
            [key]: value,
        }));
    };

    useEffect(() => {
        if (props.lastLogData) {
            if (props.lastLogData.odometer) updateGeneralFormData('odometer', props.lastLogData.odometer.toString());
            if (props.lastLogData.placeId) {
                updateGeneralFormData('placeId', props.lastLogData.placeId.toString());
                DeleteFromLocalStorage('place');
            }
            if (props.lastLogData.place) {
                updateGeneralFormData('place', props.lastLogData.place.toString());
                DeleteFromLocalStorage('placeId');
            }
        }
    }, [props.lastLogData]);

    if (activityForm === 'tourStart') {
        return <TourStart
            formData={generalFormData}
            lang={props.lang}
            updateFormData={updateGeneralFormData}
            setActivityForm={setActivityForm}
            userData={props.userData}
            setUserData={props.setUserData}
            dayData={props.dayData}
            setTourData={props.setTourData}
            tourData={props.tourData}
            setDayData={props.setDayData}
            setRefresh={props.setRefresh}
            lastOdometer={props.lastLogData?.odometer}
        />
    }

    if (activityForm === 'dayStart') {
        if (props.dayData !== null) {
            setActivityForm(null);
            setAlert(home[props.lang].dayExist, 'info');
        }
        return <DayStart
            formData={generalFormData}
            lang={props.lang}
            updateFormData={updateGeneralFormData}
            setActivityForm={setActivityForm}
            userData={props.userData}
            setUserData={props.setUserData}
            dayData={props.dayData}
            setTourData={props.setTourData}
            tourData={props.tourData}
            setDayData={props.setDayData}
            setRefresh={props.setRefresh}
            lastOdometer={props.lastLogData?.odometer}
        />
    }

    if (activityForm === 'dayStop') {
        if (props.dayData === null) {
            setActivityForm(null);
            setAlert(home[props.lang].dayNotExist, 'info');
        }
        return <DayStop
            formData={generalFormData}
            lang={props.lang}
            updateFormData={updateGeneralFormData}
            setActivityForm={setActivityForm}
            userData={props.userData}
            setUserData={props.setUserData}
            dayData={props.dayData}
            setTourData={props.setTourData}
            tourData={props.tourData}
            setDayData={props.setDayData}
            setRefresh={props.setRefresh}
            lastOdometer={props.lastLogData?.odometer}
        />
    }

    if (activityForm === 'anotherLog') {
        return <AnotherLog
            formData={generalFormData}
            lang={props.lang}
            updateFormData={updateGeneralFormData}
            setActivityForm={setActivityForm}
            userData={props.userData}
            setUserData={props.setUserData}
            dayData={props.dayData}
            setTourData={props.setTourData}
            tourData={props.tourData}
            setDayData={props.setDayData}
            setRefresh={props.setRefresh}
            lastOdometer={props.lastLogData?.odometer}
        />
    }

    if (activityForm === 'borderCross') {
        return <BorderCross
            formData={generalFormData}
            lang={props.lang}
            updateFormData={updateGeneralFormData}
            setActivityForm={setActivityForm}
            userData={props.userData}
            setUserData={props.setUserData}
            dayData={props.dayData}
            setTourData={props.setTourData}
            tourData={props.tourData}
            setDayData={props.setDayData}
            setRefresh={props.setRefresh}
            lastOdometer={props.lastLogData?.odometer}
        />
    }

    if (activityForm === 'attachTrailer') {
        if (props.tourData?.trailer) {
            setAlert(home[props.lang].trailerExist, 'info');
            setActivityForm(null);
        }
        return <AttachTrailer
            formData={generalFormData}
            lang={props.lang}
            updateFormData={updateGeneralFormData}
            setActivityForm={setActivityForm}
            userData={props.userData}
            setUserData={props.setUserData}
            dayData={props.dayData}
            setTourData={props.setTourData}
            tourData={props.tourData}
            setDayData={props.setDayData}
            setRefresh={props.setRefresh}
            lastOdometer={props.lastLogData?.odometer}
        />
    }

    if (activityForm === 'detachTrailer') {
        if (!props.tourData?.trailer) {
            setAlert(home[props.lang].noTrailer, 'info');
            setActivityForm(null);
        }
        return <DetachTrailer
            formData={generalFormData}
            lang={props.lang}
            updateFormData={updateGeneralFormData}
            setActivityForm={setActivityForm}
            userData={props.userData}
            setUserData={props.setUserData}
            dayData={props.dayData}
            setTourData={props.setTourData}
            tourData={props.tourData}
            setDayData={props.setDayData}
            setRefresh={props.setRefresh}
            lastOdometer={props.lastLogData?.odometer}
        />
    }

    if (activityForm === 'loadingArrival') {
        return <LoadingArrival
            formData={generalFormData}
            lang={props.lang}
            updateFormData={updateGeneralFormData}
            setActivityForm={setActivityForm}
            userData={props.userData}
            setUserData={props.setUserData}
            dayData={props.dayData}
            setTourData={props.setTourData}
            tourData={props.tourData}
            setDayData={props.setDayData}
            setRefresh={props.setRefresh}
            lastOdometer={props.lastLogData?.odometer}
        />
    }

    if (activityForm === 'loadingCompleted') {
        return <LoadingCompleted
            formData={generalFormData}
            lang={props.lang}
            updateFormData={updateGeneralFormData}
            setActivityForm={setActivityForm}
            userData={props.userData}
            setUserData={props.setUserData}
            dayData={props.dayData}
            setTourData={props.setTourData}
            tourData={props.tourData}
            setDayData={props.setDayData}
            setRefresh={props.setRefresh}
            lastOdometer={props.lastLogData?.odometer}
        />
    }

    if (activityForm === 'unloadingArrival') {
        return <UnloadingArrival
            formData={generalFormData}
            lang={props.lang}
            updateFormData={updateGeneralFormData}
            setActivityForm={setActivityForm}
            userData={props.userData}
            setUserData={props.setUserData}
            dayData={props.dayData}
            setTourData={props.setTourData}
            tourData={props.tourData}
            setDayData={props.setDayData}
            setRefresh={props.setRefresh}
            lastOdometer={props.lastLogData?.odometer}
        />
    }

    if (activityForm === 'unloadingCompleted') {
        return <UnloadingCompleted
            formData={generalFormData}
            lang={props.lang}
            updateFormData={updateGeneralFormData}
            setActivityForm={setActivityForm}
            userData={props.userData}
            setUserData={props.setUserData}
            dayData={props.dayData}
            setTourData={props.setTourData}
            tourData={props.tourData}
            setDayData={props.setDayData}
            setRefresh={props.setRefresh}
            lastOdometer={props.lastLogData?.odometer}
        />
    }

    if (activityForm === 'addExpense') {
        return <AddExpense
            formData={generalFormData}
            lang={props.lang}
            updateFormData={updateGeneralFormData}
            setActivityForm={setActivityForm}
            userData={props.userData}
            setUserData={props.setUserData}
            dayData={props.dayData}
            setTourData={props.setTourData}
            tourData={props.tourData}
            setDayData={props.setDayData}
            expenseType={ExpenseEnum.standard}
            setRefresh={props.setRefresh}
            lastOdometer={props.lastLogData?.odometer}
        />
    }

    if (activityForm === 'addFuelRefuel') {
        return <AddExpense
            formData={generalFormData}
            lang={props.lang}
            updateFormData={updateGeneralFormData}
            setActivityForm={setActivityForm}
            userData={props.userData}
            setUserData={props.setUserData}
            dayData={props.dayData}
            setTourData={props.setTourData}
            tourData={props.tourData}
            setDayData={props.setDayData}
            expenseType={ExpenseEnum.fuel}
            setRefresh={props.setRefresh}
            lastOdometer={props.lastLogData?.odometer}
        />
    }

    if (activityForm === 'addDefRefuel') {
        return <AddExpense
            formData={generalFormData}
            lang={props.lang}
            updateFormData={updateGeneralFormData}
            setActivityForm={setActivityForm}
            userData={props.userData}
            setUserData={props.setUserData}
            dayData={props.dayData}
            setTourData={props.setTourData}
            tourData={props.tourData}
            setDayData={props.setDayData}
            expenseType={ExpenseEnum.def}
            setRefresh={props.setRefresh}
            lastOdometer={props.lastLogData?.odometer}
        />
    }

    if (activityForm === 'addService') {
        return <AddService
            formData={generalFormData}
            lang={props.lang}
            updateFormData={updateGeneralFormData}
            setActivityForm={setActivityForm}
            userData={props.userData}
            setUserData={props.setUserData}
            dayData={props.dayData}
            setTourData={props.setTourData}
            tourData={props.tourData}
            setDayData={props.setDayData}
            serviceType={ServiceEnum.standard}
            setRefresh={props.setRefresh}
            lastOdometer={props.lastLogData?.odometer}
        />
    }

    if (activityForm === 'addLubrication') {
        return <AddService
            formData={generalFormData}
            lang={props.lang}
            updateFormData={updateGeneralFormData}
            setActivityForm={setActivityForm}
            userData={props.userData}
            setUserData={props.setUserData}
            dayData={props.dayData}
            setTourData={props.setTourData}
            tourData={props.tourData}
            setDayData={props.setDayData}
            serviceType={ServiceEnum.fifthWheelLube}
            setRefresh={props.setRefresh}
            lastOdometer={props.lastLogData?.odometer}
        />
    }

    if (activityForm === 'tourStop') {
        if (props.dayData !== null) {
            setActivityForm(null);
            setAlert(home[props.lang].dayExistRegardRoute, 'info');
        }
        return <TourStop
            formData={generalFormData}
            lang={props.lang}
            updateFormData={updateGeneralFormData}
            setActivityForm={setActivityForm}
            userData={props.userData}
            setUserData={props.setUserData}
            dayData={props.dayData}
            setTourData={props.setTourData}
            tourData={props.tourData}
            setDayData={props.setDayData}
            setRefresh={props.setRefresh}
            lastOdometer={props.lastLogData?.odometer}
        />
    }

    if (props.tourData) {
        return (
            <>
                <fieldset className="DivInline">
                    <legend>{home[props.lang].fieldDaysLogs}</legend>
                    <NavigateButton activityForm='dayStart' set={setActivityForm} text={home[props.lang].dayStart}/><br/>
                    <NavigateButton activityForm='dayStop' set={setActivityForm} text={home[props.lang].dayStop}/><br/>
                    <NavigateButton activityForm='borderCross' set={setActivityForm} text={home[props.lang].borderCross}/><br/>
                    <NavigateButton activityForm='anotherLog' set={setActivityForm} text={home[props.lang].anotherLog}/><br/>
                </fieldset>
                <fieldset className="DivInline">
                    <legend>{home[props.lang].fieldFinances}</legend>
                    <NavigateButton activityForm='addExpense' set={setActivityForm} text={home[props.lang].addExpense}/><br/>
                    <NavigateButton activityForm='addFuelRefuel' set={setActivityForm} text={home[props.lang].addFuelRefuel}/><br/>
                    <NavigateButton activityForm='addDefRefuel' set={setActivityForm} text={home[props.lang].addDefRefuel}/><br/>
                </fieldset>
                <fieldset className="DivInline">
                    <legend>{home[props.lang].fieldLoads}</legend>
                    <NavigateButton activityForm='loadingArrival' set={setActivityForm} text={home[props.lang].loadingArrival}/><br/>
                    <NavigateButton activityForm='loadingCompleted' set={setActivityForm} text={home[props.lang].loading}/><br/>
                    <NavigateButton activityForm='unloadingArrival' set={setActivityForm} text={home[props.lang].unloadingArrival}/><br/>
                    <NavigateButton activityForm='unloadingCompleted' set={setActivityForm} text={home[props.lang].unloading}/><br/>
                </fieldset>
                <fieldset className="DivInline">
                    <legend>{home[props.lang].fieldVehicle}</legend>
                    <NavigateButton activityForm='attachTrailer' set={setActivityForm} text={home[props.lang].attachTrailer}/><br/>
                    <NavigateButton activityForm='detachTrailer' set={setActivityForm} text={home[props.lang].detachTrailer}/><br/>
                    <NavigateButton activityForm='addService' set={setActivityForm} text={home[props.lang].addService}/><br/>
                    <NavigateButton activityForm='addLubrication' set={setActivityForm} text={home[props.lang].addLubrication}/><br/>
                </fieldset>
                <DivClear/>
                <NavigateButton activityForm='tourStop' set={setActivityForm} text={home[props.lang].tourStop}/><br/>
            </>

        );
    }
    return (
        <NavigateButton activityForm='tourStart' set={setActivityForm} text={home[props.lang].tourStart}/>
    );

}