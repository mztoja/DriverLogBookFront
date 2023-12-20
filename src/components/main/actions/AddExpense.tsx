import {ActionsPropsTypes} from "../../../types/ActionsPropsTypes";
import {AddExpenseData} from "types";
import {useApi} from "../../../hooks/useApi";
import {useAlert} from "../../../hooks/useAlert";
import React, {FormEvent} from "react";
import {apiPaths} from "../../../config/api";
import {handleApiResult} from "../../../utils/handleApiResult";
import {home} from "../../../assets/txt/home";
import {CircularProgress} from "@mui/material";
import {Link} from "react-router-dom";
import {DateInput} from "../../common/form/DateInput";
import {OdometerInput} from "../../common/form/OdometerInput";
import {PlaceInput} from "../../common/form/PlaceInput";
import {ActionInput} from "../../common/form/ActionInput";
import {TextArea} from "../../common/form/TextArea";
import {places} from "../../../assets/txt/places";
import {SubmitButton} from "../../common/form/SubmitButton";
import {PaymentSelect} from "../../common/form/finance/PaymentSelect";

export const AddExpense = (props:ActionsPropsTypes) => {

    const {loading, fetchData} = useApi();
    const {setAlert} = useAlert();

    const sendAnotherLog = async (e: FormEvent) => {
        e.preventDefault();
        const sendData: AddExpenseData = {
            date: props.formData.date,
            country: props.formData.country,
            place: props.formData.place,
            placeId: props.formData.placeId,
            odometer: props.formData.odometer,
            notes: props.formData.notes,
            action: props.formData.action,
            payment: props.formData.payment,
        }
        // const result = await fetchData(apiPaths., {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify(sendData),
        //     credentials: "include",
        // });
        // handleApiResult(result, props.lang, setAlert, () => {
        //     setAlert(home[props.lang]., 'success');
        //     props.setActivityForm(null);
        // });
    }

    return (
        <fieldset>
            <Link to="" className="Link" onClick={() => props.setActivityForm(null)}>{home[props.lang].back}</Link><br/><br/>
            <legend>{home[props.lang].addExpense}</legend>
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
                    <PaymentSelect lang={props.lang} value={props.formData.payment} onChange={e => props.updateFormData('payment', e)}/>
                </div>
                <br/>
                <div><TextArea label={places[props.lang].description} value={props.formData.notes}
                               onChange={e => props.updateFormData('notes', e.target.value)}/></div>
                <br/>
                {loading ?
                    <CircularProgress/> :
                    <SubmitButton text={home[props.lang].addExpense}/>
                }
            </form>
            <br/>
            <Link to="" className="Link" onClick={() => props.setActivityForm(null)}>{home[props.lang].back}</Link>
        </fieldset>
    );
}