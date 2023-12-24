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
import { AddLogData } from "types";
import {VehicleInput} from "../../common/form/VehicleInput";
import {useApi} from "../../../hooks/useApi";
import {useAlert} from "../../../hooks/useAlert";
import {CircularProgress} from "@mui/material";
import {apiPaths} from "../../../config/api";
import {handleApiResult} from "../../../utils/handleApiResult";

export const AttachTrailer = (props: ActionsPropsTypes) => {

    const {loading, fetchData} = useApi();
    const {setAlert} = useAlert();
    const [trailer, setTrailer] = useState<string>('');

    const send = async (e: FormEvent) => {
        e.preventDefault();
        if (trailer.length <= 3) {
            setAlert(home[props.lang].trailerNoExist, 'warning');
        } else {
            const sendData: AddLogData = {
                date: props.formData.date,
                country: props.formData.country,
                place: props.formData.place,
                placeId: props.formData.placeId,
                odometer: props.formData.odometer,
                notes: props.formData.notes,
                action: home[props.lang].attachTrailerAction + ': ' + trailer.replace(/\s/g, ''),
            }
            const result = await fetchData(apiPaths.attachTrailer, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(sendData),
                credentials: "include",
            });
            handleApiResult(result, props.lang, setAlert, () => {
                setAlert(home[props.lang].attachTrailerSuccess, 'success');
                if (props.tourData) {props.setTourData({...props.tourData, trailer});}
                props.setActivityForm(null);
            });
        }
    }

    return (
        <fieldset>
            <Link to="" className="Link" onClick={() => props.setActivityForm(null)}>{home[props.lang].back}</Link><br/><br/>
            <legend>{home[props.lang].attachTrailer}</legend>
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
                <div>
                    <VehicleInput lang={props.lang} value={trailer} onChange={e => setTrailer(e.target.value)} vehicle='trailer'/>
                </div>
                <br/>
                <div><TextArea label={places[props.lang].description} value={props.formData.notes}
                               onChange={e => props.updateFormData('notes', e.target.value)}/></div>
                <br/>
                {loading ?
                    <CircularProgress/> :
                    <SubmitButton text={home[props.lang].attachTrailer}/>
                }
            </form>
            <br/>
            <Link to="" className="Link" onClick={() => props.setActivityForm(null)}>{home[props.lang].back}</Link>
        </fieldset>
    );
}