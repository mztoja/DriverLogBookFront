import React, {Dispatch, FormEvent, SetStateAction, useEffect, useState} from "react";
import {
    DayInterface,
    userLangEnum,
    DayEditData,
    dayCardStateEnum,
    LogEditData,
    dayStatusEnum,
    userFuelContypeEnum
} from "types";
import {Modal, ModalContent, StyledBackdrop} from "../common/Modal";
import {days} from "../../assets/txt/days";
import {DateTimeInput} from "../common/form/DateTimeInput";
import {OdometerInput} from "../common/form/OdometerInput";
import {PlaceInput} from "../common/form/PlaceInput";
import {ActionInput} from "../common/form/ActionInput";
import {TextArea} from "../common/form/TextArea";
import {places} from "../../assets/txt/places";
import {DriveTimeInput} from "../common/form/DriveTimeInput";
import {DistanceInput} from "../common/form/DistanceInput";
import {OnOffSwitch} from "../common/form/OnOffSwitch";
import {home} from "../../assets/txt/home";
import {DayCardStateSelect} from "../common/form/day/DayCardStateSelect";
import {LongTimeInput} from "../common/form/day/LongTimeInput";
import {FuelInput} from "../common/form/FuelInput";
import {CircularProgress} from "@mui/material";
import {SubmitButton} from "../common/form/SubmitButton";
import {useAlert} from "../../hooks/useAlert";
import {useApi} from "../../hooks/useApi";
import {defaultValues} from "./defaultValues";
import {areFieldsEqual} from "./areFieldsEqual";
import {subtractDatesToTime} from "../../utils/subtractDatesToTime";
import {apiPaths} from "../../config/api";

interface Props {
    day: DayInterface | null;
    setDay: Dispatch<SetStateAction<DayInterface | null>>;
    lang: userLangEnum;
    setRefresh: Dispatch<SetStateAction<boolean>>;
}

