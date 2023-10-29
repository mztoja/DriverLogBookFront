import React, {Dispatch, SetStateAction, useState} from "react";
import {ActivitiesTypes, userLangEnum, TourInterface, GeneralFormData, UserInterface} from "types";
import {home} from "../../assets/txt/home";
import {DivClear} from "../common/DivClear";
import {NavigateButton} from "./NavigateButton";
import {TourStart} from "./Actions/TourStart";

interface Props {
    lang: userLangEnum;
    tourData?: TourInterface | null;
    userData: UserInterface;
    setTourData: Dispatch<SetStateAction<TourInterface | null>>;
}

export const ActivitiesFieldsets = (props: Props) => {

    const [activityForm, setActivityForm] = useState<ActivitiesTypes | null>(null);
    const [generalFormData, setGeneralFormData] = useState<GeneralFormData>({
        data: '',
        truck: '',
        trailer: '',
        odometer: '',
        action: '',
        fuelQuantity: '',
        fuelCombustion: '',
        place: '',
        placeId: '',
        country: '',
        notes: '',
    });

    const updateGeneralFormData = (key: string, value: string) => {
        setGeneralFormData((values: GeneralFormData) => ({
            ...values,
            [key]: value,
        }));
    };

    if (activityForm === 'tourStart') {
        return <TourStart
            formData={generalFormData}
            lang={props.lang}
            updateFormData={updateGeneralFormData}
            setActivityForm={setActivityForm}
            userData={props.userData}
            setTourData={props.setTourData}
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