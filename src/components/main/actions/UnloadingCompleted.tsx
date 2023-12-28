import React, {FormEvent, useEffect, useState} from "react";
import {ActionsPropsTypes} from "../../../types/ActionsPropsTypes";
import {Link} from "react-router-dom";
import {home} from "../../../assets/txt/home";
import {DateTimeInput} from "../../common/form/DateTimeInput";
import {OdometerInput} from "../../common/form/OdometerInput";
import {TextArea} from "../../common/form/TextArea";
import {places} from "../../../assets/txt/places";
import {SubmitButton} from "../../common/form/SubmitButton";
import {LoadSelect} from "../../common/form/load/LoadSelect";
import {OnOffSwitch} from "../../common/form/OnOffSwitch";
import {PlaceInput} from "../../common/form/PlaceInput";
import {LoadInterface, UnloadingData } from "types";
import {apiPaths} from "../../../config/api";
import {useApi} from "../../../hooks/useApi";
import {CircularProgress} from "@mui/material";
import {useAlert} from "../../../hooks/useAlert";
import {handleApiResult} from "../../../utils/handleApiResult";

export const UnloadingCompleted = (props: ActionsPropsTypes) => {

    const {loading, fetchData} = useApi();
    const {setAlert} = useAlert();
    const [switchValue, setSwitchValue] = useState<'false' | 'true'>('true');
    const [receiverKnown, setReceiverKnown] = useState<boolean>(false);

    const getLoadDetails = async (e: number): Promise<void> => {
        const result = await fetchData(apiPaths.getLoadDetails + '/' + e, {
            headers: {'Content-Type': 'application/json'},
            credentials: "include",
        });
        if ((result && result.data) && (!result.data.dtc)) {
            const loadDetails: LoadInterface = result.data;
            if (loadDetails.receiverId === 0) {
                setSwitchValue('false');
                setReceiverKnown(false);
            } else {
                setSwitchValue('true');
                setReceiverKnown(true);
            }
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
        const sendData: UnloadingData = {
            date: props.formData.date,
            country: switchValue === 'true' ? props.userData.country : props.formData.country,
            place: props.formData.place,
            placeId: props.formData.placeId,
            odometer: props.formData.odometer,
            notes: props.formData.notes,
            action: home[props.lang].unloadingAction,
            loadId: props.formData.loadId,
            isPlaceAsReceiver: switchValue,
        }
        const result = await fetchData(apiPaths.unloadingLoad, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(sendData),
            credentials: "include",
        });
        handleApiResult(result, props.lang, setAlert, () => {
            props.setActivityForm(null);
            setAlert(home[props.lang].unloadingSuccess, 'success');
        });
    }

    return (
        <fieldset>
            <Link to="" className="Link" onClick={() => props.setActivityForm(null)}>{home[props.lang].back}</Link><br/><br/>
            <legend>{home[props.lang].unloading}</legend>
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
                <div>
                    <OnOffSwitch
                        label={home[props.lang].unloadingLoadSelectLabel}
                        value={switchValue}
                        onChange={e => setSwitchValue(e)}
                        disabled={!receiverKnown}
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
                {loading ?
                    <CircularProgress/> :
                    <SubmitButton text={home[props.lang].unloading}/>
                }
            </form>
            <br/>
            <Link to="" className="Link" onClick={() => props.setActivityForm(null)}>{home[props.lang].back}</Link>
        </fieldset>
    );
}