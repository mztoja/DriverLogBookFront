import React, {FormEvent, useEffect, useState} from "react";
import {ActionsPropsTypes} from "../../../types/ActionsPropsTypes";
import {Link} from "react-router-dom";
import {home} from "../../../assets/txt/home";
import {DateTimeInput} from "../../common/form/DateTimeInput";
import {FuelInput} from "../../common/form/FuelInput";
import {OdometerInput} from "../../common/form/OdometerInput";
import {PlaceInput} from "../../common/form/PlaceInput";
import {TextArea} from "../../common/form/TextArea";
import {places} from "../../../assets/txt/places";
import {CircularProgress, FormHelperText} from "@mui/material";
import {SubmitButton} from "../../common/form/SubmitButton";
import {useApi} from "../../../hooks/useApi";
import {useAlert} from "../../../hooks/useAlert";
import {apiPaths} from "../../../config/api";
import {LoadInterface, LogInterface, StopTourData} from "types";
import {WindowConfirm} from "../../common/WindowConfirm";

export const TourStop = (props: ActionsPropsTypes) => {

    const [burnedFuel, setBurnedFuel] = useState<number>(-999);
    const [addedFuel, setAddedFuel] = useState<number>(-999);
    const [startOdometer, setStartOdometer] = useState<number>(-999);
    const [confirm, setConfirm] = useState<boolean>(false);
    const [text, setText] = useState<string>('');

    const {loading, fetchData} = useApi();
    const {setAlert} = useAlert();

    useEffect(() => {
        (async () => {
            if (props.tourData) {
                fetchData<LogInterface>(`${apiPaths.getLogById}/${props.tourData.startLogId}`).then((res) => {
                    if (res.responseData) {
                        setStartOdometer(res.responseData.odometer);
                    }
                });
                setBurnedFuel(Number(props.tourData.burnedFuelComp));
                setAddedFuel(Number(props.tourData.totalRefuel));
                props.updateFormData('fuelQuantity', ((Number(props.tourData.fuelStateBefore) + Number(props.tourData.totalRefuel)) - Number(props.tourData.burnedFuelComp)).toFixed(0));
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const sendTourStop = (e: FormEvent) => {
        e.preventDefault();
        fetchData<LoadInterface[]>(apiPaths.getNotUnloadedLoads).then((res) => {
            if (res.responseData) {
                const loads = res.responseData;
                if (loads.length > 0) {
                    setText(home[props.lang].finishTourUnloadedLoadsConfirm(loads.length));
                    setConfirm(true);
                } else {
                    confirmSend();
                }
            }
        });

    }

    const confirmSend = () => {
        const sendData: StopTourData = {
            action: home[props.lang].finishedTourAction,
            country: props.formData.country,
            place: props.formData.place,
            placeId: props.formData.placeId,
            odometer: props.formData.odometer,
            notes: props.formData.notes,
            date: props.formData.date,
            fuelStateAfter: props.formData.fuelQuantity,
            unloadNote: home[props.lang].finishTourUnloadNote,
            unloadAction: home[props.lang].unloadingAction,
        }
        fetchData(apiPaths.finishRoute, {method: 'POST', sendData}, {setAlert, lang: props.lang})
            .then((res) => {
                if (res.success) {
                    setAlert(home[props.lang].finishedTour, 'success');
                    props.setActivityForm(null);
                    props.setTourData(null);
                    props.setRefresh((prev => !prev));
                    props.updateFormData('notes', '');
                }
            });
    }

    return (
        <>
            <fieldset>
                <Link to="" className="Link"
                      onClick={() => props.setActivityForm(null)}>{home[props.lang].back}</Link><br/><br/>
                <legend>{home[props.lang].tourStop}</legend>
                <form onSubmit={sendTourStop}>
                    <div><DateTimeInput
                        lang={props.lang}
                        value={props.formData.date}
                        onChange={e => props.updateFormData('date', e)}
                    />
                    </div>
                    <br/>
                    <div><FuelInput
                        lang={props.lang}
                        value={props.formData.fuelQuantity}
                        onChange={e => props.updateFormData('fuelQuantity', e)}
                        type='quantity'
                        userFuelConType={props.userData.fuelConType}
                    />
                        <FormHelperText className="TextInput__Label">
                            {burnedFuel === -999
                                ? <center><CircularProgress/></center>
                                : home[props.lang].tourStopHelper1
                            }
                        </FormHelperText>
                    </div>
                    <br/>
                    <div><OdometerInput
                        lang={props.lang}
                        value={props.formData.odometer}
                        onChange={e => props.updateFormData('odometer', e)}
                        lastOdometer={props.lastOdometer}
                    />
                        <FormHelperText className="TextInput__Label">
                            {startOdometer !== -999 && home[props.lang].tourStopHelper2(Number(props.formData.odometer) - startOdometer, Number(props.tourData?.fuelStateBefore) - Number(props.formData.fuelQuantity) + addedFuel)}
                        </FormHelperText>
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
                        <SubmitButton text={home[props.lang].tourStop}/>
                    }
                </form>
                <br/>
                <Link to="" className="Link" onClick={() => props.setActivityForm(null)}>{home[props.lang].back}</Link>
            </fieldset>
            <WindowConfirm lang={props.lang} text={text} show={confirm} setShow={setConfirm} execute={confirmSend}/>
        </>
    );
}
