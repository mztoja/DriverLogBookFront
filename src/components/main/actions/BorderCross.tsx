import React, {FormEvent} from "react";
import {ActionsPropsTypes} from "../../../types/ActionsPropsTypes";
import {home} from "../../../assets/txt/home";
import {DateTimeInput} from "../../common/form/DateTimeInput";
import {OdometerInput} from "../../common/form/OdometerInput";
import {TextArea} from "../../common/form/TextArea";
import {places} from "../../../assets/txt/places";
import {SubmitButton} from "../../common/form/SubmitButton";
import {Link} from "react-router-dom";
import {BorderInput} from "../../common/form/border/BorderInput";
import { BorderCrossData } from "types";
import {apiPaths} from "../../../config/api";
import {useApi} from "../../../hooks/useApi";
import {useAlert} from "../../../hooks/useAlert";
import {CircularProgress} from "@mui/material";

export const BorderCross = (props: ActionsPropsTypes) => {

    const {loading, fetchData} = useApi();
    const {setAlert} = useAlert();

    const sendBorderCross = async (e: FormEvent) => {
        e.preventDefault();
        props.updateFormData('placeId', '0');
        const sendData: BorderCrossData = {
            placeId: '0',
            place: props.formData.place,
            country: props.formData.country,
            date: props.formData.date,
            notes: props.formData.notes,
            odometer: props.formData.odometer,
            action: home[props.lang].borderCross+' '+props.userData.country+' > '+props.formData.country,
            addNewBorder: props.formData.addNewBorder,
        }
        fetchData(apiPaths.createBorderCross, {method: 'POST', sendData}, {setAlert, lang: props.lang})
            .then((res) => {
                if (res.success) {
                    setAlert(home[props.lang].borderCrossSuccess, 'success');
                    props.setActivityForm(null);
                    props.setUserData({ ...props.userData, country: sendData.country });
                    props.setRefresh((prev => !prev));
                    props.updateFormData('notes', '');
                }
            });
    }

    return (
        <fieldset>
            <Link to="" className="Link" onClick={() => props.setActivityForm(null)}>{home[props.lang].back}</Link><br/><br/>
            <legend>{home[props.lang].borderCross}</legend>
            <form onSubmit={sendBorderCross}>
                <div><DateTimeInput
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
                    lastOdometer={props.lastOdometer}
                />
                </div>
                <br/>
                <div>
                    <BorderInput
                        country={props.userData.country}
                        lang={props.lang}
                        countryValue={props.formData.country}
                        countryOnChange={e => props.updateFormData('country', e)}
                        placeValue={props.formData.place}
                        placeOnChange={e => props.updateFormData('place', e)}
                        addNewBorderChange={e => props.updateFormData('addNewBorder', e)}
                    />
                </div>
                <br/>
                <div><TextArea label={places[props.lang].description} value={props.formData.notes}
                               onChange={e => props.updateFormData('notes', e.target.value)}/></div>
                <br/>
                {loading ?
                    <CircularProgress/> :
                    <SubmitButton text={home[props.lang].borderCross}/>
                }
            </form>
            <br/>
            <Link to="" className="Link" onClick={() => props.setActivityForm(null)}>{home[props.lang].back}</Link>
        </fieldset>
    );
}