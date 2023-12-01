import React, {FormEvent, useEffect, useRef, useState} from "react";
import {ActionsPropsTypes} from "../../../types/ActionsPropsTypes";
import {CircularProgress} from "@mui/material";
import {Link} from "react-router-dom";
import {home} from "../../../assets/txt/home";
import {DateInput} from "../../common/form/DateInput";
import {OdometerInput} from "../../common/form/OdometerInput";
import {PlaceInput} from "../../common/form/PlaceInput";
import {TextArea} from "../../common/form/TextArea";
import {places} from "../../../assets/txt/places";
import {SubmitButton} from "../../common/form/SubmitButton";
import {useApi} from "../../../hooks/useApi";
import {useAlert} from "../../../hooks/useAlert";
import { AddLogData } from "types";
import {apiPaths} from "../../../config/api";
import {commons} from "../../../assets/txt/commons";
import {login} from "../../../assets/txt/login";

export const LoadingArrival = (props: ActionsPropsTypes) => {

    const {loading, fetchData} = useApi();
    const {setAlert} = useAlert();
    const [place, setPlace] = useState<string>(props.userData.markedDepart !== 0 ? '' : props.formData.place);
    const [placeId, setPlaceId] = useState<string>(props.userData.markedDepart !== 0 ? props.userData.markedDepart.toString() : props.formData.placeId);
    const firstRender = useRef<boolean>(true);

    if (firstRender.current) {
        props.updateFormData('place', place);
        props.updateFormData('placeId', placeId);
        firstRender.current = false;
    }

    useEffect(() => {
        setPlace(props.formData.place);
        setPlaceId(props.formData.placeId);
        // eslint-disable-next-line
    }, [props.formData.place, props.formData.placeId]);

    const send = async (e: FormEvent) => {
        e.preventDefault();
        const sendData: AddLogData = {
            date: props.formData.date,
            country: props.formData.country,
            place: props.formData.place,
            placeId: props.formData.placeId,
            odometer: props.formData.odometer,
            notes: props.formData.notes,
            action: home[props.lang].loadingArrivalAction,
        }
        const result = await fetchData(apiPaths.loadingArrival, {
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
                    setAlert(home[props.lang].loadingArrivalSuccess, 'success');
                    props.setActivityForm(null);
                    props.setUserData({...props.userData, markedDepart: 0, markedArrive: Number(sendData.placeId)});
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
                }
            }
        }
    }

    if (loading) {
        return <CircularProgress/>
    }

    return (
        <fieldset>
            <Link to="" className="Link" onClick={() => props.setActivityForm(null)}>{home[props.lang].back}</Link><br/><br/>
            <legend>{home[props.lang].loadingArrival}</legend>
            <form onSubmit={send}>
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
                    placeValue={place}
                    placeOnChange={e => props.updateFormData('place', e)}
                    placeIdValue={placeId}
                    placeIdOnChange={e => props.updateFormData('placeId', e)}
                />
                </div>
                <br/>
                <div><TextArea label={places[props.lang].description} value={props.formData.notes}
                               onChange={e => props.updateFormData('notes', e.target.value)}/></div>
                <br/>
                <SubmitButton text={home[props.lang].loadingArrival}/>
            </form>
            <br/>
            <Link to="" className="Link" onClick={() => props.setActivityForm(null)}>{home[props.lang].back}</Link>
        </fieldset>
    );
}