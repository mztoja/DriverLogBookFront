import React, {Dispatch, FormEvent, SetStateAction, useState} from "react";
import {ActivitiesTypes, userLangEnum, TourInterface, GeneralFormData, UserInterface} from "types";
import {home} from "../../assets/txt/home";
import {DivClear} from "../common/DivClear";
import {NavigateButton} from "./NavigateButton";
import {Link} from "react-router-dom";
import {SubmitButton} from "../common/form/SubmitButton";
import {DateInput} from "../common/form/DateInput";
import {VehicleInput} from "../common/form/VehicleInput";
import {FuelInput} from "../common/form/FuelInput";
import {OdometerInput} from "../common/form/OdometerInput";
import {TextArea} from "../common/form/TextArea";
import {places} from "../../assets/txt/places";
import {PlaceInput} from "../common/form/PlaceInput";
import {apiPaths} from "../../config/api";
import {useApi} from '../../hooks/useApi';
import {useAlert} from "../../hooks/useAlert";
import {CircularProgress} from "@mui/material";
import {login} from "../../assets/txt/login";

interface Props {
    lang: userLangEnum;
    tourData?: TourInterface | null;
    userData: UserInterface;
    setTourData: Dispatch<SetStateAction<TourInterface | null>>;
}

export const ActivitiesFieldsets = (props: Props) => {

    const [activityForm, setActivityForm] = useState<ActivitiesTypes | null>(null);
    const { loading, fetchData } = useApi();
    const {setAlert} = useAlert();

    const [generalFormData, setGeneralFormData] = useState<GeneralFormData>({
        userId: props.userData.id,
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

        const sendTourStart = async (e: FormEvent) => {
            e.preventDefault();
            setGeneralFormData((values: GeneralFormData) => ({
                ...values,
                action: home[props.lang].startedTourAction,
            }));
            const result = await fetchData(apiPaths.createNewRoute, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(generalFormData),
            });
            // if (result.success) {
            //     setAlert(home[props.lang].startedTour, 'success');
            //     setActivityForm(null);
            //     props.setTourData(result.data);
            // } else {
            //     if (result.error === 'no truck number provided') {
            //         setAlert(home[props.lang].truckNoExist, 'warning');
            //     } else if (result.error === 'no fuel quantity') {
            //         setAlert(home[props.lang].fuelQuantityNoExist, 'warning');
            //     } else if (result.error === 'country not specified') {
            //         setAlert(places[props.lang].countryNotExist, 'warning');
            //     } else if (result.error === 'no place provided') {
            //         setAlert(home[props.lang].placeNoExist, 'warning');
            //     } else {
            //         setAlert(login[props.lang].dbConnectionError, 'error');
            //     }
            // }
        }
        return (
            <fieldset>
                <legend>{home[props.lang].tourStart}</legend>
                <form onSubmit={sendTourStart}>
                    <div><DateInput
                        lang={props.lang}
                        value={generalFormData.data}
                        onChange={e => updateGeneralFormData('data', e)}
                    />
                    </div>
                    <br/>
                    <div><VehicleInput
                        lang={props.lang}
                        value={generalFormData.truck}
                        onChange={e => updateGeneralFormData('truck', e.target.value)}
                        vehicle='truck'
                    />
                    </div>
                    <br/>
                    <div><FuelInput
                        lang={props.lang}
                        value={generalFormData.fuelQuantity}
                        onChange={e => updateGeneralFormData('fuelQuantity', e.target.value)}
                        type='quantity'
                        userFuelConType={props.userData.fuelConType}
                    />
                    </div>
                    <br/>
                    <div><OdometerInput
                        lang={props.lang}
                        value={generalFormData.odometer}
                        onChange={e => updateGeneralFormData('odometer', e.target.value)}
                    />
                    </div>
                    <br/>
                    <div><PlaceInput
                        lang={props.lang}
                        defaultCountry={props.userData.country}
                        countryValue={generalFormData.country}
                        countryOnChange={e => updateGeneralFormData('country', e)}
                        placeValue={generalFormData.place}
                        placeOnChange={e => updateGeneralFormData('place', e)}
                        placeIdValue={generalFormData.placeId}
                        placeIdOnChange={e => updateGeneralFormData('placeId', e)}
                    />
                    </div>
                    <br/>
                    <div><TextArea label={places[props.lang].description} value={generalFormData.notes}
                                   onChange={e => updateGeneralFormData('notes', e.target.value)}/></div>
                    <br/>
                    <SubmitButton text={home[props.lang].tourStart}/>
                </form>
                <br/>
                <Link to="" className="Link" onClick={() => setActivityForm(null)}>{home[props.lang].back}</Link>
            </fieldset>
        );
    }

    if (loading) {
        return <CircularProgress/>
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