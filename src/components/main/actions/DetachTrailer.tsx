import React, {FormEvent, useState} from "react";
import {ActionsPropsTypes} from "../../../types/ActionsPropsTypes";
import {home} from "../../../assets/txt/home";
import {DateInput} from "../../common/form/DateInput";
import {OdometerInput} from "../../common/form/OdometerInput";
import {PlaceInput} from "../../common/form/PlaceInput";
import {TextArea} from "../../common/form/TextArea";
import {places} from "../../../assets/txt/places";
import {SubmitButton} from "../../common/form/SubmitButton";
import {Link} from "react-router-dom";
import {DetachTrailerData, LoadInterface} from "types";
import {useApi} from "../../../hooks/useApi";
import {useAlert} from "../../../hooks/useAlert";
import {CircularProgress} from "@mui/material";
import {apiPaths} from "../../../config/api";
import {handleApiResult} from "../../../utils/handleApiResult";
import {WindowConfirm} from "../../common/WindowConfirm";

export const DetachTrailer = (props: ActionsPropsTypes) => {

    const {loading, fetchData} = useApi();
    const {setAlert} = useAlert();
    const [confirm, setConfirm] = useState<boolean>(false);
    const [text, setText] = useState<string>('');

    const check = async (e: FormEvent) => {
        e.preventDefault();
        const result = await fetchData(apiPaths.getNotUnloadedLoads, {
            headers: {'Content-Type': 'application/json'},
            credentials: "include",
        });
        if ((result && result.data) && (!result.data.dtc)) {
            const loads = result.data.filter((obj: LoadInterface) => obj.vehicle === props.tourData?.trailer);
            if (loads.length>0) {
                setText(home[props.lang].detachTrailerConfirm(loads.length));
                setConfirm(true);
            } else {
                await send();
            }
        }
    }

    const send = async () => {
        const sendData: DetachTrailerData = {
            date: props.formData.date,
            country: props.formData.country,
            place: props.formData.place,
            placeId: props.formData.placeId,
            odometer: props.formData.odometer,
            notes: props.formData.notes,
            action: home[props.lang].detachTrailerAction,
            unloadAction: home[props.lang].unloadingAction,
        }
        const result = await fetchData(apiPaths.detachTrailer, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(sendData),
            credentials: "include",
        });
        handleApiResult(result, props.lang, setAlert, () => {
            setAlert(home[props.lang].detachTrailerSuccess, 'success');
            if (props.tourData) {
                props.setTourData({...props.tourData, trailer: null});
            }
            props.setActivityForm(null);
        });
    }

    if (loading) {
        return <CircularProgress/>
    }

    return (<>
        <fieldset>
            <Link to="" className="Link" onClick={() => props.setActivityForm(null)}>{home[props.lang].back}</Link><br/><br/>
            <legend>{home[props.lang].detachTrailer}</legend>
            <form onSubmit={check}>
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
                <div><TextArea label={places[props.lang].description} value={props.formData.notes}
                               onChange={e => props.updateFormData('notes', e.target.value)}/></div>
                <br/>
                <SubmitButton text={home[props.lang].detachTrailer}/>
            </form>
            <br/>
            <Link to="" className="Link" onClick={() => props.setActivityForm(null)}>{home[props.lang].back}</Link>
        </fieldset>
            <WindowConfirm lang={props.lang} text={text} show={confirm} setShow={setConfirm} execute={send}/>
        </>
    );
}