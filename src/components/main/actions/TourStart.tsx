import React, {FormEvent} from "react";
import {home} from "../../../assets/txt/home";
import {apiPaths} from "../../../config/api";
import {DateInput} from "../../common/form/DateInput";
import {VehicleInput} from "../../common/form/VehicleInput";
import {FuelInput} from "../../common/form/FuelInput";
import {OdometerInput} from "../../common/form/OdometerInput";
import {PlaceInput} from "../../common/form/PlaceInput";
import {TextArea} from "../../common/form/TextArea";
import {places} from "../../../assets/txt/places";
import {SubmitButton} from "../../common/form/SubmitButton";
import {Link} from "react-router-dom";
import {StartTourData} from 'types';
import {useApi} from "../../../hooks/useApi";
import {useAlert} from "../../../hooks/useAlert";
import {CircularProgress} from "@mui/material";
import {commons} from "../../../assets/txt/commons";
import {login} from "../../../assets/txt/login";
import {ActionsPropsTypes} from "../../../types/ActionsPropsTypes";

export const TourStart = (props:ActionsPropsTypes) => {

    const { loading, fetchData } = useApi();
    const {setAlert} = useAlert();

    const sendTourStart = async (e: FormEvent) => {
        e.preventDefault();
        const sendData: StartTourData = {
            action: home[props.lang].startedTourAction,
            country: props.formData.country,
            place: props.formData.place,
            truck: props.formData.truck,
            placeId: props.formData.placeId,
            odometer: props.formData.odometer,
            notes: props.formData.notes,
            date: props.formData.date,
            fuelStateBefore: props.formData.fuelQuantity,
        }
        const result = await fetchData(apiPaths.createNewRoute, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(sendData),
            credentials: "include",
        });
        if (result && !result.success) {
            setAlert(commons[props.lang].apiConnectionError, 'error');
        } else {
            if (result && result.data) {
                if (!result.data.dtc) {
                        setAlert(home[props.lang].startedTour, 'success');
                        props.setActivityForm(null);
                        props.setTourData(result.data);
                } else {

                    setAlert(commons[props.lang].apiUnknownError, 'error');
                    if (result.data.dtc === 'Unauthorized') {
                        setAlert(commons[props.lang].apiUnauthorized, 'error');
                    }
                    if (result.data.dtc === 'country') {
                        setAlert(login[props.lang].registerCountryNotExist, 'warning');
                    }
                    if (result.data.dtc === 'truck') {
                        setAlert(home[props.lang].truckNoExist, 'warning');
                    }
                    if (result.data.dtc === 'activeRoute') {
                        setAlert(home[props.lang].tourExist, 'info');
                    }
                }
            }
        }
    }

    if (loading) {
        return <CircularProgress/>
    }

    return (
        <fieldset>
            <legend>{home[props.lang].tourStart}</legend>
            <form onSubmit={sendTourStart}>
                <div><DateInput
                    lang={props.lang}
                    value={props.formData.date}
                    onChange={e => props.updateFormData('date', e)}
                />
                </div>
                <br/>
                <div><VehicleInput
                    lang={props.lang}
                    value={props.formData.truck}
                    onChange={e => props.updateFormData('truck', e.target.value)}
                    vehicle='truck'
                />
                </div>
                <br/>
                <div><FuelInput
                    lang={props.lang}
                    value={props.formData.fuelQuantity}
                    onChange={e => props.updateFormData('fuelQuantity', e.target.value)}
                    type='quantity'
                    userFuelConType={props.userData.fuelConType}
                />
                </div>
                <br/>
                <div><OdometerInput
                    lang={props.lang}
                    value={props.formData.odometer}
                    onChange={e => props.updateFormData('odometer', e.target.value)}
                />
                </div>
                <br/>
                <div><PlaceInput
                    lang={props.lang}
                    defaultCountry={props.userData.country}
                    countryValue={props.formData.country}
                    countryOnChange={e => props.updateFormData('country', e)}
                    placeValue={props.formData.place}
                    placeOnChange={e => props.updateFormData('place', e)}
                    placeIdValue={props.formData.placeId}
                    placeIdOnChange={e => props.updateFormData('placeId', e)}
                />
                </div>
                <br/>
                <div><TextArea label={places[props.lang].description} value={props.formData.notes}
                               onChange={e => props.updateFormData('notes', e.target.value)}/></div>
                <br/>
                <SubmitButton text={home[props.lang].tourStart}/>
            </form>
            <br/>
            <Link to="" className="Link" onClick={() => props.setActivityForm(null)}>{home[props.lang].back}</Link>
        </fieldset>
    );
}