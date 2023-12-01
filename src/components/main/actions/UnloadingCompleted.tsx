import React, {FormEvent, useState} from "react";
import {ActionsPropsTypes} from "../../../types/ActionsPropsTypes";
import {Link} from "react-router-dom";
import {home} from "../../../assets/txt/home";
import {DateInput} from "../../common/form/DateInput";
import {OdometerInput} from "../../common/form/OdometerInput";
import {TextArea} from "../../common/form/TextArea";
import {places} from "../../../assets/txt/places";
import {SubmitButton} from "../../common/form/SubmitButton";
import {LoadSelect} from "../../common/form/load/LoadSelect";
import {OnOffSwitch} from "../../common/form/OnOffSwitch";
import {PlaceInput} from "../../common/form/PlaceInput";
import { UnloadingData } from "types";
import {apiPaths} from "../../../config/api";
import {useApi} from "../../../hooks/useApi";
import {CircularProgress} from "@mui/material";
import {useAlert} from "../../../hooks/useAlert";
import {handleApiResult} from "../../../utils/handleApiResult";

export const UnloadingCompleted = (props: ActionsPropsTypes) => {

    const {loading, fetchData} = useApi();
    const {setAlert} = useAlert();
    const [switchValue, setSwitchValue] = useState<'false' | 'true'>('true');

    const send = async (e: FormEvent) => {
        e.preventDefault();
        const sendData: UnloadingData = {
            date: props.formData.date,
            country: props.formData.country,
            place: props.formData.place,
            placeId: props.formData.placeId,
            odometer: props.formData.odometer,
            notes: props.formData.notes,
            action: home[props.lang].loadingAction,
            loadId: props.formData.loadId,
            isPlaceAsReceiver: switchValue,
        }
        const result = await fetchData(apiPaths.unloadingArrival, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(sendData),
            credentials: "include",
        });
        handleApiResult(result, props.lang, setAlert, () => {
            //setAlert(home[props.lang].unloadingArrivalSuccess, 'success');
            //props.setActivityForm(null);
            //props.setUserData({...props.userData, markedArrive: 0});
        });
    }

    if (loading) {
        return <CircularProgress/>
    }

    return (
        <fieldset>
            <Link to="" className="Link" onClick={() => props.setActivityForm(null)}>{home[props.lang].back}</Link><br/><br/>
            <legend>{home[props.lang].unloadingArrival}</legend>
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
                <div><LoadSelect
                    value={props.formData.loadId}
                    lang={props.lang}
                    onChange={e => props.updateFormData('loadId', e)}
                />
                </div>
                <br/>
                <div>
                    <OnOffSwitch
                        label={home[props.lang].unloadingLoadSelectLabel}
                        value={switchValue}
                        onChange={e => setSwitchValue(e)}
                    />
                </div>
                <br/>
                {switchValue === 'false' &&
                    <><div><PlaceInput
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
                        <br/></>
                }
                <div><TextArea label={places[props.lang].description} value={props.formData.notes}
                               onChange={e => props.updateFormData('notes', e.target.value)}/></div>
                <br/>
                <SubmitButton text={home[props.lang].unloadingArrival}/>
            </form>
            <br/>
            <Link to="" className="Link" onClick={() => props.setActivityForm(null)}>{home[props.lang].back}</Link>
        </fieldset>
    );
}