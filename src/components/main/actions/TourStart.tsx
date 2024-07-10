import React, {FormEvent} from "react";
import {home} from "../../../assets/txt/home";
import {apiPaths} from "../../../config/api";
import {DateTimeInput} from "../../common/form/DateTimeInput";
import {RegistrationNrInput} from "../../common/form/vehicles/RegistrationNrInput";
import {FuelInput} from "../../common/form/FuelInput";
import {OdometerInput} from "../../common/form/OdometerInput";
import {PlaceInput} from "../../common/form/PlaceInput";
import {TextArea} from "../../common/form/TextArea";
import {places} from "../../../assets/txt/places";
import {SubmitButton} from "../../common/form/SubmitButton";
import {Link} from "react-router-dom";
import {StartTourData, TourInterface} from 'types';
import {useApi} from "../../../hooks/useApi";
import {useAlert} from "../../../hooks/useAlert";
import {CircularProgress} from "@mui/material";
import {ActionsPropsTypes} from "../../../types/ActionsPropsTypes";

export const TourStart = (props:ActionsPropsTypes) => {

    const { loading, fetchData} = useApi();
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
        fetchData<TourInterface>(apiPaths.createNewRoute, {method: 'POST', sendData}, {setAlert, lang: props.lang})
            .then((res) => {
                if (res.success && res.responseData) {
                    setAlert(home[props.lang].startedTour, 'success');
                    props.setActivityForm(null);
                    props.setTourData(res.responseData);
                    props.setRefresh((prev => !prev));
                }
            });
    }

    return (
        <fieldset>
            <Link to="" className="Link" onClick={() => props.setActivityForm(null)}>{home[props.lang].back}</Link><br/><br/>
            <legend>{home[props.lang].tourStart}</legend>
            <form onSubmit={sendTourStart}>
                <div><DateTimeInput
                    lang={props.lang}
                    value={props.formData.date}
                    onChange={e => props.updateFormData('date', e)}
                />
                </div>
                <br/>
                <div><RegistrationNrInput
                    lang={props.lang}
                    value={props.formData.truck}
                    onChange={e => props.updateFormData('truck', e)}
                    vehicle='truck'
                />
                </div>
                <br/>
                <div><FuelInput
                    lang={props.lang}
                    value={props.formData.fuelQuantity}
                    onChange={e => props.updateFormData('fuelQuantity', e)}
                    type='quantity'
                    userFuelConType={props.userData.fuelConType}
                />
                </div>
                <br/>
                <div><OdometerInput
                    lang={props.lang}
                    value={props.formData.odometer}
                    onChange={e => props.updateFormData('odometer', e)}
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
                {loading ?
                    <CircularProgress/> :
                    <SubmitButton text={home[props.lang].tourStart}/>
                }
            </form>
            <br/>
            <Link to="" className="Link" onClick={() => props.setActivityForm(null)}>{home[props.lang].back}</Link>
        </fieldset>
    );
}