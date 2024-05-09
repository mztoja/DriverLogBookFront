import React, {Dispatch, FormEvent, SetStateAction, useState} from 'react';
import {LogEditData, TourEditData, TourInterface, tourStatusEnum, userFuelContypeEnum, userLangEnum } from 'types';
import {defaultValues} from "./defaultValues";
import {useAlert} from "../../hooks/useAlert";
import {useApi} from "../../hooks/useApi";
import {Modal, ModalContent, StyledBackdrop} from "../common/Modal";
import {DateTimeInput} from "../common/form/DateTimeInput";
import {OdometerInput} from "../common/form/OdometerInput";
import {PlaceInput} from "../common/form/PlaceInput";
import {ActionInput} from "../common/form/ActionInput";
import {TextArea} from "../common/form/TextArea";
import {places} from "../../assets/txt/places";
import {CircularProgress} from "@mui/material";
import {SubmitButton} from "../common/form/SubmitButton";
import {tours} from "../../assets/txt/tours";
import {areFieldsEqual} from "./areFieldsEqual";
import {FuelInput} from "../common/form/FuelInput";
import {NumberInput} from "../common/form/NumberInput";
import {AmountInput} from "../common/form/finance/AmountInput";
import {apiPaths} from "../../config/api";

interface Props {
    tour: TourInterface | null;
    setTour: Dispatch<SetStateAction<TourInterface | null>>;
    lang: userLangEnum;
    setRefresh: Dispatch<SetStateAction<boolean>>;
}

export const TourEdit = (props: Props) => {

    const [formData, setFormData] = useState<TourEditData>(defaultValues(props.tour));
    const {setAlert} = useAlert();
    const {loading, fetchData} = useApi();

    const updateForm = (key: keyof TourEditData, subKey: keyof LogEditData | null, value: string | number) => {
        if (subKey) {
            setFormData((formData: TourEditData) => ({
                ...formData,
                [key]: {
                    ...(formData[key] as any),
                    [subKey]: value,
                }
            }));
        } else {
            setFormData((formData: TourEditData) => ({...formData, [key]: value}));
        }
    };

    const sendForm = (e: FormEvent): void => {
        e.preventDefault();
        if (!props.tour) return;
        fetchData<TourInterface>(
            props.tour.status === tourStatusEnum.started ? apiPaths.editSimpleTour : apiPaths.editTour,
            {
                method: 'PATCH',
                sendData: {
                    ...formData, id: props.tour.id,
                    startData: {...formData.startData, id: props.tour.startLogId},
                    stopData: {...formData.stopData, id: props.tour.status === tourStatusEnum.started ? 0 : props.tour.stopLogId}},
            },
            {
                setAlert,
                lang: props.lang,
            },
        ).then((res) => {
            if (res.success) {
                setAlert(tours[props.lang].editSuccess, 'success');
                props.setTour(null);
                props.setRefresh((prev) => !prev);
            }
        });
    }

    return (
        <Modal
            aria-labelledby="tour-edit"
            open={props.tour !== null}
            onClose={() => props.setTour(null)}
            slots={{backdrop: StyledBackdrop}}
        >
            <ModalContent sx={{width: 400}}>
                <h2>{tours[props.lang].editHeader}</h2>
                <form onSubmit={sendForm}>
                    <fieldset>
                        <legend>{tours[props.lang].editStartLegend}</legend>
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
                        <div>
                            <FuelInput
                                lang={props.lang}
                                value={formData.fuelStateBefore}
                                onChange={e => updateForm('fuelStateBefore', null, e)}
                                type='quantity'
                                userFuelConType={userFuelContypeEnum.liters}
                            />
                        </div>
                        <br/>
                        <div><TextArea label={places[props.lang].description} value={formData.startData.notes}
                                       onChange={e => updateForm('startData', 'notes', e.target.value)}/></div>
                    </fieldset>
                    {props.tour?.status !== tourStatusEnum.started &&
                        <>
                            <br/><br/>
                            <fieldset>
                                <legend>{tours[props.lang].editStopLegend}</legend>
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
                                <div>
                                    <FuelInput
                                        lang={props.lang}
                                        value={formData.fuelStateAfter}
                                        onChange={e => updateForm('fuelStateAfter', null, e)}
                                        type='quantity'
                                        userFuelConType={userFuelContypeEnum.liters}
                                    />
                                </div>
                                <br/>
                                <div><TextArea label={places[props.lang].description} value={formData.stopData.notes}
                                               onChange={e => updateForm('stopData', 'notes', e.target.value)}/></div>
                            </fieldset>
                        </>
                    }
                    <br/><br/>
                    <div>
                        <NumberInput
                            label={tours[props.lang].tourNumber}
                            lang={props.lang}
                            value={formData.tourNr}
                            onChange={e => updateForm('tourNr', null, e)}
                        />
                    </div>
                    <br/>
                    {props.tour?.status !== tourStatusEnum.started &&
                    <>
                        <div>
                            <AmountInput
                                lang={props.lang}
                                valueAmount={formData.expectedSalary}
                                valueCurrency={formData.currency}
                                onChangeAmount={e => updateForm('expectedSalary', null, e)}
                                onChangeCurrency={e => updateForm('currency', null, e)}
                                nameId='expectedSalary'
                            />
                        </div>
                    <br/>
                    </>
                    }
                    <br/>
                    <center>
                        {loading ?
                            <CircularProgress/> :
                            <SubmitButton
                                text={tours[props.lang].edit}
                                disabled={!props.tour || areFieldsEqual(props.tour, formData)}
                            />
                        }
                    </center>
                </form>
            </ModalContent>
        </Modal>
    );
}