import React, {FormEvent, useEffect, useRef, useState} from "react";
import {ActionsPropsTypes} from "../../../types/ActionsPropsTypes";
import {Link} from "react-router-dom";
import {home} from "../../../assets/txt/home";
import {DateTimeInput} from "../../common/form/DateTimeInput";
import {OdometerInput} from "../../common/form/OdometerInput";
import {PlaceInput} from "../../common/form/PlaceInput";
import {TextArea} from "../../common/form/TextArea";
import {places} from "../../../assets/txt/places";
import {SubmitButton} from "../../common/form/SubmitButton";
import {OnOffSwitch} from "../../common/form/OnOffSwitch";
import {LoadOnVehicleSelect} from "../../common/form/load/LoadOnVehicleSelect";
import {LoadDescriptionInput} from "../../common/form/load/LoadDescriptionInput";
import {LoadReferenceInput} from "../../common/form/load/LoadReferenceInput";
import {LoadWeightInput} from "../../common/form/load/LoadWeightInput";
import {LoadQuantityInput} from "../../common/form/load/LoadQuantityInput";
import {AddLoadingData} from "types";
import {apiPaths} from "../../../config/api";
import {useApi} from "../../../hooks/useApi";
import {useAlert} from "../../../hooks/useAlert";
import {CircularProgress} from "@mui/material";

export const LoadingCompleted = (props: ActionsPropsTypes) => {

    const [switchValue, setSwitchValue] = useState<'false' | 'true'>('true');
    const [senderCountry, setSenderCountry] = useState<string>('');
    const [senderId, setSenderId] = useState<string>(props.userData.markedArrive !== 0 ? props.userData.markedArrive.toString() : props.formData.senderId);
    const firstRender = useRef<boolean>(true);

    const {loading, fetchData} = useApi();
    const {setAlert} = useAlert();

    if (firstRender.current) {
        props.updateFormData('senderId', senderId);
        if (switchValue === 'true') {
            props.updateFormData('country', senderCountry);
            props.updateFormData('placeId', senderId);
        }
            firstRender.current = false;
    }

    useEffect(() => {
        props.updateFormData('senderId', senderId);
        if (switchValue === 'true') {
            props.updateFormData('country', senderCountry);
            props.updateFormData('placeId', senderId);
        }
        // eslint-disable-next-line
    }, [switchValue, senderId, senderCountry]);

    const send = async (e: FormEvent) => {
        e.preventDefault();
        const sendData: AddLoadingData = {
            date: props.formData.date,
            country: props.formData.country,
            place: props.formData.place,
            placeId: props.formData.placeId,
            odometer: props.formData.odometer,
            notes: props.formData.notes,
            action: home[props.lang].loadingAction,
            vehicle: props.formData.vehicle,
            senderId: props.formData.senderId,
            receiverId: props.formData.receiverId,
            weight: props.formData.weight,
            quantity: props.formData.quantity,
            reference: props.formData.reference,
            description: props.formData.description,
        }
        fetchData(apiPaths.createLoad, {method: 'POST', sendData}, {setAlert, lang: props.lang})
            .then((res) => {
                if (res.success) {
                    setAlert(home[props.lang].loadingSuccess, 'success');
                    props.setActivityForm(null);
                    props.setUserData({...props.userData, markedArrive: 0});
                    props.setRefresh((prev => !prev));
                }
            });
    }

    return (
        <fieldset>
            <Link to="" className="Link" onClick={() => props.setActivityForm(null)}>{home[props.lang].back}</Link><br/><br/>
            <legend>{home[props.lang].loading}</legend>
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
                    lastOdometer={props.lastOdometer}
                />
                </div>
                <br/>
                <fieldset className="maxWidth">
                    <legend>{home[props.lang].loadingSender}</legend>
                    <div><PlaceInput
                        lang={props.lang}
                        defaultCountry={props.userData.country}
                        countryValue={senderCountry}
                        countryOnChange={(e) => setSenderCountry(e)}
                        placeValue=''
                        placeOnChange={() => ''}
                        placeIdValue={senderId}
                        placeIdOnChange={e => setSenderId(e)}
                        disablePlaceText
                    />
                    </div>
                    <br/>
                    <div>
                        <OnOffSwitch
                            label={home[props.lang].loadingSenderSwitchLabel}
                            value={switchValue}
                            onChange={e => setSwitchValue(e)}
                        />
                    </div>
                </fieldset>
                {switchValue === 'false' &&
                    <fieldset className="maxWidth">
                        <legend>{home[props.lang].loadingPlace}</legend>
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
                    </fieldset>
                }
                <fieldset className="maxWidth">
                    <legend>{home[props.lang].loadingReceiver}</legend>
                    <div><PlaceInput
                        lang={props.lang}
                        defaultCountry={props.userData.country}
                        countryValue=''
                        countryOnChange={() => ''}
                        placeValue=''
                        placeOnChange={() => ''}
                        placeIdValue={props.formData.receiverId}
                        placeIdOnChange={e => props.updateFormData('receiverId', e)}
                        disablePlaceText
                    />
                    </div>
                </fieldset>
                <br/><br/>
                <div>
                    {props.tourData &&
                        <LoadOnVehicleSelect
                        lang={props.lang}
                        onChange={e => props.updateFormData('vehicle', e)}
                        truck={props.tourData.truck}
                        trailer={props.tourData.trailer}
                        value={props.formData.vehicle}
                        />
                    }

                </div>
                <br/>
                <div>
                    <LoadReferenceInput lang={props.lang} value={props.formData.reference} onChange={e => props.updateFormData('reference', e.target.value)}/>
                </div>
                <br/>
                <div>
                    <LoadDescriptionInput lang={props.lang} value={props.formData.description} onChange={e => props.updateFormData('description', e.target.value)}/>
                </div>
                <br/>
                <div><LoadWeightInput
                    lang={props.lang}
                    value={props.formData.weight}
                    onChange={e => props.updateFormData('weight', e)}
                />
                </div>
                <br/>
                <div><LoadQuantityInput
                    lang={props.lang}
                    value={props.formData.quantity}
                    onChange={e => props.updateFormData('quantity', e.target.value)}
                />
                </div>
                <br/>
                <div><TextArea label={places[props.lang].description} value={props.formData.notes}
                               onChange={e => props.updateFormData('notes', e.target.value)}/></div>
                <br/>
                {loading ?
                    <CircularProgress/> :
                    <SubmitButton text={home[props.lang].loading}/>
                }
            </form>
            <br/>
            <Link to="" className="Link" onClick={() => props.setActivityForm(null)}>{home[props.lang].back}</Link>
        </fieldset>
    );
}