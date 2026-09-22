import React, {FormEvent} from "react";
import {ActionsPropsTypes} from "../../../types/ActionsPropsTypes";
import {useApi} from "../../../hooks/useApi";
import {useAlert} from "../../../hooks/useAlert";
import {CircularProgress} from "@mui/material";
import {home} from "../../../assets/txt/home";
import {DateTimeInput} from "../../common/form/DateTimeInput";
import {OdometerInput} from "../../common/form/OdometerInput";
import {PlaceInput} from "../../common/form/PlaceInput";
import {TextArea} from "../../common/form/TextArea";
import {places} from "../../../assets/txt/places";
import {SubmitButton} from "../../common/form/SubmitButton";
import {Link} from "react-router-dom";
import {AddBreakData, DayInterface} from "types";
import {apiPaths} from "../../../config/api";
import {OnOffSwitch} from "../../common/form/OnOffSwitch";
import {DriveTimeInput} from "../../common/form/DriveTimeInput";

export const AddBreak = (props: ActionsPropsTypes) => {

    const {loading, fetchData} = useApi();
    const {setAlert} = useAlert();
    const doubleCrew = !!props.dayData?.doubleCrew;
    const formTitle = doubleCrew ? home[props.lang].driverChange : home[props.lang].addBreak;

    const sendAddBreak = async (e: FormEvent) => {
        e.preventDefault();

        let action: string;
        let slot: number;
        let scenario: AddBreakData['scenario'];
        if (!doubleCrew) {
            action = home[props.lang].addBreakAction(props.formData.breakTaken);
            slot = 1;
            scenario = 'break';
        } else if (props.formData.breakOnlyBreak === 'true') {
            action = home[props.lang].addBreakAction(props.formData.breakTaken);
            slot = props.formData.breakMyCardInSlot1 === 'true' ? 1 : 2;
            scenario = 'break';
        } else if (props.formData.breakChangeToSlot1 === 'true') {
            action = home[props.lang].changeSlot1Action;
            slot = 2;
            scenario = 'changeSlot1';
        } else {
            action = home[props.lang].changeSlot2Action;
            slot = 1;
            scenario = 'changeSlot2';
        }

        const sendData: AddBreakData = {
            date: props.formData.date,
            country: props.formData.country,
            place: props.formData.place,
            placeId: props.formData.placeId,
            odometer: props.formData.odometer,
            notes: props.formData.notes,
            action,
            driveTime: props.formData.breakDriveTime,
            slot,
            scenario,
        }
        fetchData<DayInterface>(apiPaths.addBreak, {method: 'POST', sendData}, {setAlert, lang: props.lang})
            .then((res) => {
                if (res.success) {
                    setAlert(home[props.lang].addBreakSuccess, 'success');
                    props.setActivityForm(null);
                    if (res.responseData) {
                        props.setDayData(res.responseData);
                    }
                    props.setRefresh((prev => !prev));
                    props.updateFormData('notes', '');
                    props.updateFormData('breakTaken', '');
                    props.updateFormData('breakDriveTime', '');
                }
            });
    }

    return (
        <fieldset>
            <Link to="" className="Link" onClick={() => props.setActivityForm(null)}>{home[props.lang].back}</Link><br/><br/>
            <legend>{formTitle}</legend>
            <form onSubmit={sendAddBreak}>
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
                {(!doubleCrew || props.formData.breakOnlyBreak === 'true') &&
                <>
                <div><DriveTimeInput
                    lang={props.lang}
                    value={props.formData.breakTaken}
                    onChange={e => props.updateFormData('breakTaken', e)}
                    label={home[props.lang].breakTakenLabel}
                    helperText=''
                />
                </div>
                <br/>
                </>
                }
                <div><DriveTimeInput
                    lang={props.lang}
                    value={props.formData.breakDriveTime}
                    onChange={e => props.updateFormData('breakDriveTime', e)}
                    label={home[props.lang].breakDriveTimeLabel}
                    helperText={home[props.lang].breakDriveTimeHelper}
                />
                </div>
                <br/>
                {doubleCrew &&
                    <>
                            <div><OnOffSwitch
                            label={home[props.lang].breakOnlyBreakSwitch}
                            value={props.formData.breakOnlyBreak}
                            onChange={e => props.updateFormData('breakOnlyBreak', e)}
                        /></div>
                        <br/>
                        {props.formData.breakOnlyBreak === 'true' ?
                            <>
                                <div><OnOffSwitch
                                    label={home[props.lang].myCardInSlot1}
                                    value={props.formData.breakMyCardInSlot1}
                                    onChange={e => props.updateFormData('breakMyCardInSlot1', e)}
                                /></div>
                                <br/>
                            </>
                            :
                            <>
                                <div><OnOffSwitch
                                    label={props.formData.breakChangeToSlot1 === 'true' ? home[props.lang].changeToSlot1 : home[props.lang].changeToSlot2}
                                    value={props.formData.breakChangeToSlot1}
                                    onChange={e => props.updateFormData('breakChangeToSlot1', e)}
                                /></div>
                                <br/>
                            </>
                        }
                    </>
                }
                <div><TextArea label={places[props.lang].description} value={props.formData.notes}
                               onChange={e => props.updateFormData('notes', e.target.value)}/></div>
                <br/>
                {loading ?
                    <CircularProgress/> :
                    <SubmitButton text={formTitle}/>
                }
            </form>
            <br/>
            <Link to="" className="Link" onClick={() => props.setActivityForm(null)}>{home[props.lang].back}</Link>
        </fieldset>
    );
}
