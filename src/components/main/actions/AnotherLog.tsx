import React, {FormEvent} from "react";
import {ActionsPropsTypes} from "../../../types/ActionsPropsTypes";
import {useApi} from "../../../hooks/useApi";
import {useAlert} from "../../../hooks/useAlert";
import {CircularProgress} from "@mui/material";
import {home} from "../../../assets/txt/home";
import {DateInput} from "../../common/form/DateInput";
import {OdometerInput} from "../../common/form/OdometerInput";
import {PlaceInput} from "../../common/form/PlaceInput";
import {TextArea} from "../../common/form/TextArea";
import {places} from "../../../assets/txt/places";
import {SubmitButton} from "../../common/form/SubmitButton";
import {Link} from "react-router-dom";
import {ActionInput} from "../../common/form/ActionInput";
import { AddLogData } from "types";
import {apiPaths} from "../../../config/api";
import {commons} from "../../../assets/txt/commons";
import {login} from "../../../assets/txt/login";

export const AnotherLog = (props: ActionsPropsTypes) => {

    const {loading, fetchData} = useApi();
    const {setAlert} = useAlert();

    const sendAnotherLog = async (e: FormEvent) => {
        e.preventDefault();
        const sendData: AddLogData = {
            date: props.formData.date,
            country: props.formData.country,
            place: props.formData.place,
            placeId: props.formData.placeId,
            odometer: props.formData.odometer,
            notes: props.formData.notes,
            action: props.formData.action,
        }
        const result = await fetchData(apiPaths.createNewLog, {
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
                    setAlert(home[props.lang].anotherActionSuccess, 'success');
                    props.setActivityForm(null);
                } else {
                    setAlert(commons[props.lang].apiUnknownError, 'error');
                    if (result.data.dtc === 'Unauthorized') {
                        setAlert(commons[props.lang].apiUnauthorized, 'error');
                    }
                    if (result.data.dtc === 'country') {
                        setAlert(login[props.lang].registerCountryNotExist, 'warning');
                    }
                    if (result.data.dtc === 'noActiveRoute') {
                        setAlert(home[props.lang].noActiveRoute, 'info');
                    }
                    if (result.data.dtc === 'action') {
                        setAlert(home[props.lang].actionNoExist, 'info');
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
            <legend>{home[props.lang].anotherLog}</legend>
            <form onSubmit={sendAnotherLog}>
                <div><DateInput
                    lang={props.lang}
                    value={props.formData.date}
                    onChange={e => props.updateFormData('date', e)}
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
                <div>
                    <ActionInput lang={props.lang} value={props.formData.action} onChange={e => props.updateFormData('action', e.target.value)}/>
                </div>
                <br/>
                <div><TextArea label={places[props.lang].description} value={props.formData.notes}
                               onChange={e => props.updateFormData('notes', e.target.value)}/></div>
                <br/>
                <SubmitButton text={home[props.lang].anotherLog}/>
            </form>
            <br/>
            <Link to="" className="Link" onClick={() => props.setActivityForm(null)}>{home[props.lang].back}</Link>
        </fieldset>
    );
}