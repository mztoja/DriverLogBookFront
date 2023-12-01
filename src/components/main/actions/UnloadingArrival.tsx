import React, {FormEvent, useEffect} from "react";
import {ActionsPropsTypes} from "../../../types/ActionsPropsTypes";
import {Link} from "react-router-dom";
import {home} from "../../../assets/txt/home";
import {DateInput} from "../../common/form/DateInput";
import {OdometerInput} from "../../common/form/OdometerInput";
import {TextArea} from "../../common/form/TextArea";
import {places} from "../../../assets/txt/places";
import {SubmitButton} from "../../common/form/SubmitButton";
import {LoadSelect} from "../../common/form/load/LoadSelect";
import {PlaceInput} from "../../common/form/PlaceInput";
import {AddLogData} from "types";
import {apiPaths} from "../../../config/api";
import {useApi} from "../../../hooks/useApi";
import {CircularProgress} from "@mui/material";
import {commons} from "../../../assets/txt/commons";
import {useAlert} from "../../../hooks/useAlert";
import {login} from "../../../assets/txt/login";

export const UnloadingArrival = (props: ActionsPropsTypes) => {

    const {loading, fetchData} = useApi();
    const {setAlert} = useAlert();

    const getLoadDetails = async (e: number) => {
        const result = await fetchData(apiPaths.getUnloadingPlace + '/' + e, {
            headers: {'Content-Type': 'application/json'},
            credentials: "include",
        });
        if ((result && result.data) && (!result.data.dtc)) {
            const place = result.data;
            props.updateFormData('country', place.country);
            props.updateFormData('placeId', place.id);
            props.updateFormData('place', '');
        }
    }

    useEffect(() => {
        if (Number(props.formData.loadId) > 0) {
            getLoadDetails(Number(props.formData.loadId));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const send = async (e: FormEvent) => {
        e.preventDefault();
        if (Number(props.formData.loadId) > 0) {
            let loadNr = '?';
            const result2 = await fetchData(apiPaths.getLoadDetails + '/' + props.formData.loadId, {
                headers: {'Content-Type': 'application/json'},
                credentials: "include",
            });
            console.log(result2);
            if ((result2 && result2.data) && (!result2.data.dtc)) {
                loadNr = result2.data.loadNr.toString();
            }
            const sendData: AddLogData = {
                date: props.formData.date,
                country: props.formData.country,
                place: props.formData.place,
                placeId: props.formData.placeId,
                odometer: props.formData.odometer,
                notes: props.formData.notes,
                action: home[props.lang].unloadingArrivalAction(loadNr),
            }
            const result = await fetchData(apiPaths.unloadingArrival, {
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
                        setAlert(home[props.lang].unloadingArrivalSuccess, 'success');
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
                    }
                }
            }
        } else {
            setAlert(home[props.lang].noLoadChosen, 'warning');
        }
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
                    onChange={e => {
                        props.updateFormData('loadId', e);
                        getLoadDetails(Number(e));
                    }}
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
                <SubmitButton text={home[props.lang].unloadingArrival}/>
            </form>
            <br/>
            <Link to="" className="Link" onClick={() => props.setActivityForm(null)}>{home[props.lang].back}</Link>
        </fieldset>
    );
}