export const DaysEdit = (props: Props) => {


    const {setAlert} = useAlert();
    const {loading, fetchData} = useApi();
    const [formData, setFormData] = useState<DayEditData>(defaultValues(props.day));
    const [combustionValue, setCombustionValue] = useState<string>((Number(formData.fuelBurned) / Number(formData.distance) * 100).toFixed(1));
    const [breakStopDate, setBreakStopDate] = useState<string>('');

    const updateForm = (key: keyof DayEditData, subKey: keyof LogEditData | null, value: string | number) => {
        if (subKey) {
            setFormData((formData: DayEditData) => ({
                ...formData,
                [key]: {
                    ...(formData[key] as any),
                    [subKey]: value,
                }
            }));
        } else {
            setFormData((formData: DayEditData) => ({...formData, [key]: value}));
        }
    };

    useEffect(() => {
        const [hours, minutes] = formData.breakTime.split(':').map(Number);
        const seconds = hours * 3600 + minutes * 60;
        setBreakStopDate((new Date(formData.stopData.date).getTime() + seconds * 1000).toString());
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (!isNaN(Date.parse(formData.startData.date)) && !isNaN(Date.parse(formData.stopData.date))) {
            updateForm('workTime', null, subtractDatesToTime(formData.stopData.date, formData.startData.date));
        }
        //eslint-disable-next-line
    }, [formData.startData.date, formData.stopData.date]);

    useEffect(() => {
        if (Number(formData.startData.odometer) && Number(formData.stopData.odometer)) {
            updateForm('distance', null, Number(formData.stopData.odometer) - Number(formData.startData.odometer));
        }
    },[formData.startData.odometer, formData.stopData.odometer]);
    useEffect(() => {
        if (!isNaN(Date.parse(formData.stopData.date)) && breakStopDate !== '') {
            updateForm('breakTime', null, subtractDatesToTime(new Date(Number(breakStopDate)).toISOString(), formData.stopData.date));
        }
        // eslint-disable-next-line
    }, [formData.stopData.date]);

    const changingCombustion = (v: string): void => {
        const newValue = Number(formData.distance) / 100 * Number(v);
        updateForm('fuelBurned', null, newValue.toFixed(1));
        setCombustionValue(v);
    }
    const changingQuantity = (v: string): void => {
        updateForm('fuelBurned', null, v);
        setCombustionValue((Number(v) / Number(formData.distance) * 100).toFixed(1));
    }
    const changingDistance = (v: string): void => {
        setCombustionValue((Number(formData.fuelBurned) / Number(v) * 100).toFixed(1));
        updateForm('distance', null, v);
    }

    const sendForm = (e: FormEvent): void => {
        e.preventDefault();
        if (!props.day) return;
        fetchData<DayInterface>(
            props.day.status === dayStatusEnum.finished ? apiPaths.editDay : apiPaths.editSimpleDay,
            {
                method: 'PATCH',
                sendData: {
                    ...formData, id: props.day.id,
                    startData: {...formData.startData, id: props.day.startLogId},
                    stopData: {...formData.stopData, id: props.day.stopLogId}},
            },
            {
              setAlert,
              lang: props.lang,
            },
        ).then((res) => {
            if (res.success) {
                setAlert(days[props.lang].editSuccess, 'success');
                props.setDay(null);
                props.setRefresh((prev) => !prev);
            }
        });
    }

    return (
        <Modal
            aria-labelledby="day-edit"
            open={props.day !== null}
            onClose={() => props.setDay(null)}
            slots={{backdrop: StyledBackdrop}}
        >
            <ModalContent sx={{width: 400}}>
                <h2>{days[props.lang].dayEditHeader}</h2>
                <form onSubmit={sendForm}>
                    <fieldset>
                        <legend>{days[props.lang].editStartLegend}</legend>
                        <div><DateTimeInput
                            lang={props.lang}
                            value={formData.startData.date}
                            onChange={e => updateForm('startData', 'date', e)}
                            valueAsDefault
                        />
                        </div>
                        <br/>
                        <div><OdometerInput
                            lang={props.lang}
                            value={formData.startData.odometer}
                            onChange={e => updateForm('startData', 'odometer', e)}
                        />
                        </div>
                        <br/>
                        <div><PlaceInput
                            lang={props.lang}
                            defaultCountry={'PL'}
                            countryValue={formData.startData.country}
                            countryOnChange={e => updateForm('startData', 'country', e)}
                            placeValue={formData.startData.place}
                            placeOnChange={e => updateForm('startData', 'place', e)}
                            placeIdValue={formData.startData.placeId}
                            placeIdOnChange={e => updateForm('startData', 'placeId', e)}
                        />
                        </div>
                        <br/>
                        <div>
                            <ActionInput lang={props.lang} value={formData.startData.action}
                                         onChange={e => updateForm('startData', 'action', e)}/>
                        </div>
                        <br/>
                        <div><TextArea label={places[props.lang].description} value={formData.startData.notes}
                                       onChange={e => updateForm('startData', 'notes', e.target.value)}/></div>
                    </fieldset>
                    {props.day?.status === dayStatusEnum.finished &&
                        <>
                            <br/><br/>
                            <fieldset>
                                <legend>{days[props.lang].editStopLegend}</legend>
                                <div><DateTimeInput
                                    lang={props.lang}
                                    value={formData.stopData.date}
                                    onChange={e => updateForm('stopData', 'date', e)}
                                    valueAsDefault
                                />
                                </div>
                                <br/>
                                <div><OdometerInput
                                    lang={props.lang}
                                    value={formData.stopData.odometer}
                                    onChange={e => updateForm('stopData', 'odometer', e)}
                                />
                                </div>
                                <br/>
                                <div><PlaceInput
                                    lang={props.lang}
                                    defaultCountry={'PL'}
                                    countryValue={formData.stopData.country}
                                    countryOnChange={e => updateForm('stopData', 'country', e)}
                                    placeValue={formData.stopData.place}
                                    placeOnChange={e => updateForm('stopData', 'place', e)}
                                    placeIdValue={formData.stopData.placeId}
                                    placeIdOnChange={e => updateForm('stopData', 'placeId', e)}
                                />
                                </div>
                                <br/>
                                <div>
                                    <ActionInput lang={props.lang} value={formData.stopData.action}
                                                 onChange={e => updateForm('stopData', 'action', e)}/>
                                </div>
                                <br/>
                                <div><TextArea label={places[props.lang].description} value={formData.stopData.notes}
                                               onChange={e => updateForm('stopData', 'notes', e.target.value)}/></div>
                            </fieldset>
                        </>
                    }
                    <br/><br/>
                    <div><DayCardStateSelect lang={props.lang} value={formData.cardState.toString()}
                                             onChange={e => updateForm('cardState', null, e)}
                                             disabled={props.day?.status === dayStatusEnum.finished}/></div>
                    <br/>
                    <div><OnOffSwitch label={home[props.lang].doubleCrew} value={formData.doubleCrew}
                                      onChange={e => updateForm('doubleCrew', null, e)}/></div>
                    <br/>
                    {props.day?.status === dayStatusEnum.finished &&
                        <>
                            <div>
                                <DriveTimeInput lang={props.lang} value={formData.driveTime}
                                                onChange={e => updateForm('driveTime', null, e)}/>
                            </div>
                            {formData.doubleCrew === 'true' &&
                                <>
                                    <br/>
                                    <div>
                                        <DriveTimeInput lang={props.lang} value={formData.driveTime2}
                                                        onChange={e => updateForm('driveTime2', null, e)} secDriver/>
                                    </div>
                                </>
                            }
                            <br/>
                            <div><LongTimeInput
                                lang={props.lang}
                                type='work'
                                value={formData.workTime}
                                onChange={e => updateForm('workTime', null, e)}
                            />
                            </div>
                            {props.day.cardState !== dayCardStateEnum.notUsed &&
                                <>
                                    <br/>
                                    <div><LongTimeInput
                                        lang={props.lang}
                                        type='break'
                                        value={formData.breakTime}
                                        onChange={e => updateForm('breakTime', null, e)}
                                    />
                                    </div>
                                </>
                            }
                            <br/>
                            <div><FuelInput
                                type='combustion'
                                userFuelConType={userFuelContypeEnum.liters}
                                lang={props.lang}
                                value={formData.fuelBurned.toString()}
                                onChange={e => changingQuantity(e)}
                            />
                            </div>
                            <br/>
                            <div><FuelInput
                                type='combustion'
                                userFuelConType={userFuelContypeEnum.per100km}
                                lang={props.lang}
                                value={combustionValue}
                                onChange={e => (changingCombustion(e))}
                            />
                            </div>
                            <br/>
                            <div><DistanceInput
                                lang={props.lang}
                                value={formData.distance.toString()}
                                onChange={e => changingDistance(e)}
                            />
                            </div>
                        </>
                    }
                    <br/>
                    <center>
                        {loading ?
                            <CircularProgress/> :
                            <SubmitButton
                                text={days[props.lang].edit}
                                disabled={!props.day || areFieldsEqual(props.day, formData)}
                            />
                        }
                    </center>
                </form>
            </ModalContent>
        </Modal>
    );
}