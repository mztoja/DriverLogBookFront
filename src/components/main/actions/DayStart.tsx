import React, {FormEvent, useEffect, useState} from "react";
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
import {apiPaths} from "../../../config/api";
import {commons} from "../../../assets/txt/commons";
import {login} from "../../../assets/txt/login";
import {OnOffSwitch} from "../../common/form/OnOffSwitch";
import {dayCardStateEnum, DayInterface, StartDayData} from "types";

export const DayStart = (props: ActionsPropsTypes) => {

    const {loading, fetchData} = useApi();
    const {setAlert} = useAlert();
    const [lastDay, setLastDay] = useState<DayInterface | null>(null);

    useEffect(() => {
        (async () => {
            const result = await fetchData(apiPaths.getLastDay, {
                headers: {'Content-Type': 'application/json'},
                credentials: "include",
            });
            if ((result && result.data) && (!result.data.dtc)) {
                setLastDay(result.data);
                if (result.data.cardState === dayCardStateEnum.inserted) {
                    props.updateFormData('cardInserted', 'true');
                }
            }
        })();
        // eslint-disable-next-line
    }, []);

    const sendDayStart = async (e: FormEvent) => {
        e.preventDefault();
        const sendData: StartDayData = {
            date: props.formData.date,
            country: props.formData.country,
            place: props.formData.place,
            placeId: props.formData.placeId,
            odometer: props.formData.odometer,
            notes: props.formData.notes,
            cardInserted: props.formData.cardInserted,
            doubleCrew: props.formData.doubleCrew,
            action: home[props.lang].startedDayAction + ' ' + (props.formData.cardInserted === 'true' ? home[props.lang].startedDayActionCardInsert : ''),
        }
        const result = await fetchData(apiPaths.createNewDay, {
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
                    setAlert(home[props.lang].startedDay, 'success');
                    props.setActivityForm(null);
                    props.setDayData(result.data);
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
                    if (result.data.dtc === 'activeDay') {
                        setAlert(home[props.lang].dayExist, 'info');
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
            <legend>{home[props.lang].dayStart}</legend>
            <form onSubmit={sendDayStart}>
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
                <div><OnOffSwitch label={home[props.lang].doubleCrew} value={props.formData.doubleCrew}
                                  onChange={e => props.updateFormData('doubleCrew', e)}/></div>
                <br/>
                {lastDay === null || lastDay.cardState !== dayCardStateEnum.inserted ?
                    <><div><OnOffSwitch label={home[props.lang].cardInserted} value={props.formData.cardInserted}
                                      onChange={e => props.updateFormData('cardInserted', e)}
                    /></div><br/></> : ''}
                <div><TextArea label={places[props.lang].description} value={props.formData.notes}
                               onChange={e => props.updateFormData('notes', e.target.value)}/></div>
                <br/>
                <SubmitButton text={home[props.lang].dayStart}/>
            </form>
            <br/>
            <Link to="" className="Link" onClick={() => props.setActivityForm(null)}>{home[props.lang].back}</Link>
        </fieldset>
    );
}