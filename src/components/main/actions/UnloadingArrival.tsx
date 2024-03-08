import React, {FormEvent, useEffect} from "react";
import {ActionsPropsTypes} from "../../../types/ActionsPropsTypes";
import {Link} from "react-router-dom";
import {home} from "../../../assets/txt/home";
import {DateTimeInput} from "../../common/form/DateTimeInput";
import {OdometerInput} from "../../common/form/OdometerInput";
import {TextArea} from "../../common/form/TextArea";
import {places} from "../../../assets/txt/places";
import {SubmitButton} from "../../common/form/SubmitButton";
import {LoadSelect} from "../../common/form/load/LoadSelect";
import {PlaceInput} from "../../common/form/PlaceInput";
import {AddLogData, PlaceInterface} from "types";
import {apiPaths} from "../../../config/api";
import {useApi} from "../../../hooks/useApi";
import {CircularProgress} from "@mui/material";
import {useAlert} from "../../../hooks/useAlert";

export const UnloadingArrival = (props: ActionsPropsTypes) => {

    const {loading, fetchData} = useApi();
    const {setAlert} = useAlert();

    // const getLoadDetails = async (e: number) => {
    //     const result = await fetchDataOld(apiPaths.getUnloadingPlace + '/' + e, 'GET');
    //     if ((result && result.responseData) && (!result.responseData.dtc)) {
    //         const place = result.responseData;
    //         props.updateFormData('country', place.country);
    //         props.updateFormData('placeId', place.id);
    //         props.updateFormData('place', '');
    //     }
    // }

    const getLoadDetails = (e: number): void => {
        fetchData<PlaceInterface>(`${apiPaths.getUnloadingPlace}/${e}`).then((res) => {
            const place = res.responseData;
            if (place) {
                props.updateFormData('country', place.country);
                props.updateFormData('placeId', place.id.toString());
                props.updateFormData('place', '');
            }
        });
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
            const sendData: AddLogData = {
                date: props.formData.date,
                country: props.formData.country,
                place: props.formData.place,
                placeId: props.formData.placeId,
                odometer: props.formData.odometer,
                notes: props.formData.notes,
                action: home[props.lang].unloadingArrivalAction,
            }
            fetchData(apiPaths.unloadingArrival, {method: 'POST', sendData}, {setAlert, lang: props.lang})
                .then((res) => {
                    if (res.success) {
                        setAlert(home[props.lang].unloadingArrivalSuccess, 'success');
                        props.setActivityForm(null);
                        props.setRefresh((prev => !prev));
                    }
                });
        } else {
            setAlert(home[props.lang].noLoadChosen, 'warning');
        }
    }

    return (
        <fieldset>
            <Link to="" className="Link" onClick={() => props.setActivityForm(null)}>{home[props.lang].back}</Link><br/><br/>
            <legend>{home[props.lang].unloadingArrival}</legend>
            <form onSubmit={send}>
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
                {loading ?
                    <CircularProgress/> :
                    <SubmitButton text={home[props.lang].unloadingArrival}/>
                }
            </form>
            <br/>
            <Link to="" className="Link" onClick={() => props.setActivityForm(null)}>{home[props.lang].back}</Link>
        </fieldset>
    );
}