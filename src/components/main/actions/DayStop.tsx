import React, {FormEvent} from "react";
import {ActionsPropsTypes} from "../../../types/ActionsPropsTypes";
import {useApi} from "../../../hooks/useApi";
import {useAlert} from "../../../hooks/useAlert";
import {CircularProgress} from "@mui/material";
import {home} from "../../../assets/txt/home";
import {DateTimeInput} from "../../common/form/DateTimeInput";
import {OdometerInput} from "../../common/form/OdometerInput";
import {PlaceInput} from "../../common/form/PlaceInput";
import {OnOffSwitch} from "../../common/form/OnOffSwitch";
import {TextArea} from "../../common/form/TextArea";
import {places} from "../../../assets/txt/places";
import {SubmitButton} from "../../common/form/SubmitButton";
import {Link} from "react-router-dom";
import {dayCardStateEnum, StopDayData} from "types";
import {DriveTimeInput} from "../../common/form/DriveTimeInput";
import {FuelInput} from "../../common/form/FuelInput";
import {apiPaths} from "../../../config/api";

export const DayStop = (props: ActionsPropsTypes) => {
    const {loading, fetchData} = useApi();
    const {setAlert} = useAlert();

    const sendDayStop = async (e: FormEvent) => {
        e.preventDefault();
        const sendData: StopDayData = {
            cardTakeOut: props.formData.cardTakeOut,
            country: props.formData.country,
            place: props.formData.place,
            placeId: props.formData.placeId,
            odometer: props.formData.odometer,
            notes: props.formData.notes,
            date: props.formData.date,
            fuelCombustion: props.formData.fuelCombustion,
            driveTime: props.formData.driveTime,
            driveTime2: props.formData.driveTime2,
            action: home[props.lang].finishedDayAction + ' ' + (props.formData.cardTakeOut === 'true' ? home[props.lang].startedDayActionCardTakeOut : ''),
        }
        fetchData(apiPaths.finishDay, {method: 'POST', sendData}, {setAlert, lang: props.lang})
            .then((res) => {
                if (res.success) {
                    setAlert(home[props.lang].finishedDay, 'success');
                    props.setActivityForm(null);
                    props.setDayData(null);
                    props.setRefresh((prev => !prev));
                    props.updateFormData('notes', '');
                }
            });
    }

    return (
        <fieldset>
            <Link to="" className="Link" onClick={() => props.setActivityForm(null)}>{home[props.lang].back}</Link><br/><br/>
            <legend>{home[props.lang].dayStop}</legend>
            <form onSubmit={sendDayStop}>
                <div><OdometerInput
                    lang={props.lang}
                    value={props.formData.odometer}
                    onChange={e => props.updateFormData('odometer', e)}
                    lastOdometer={props.lastOdometer}
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
                    <DriveTimeInput lang={props.lang} value={props.formData.driveTime}
                                    onChange={e => props.updateFormData('driveTime', e)}/>
                </div>
                <br/>
                {props.dayData?.doubleCrew ?
                    <>
                        <div><DriveTimeInput lang={props.lang} value={props.formData.driveTime2}
                                             onChange={e => props.updateFormData('driveTime2', e)}
                                             secDriver={true}/></div>
                        <br/>
                    </>
                    :
                    ''}
                <div><FuelInput
                    lang={props.lang}
                    value={props.formData.fuelCombustion}
                    onChange={e => props.updateFormData('fuelCombustion', e)}
                    type='combustion'
                    userFuelConType={props.userData.fuelConType}
                />
                </div>
                <br/>
                {props.dayData?.cardState === dayCardStateEnum.inserted
                    ?
                    <>
                        <div><OnOffSwitch label={home[props.lang].cardTakeOut} value={props.formData.cardTakeOut}
                                          onChange={e => props.updateFormData('cardTakeOut', e)}/></div>
                        <br/>
                    </>
                    :
                    ''}
                <div><TextArea label={places[props.lang].description} value={props.formData.notes}
                               onChange={e => props.updateFormData('notes', e.target.value)}/></div>
                <br/>
                <div><DateTimeInput
                    lang={props.lang}
                    value={props.formData.date}
                    onChange={e => props.updateFormData('date', e)}
                />
                </div>
                <br/>
                {loading ?
                    <CircularProgress/> :
                    <SubmitButton text={home[props.lang].dayStop}/>
                }
            </form>
            <br/>
            <Link to="" className="Link" onClick={() => props.setActivityForm(null)}>{home[props.lang].back}</Link>
        </fieldset>
    );
}