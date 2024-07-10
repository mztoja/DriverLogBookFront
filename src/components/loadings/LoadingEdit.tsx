import React, {FormEvent, useState} from 'react';
import {Dispatch, SetStateAction} from "react";
import { LoadInterface, userLangEnum, LoadEditData, LogEditData, loadStatusEnum } from "types";
import {useAlert} from "../../hooks/useAlert";
import {useApi} from "../../hooks/useApi";
import {defaultValues} from "./defaultValues";
import {Modal, ModalContent, StyledBackdrop} from "../common/Modal";
import {finances} from "../../assets/txt/finances";
import {DateTimeInput} from "../common/form/DateTimeInput";
import {OdometerInput} from "../common/form/OdometerInput";
import {PlaceInput} from "../common/form/PlaceInput";
import {ActionInput} from "../common/form/ActionInput";
import {TextArea} from "../common/form/TextArea";
import {places} from "../../assets/txt/places";
import {CircularProgress} from "@mui/material";
import {SubmitButton} from "../common/form/SubmitButton";
import {loadings} from "../../assets/txt/loadings";
import {areFieldsEqual} from "./areFieldsEqual";
import {home} from "../../assets/txt/home";
import {LoadReferenceInput} from "../common/form/load/LoadReferenceInput";
import {LoadDescriptionInput} from "../common/form/load/LoadDescriptionInput";
import {LoadWeightInput} from "../common/form/load/LoadWeightInput";
import {LoadQuantityInput} from "../common/form/load/LoadQuantityInput";
import {RegistrationNrInput} from "../common/form/vehicles/RegistrationNrInput";
import {DistanceInput} from "../common/form/DistanceInput";
import {apiPaths} from "../../config/api";

interface Props {
    load: LoadInterface | null;
    setLoad: Dispatch<SetStateAction<LoadInterface | null>>;
    lang: userLangEnum;
    setRefresh: Dispatch<SetStateAction<boolean>>;
}

export const LoadingEdit = (props: Props) => {
    const {setAlert} = useAlert();
    const {loading, fetchData} = useApi();
    const [formData, setFormData] = useState<LoadEditData>(defaultValues(props.load));

    const updateForm = (key: keyof LoadEditData, subKey: keyof LogEditData | null, value: string | number): void => {
        if (subKey) {
            setFormData((formData: LoadEditData) => ({
                ...formData,
                [key]: {
                    ...(formData[key] as any),
                    [subKey]: value,
                }
            }));
        } else {
            setFormData((formData: LoadEditData) => ({...formData, [key]: value}));
        }
    };

    const sendForm = (e: FormEvent): void => {
        e.preventDefault();
        if (!props.load) {return;}
        fetchData<LoadInterface>(
            props.load.status === loadStatusEnum.unloaded ? apiPaths.editLoad : apiPaths.editSimpleLoad,
            {
                method: 'PATCH',
                sendData: {
                    ...formData,
                    id: props.load.id,
                    loadingLogData: {...formData.loadingLogData, id: props.load.loadingLogId},
                    unloadingLogData: {...formData.unloadingLogData, id: props.load.unloadingLogId},
                },
            },
            {setAlert, lang: props.lang}
        ).then((res) => {
            if (res.success) {
                setAlert(loadings[props.lang].editSuccess, 'success');
                props.setLoad(null);
                props.setRefresh((prev) => !prev);
            }
        })
    }

    return (
        <Modal
            aria-labelledby="loading-edit"
            open={props.load !== null}
            onClose={() => props.setLoad(null)}
            slots={{backdrop: StyledBackdrop}}
        >
            <ModalContent sx={{width: 400}}>
                <h2>{loadings[props.lang].loadingEditHeader}</h2>
                <form onSubmit={sendForm}>
                    <fieldset>
                        <legend>{loadings[props.lang].loading}</legend>
                        <div><DateTimeInput
                            lang={props.lang}
                            value={formData.loadingLogData.date}
                            onChange={e => updateForm('loadingLogData', 'date', e)}
                            valueAsDefault
                        />
                        </div>
                        <br/>
                        <div><OdometerInput
                            lang={props.lang}
                            value={formData.loadingLogData.odometer}
                            onChange={e => updateForm('loadingLogData', 'odometer', e)}
                        />
                        </div>
                        <br/>
                        <div><PlaceInput
                            lang={props.lang}
                            defaultCountry={'PL'}
                            countryValue={formData.loadingLogData.country}
                            countryOnChange={e => updateForm('loadingLogData', 'country', e)}
                            placeValue={formData.loadingLogData.place}
                            placeOnChange={e => updateForm('loadingLogData', 'place', e)}
                            placeIdValue={formData.loadingLogData.placeId}
                            placeIdOnChange={e => updateForm('loadingLogData', 'placeId', e)}
                        />
                        </div>
                        <br/>
                        <div>
                            <ActionInput lang={props.lang} value={formData.loadingLogData.action}
                                         onChange={e => updateForm('loadingLogData', 'action', e)}/>
                        </div>
                        <br/>
                        <div><TextArea label={places[props.lang].description} value={formData.loadingLogData.notes}
                                       onChange={e => updateForm('loadingLogData', 'notes', e.target.value)}/></div>
                    </fieldset>
                    <br/><br/>
                    {props.load?.status === loadStatusEnum.unloaded &&
                    <>
                        <fieldset>
                            <legend>{loadings[props.lang].unloading}</legend>
                            <div><DateTimeInput
                                lang={props.lang}
                                value={formData.unloadingLogData.date}
                                onChange={e => updateForm('unloadingLogData', 'date', e)}
                                valueAsDefault
                            />
                            </div>
                            <br/>
                            <div><OdometerInput
                                lang={props.lang}
                                value={formData.unloadingLogData.odometer}
                                onChange={e => updateForm('unloadingLogData', 'odometer', e)}
                            />
                            </div>
                            <br/>
                            <div><PlaceInput
                                lang={props.lang}
                                defaultCountry={'PL'}
                                countryValue={formData.unloadingLogData.country}
                                countryOnChange={e => updateForm('unloadingLogData', 'country', e)}
                                placeValue={formData.unloadingLogData.place}
                                placeOnChange={e => updateForm('unloadingLogData', 'place', e)}
                                placeIdValue={formData.unloadingLogData.placeId}
                                placeIdOnChange={e => updateForm('unloadingLogData', 'placeId', e)}
                            />
                            </div>
                            <br/>
                            <div>
                                <ActionInput lang={props.lang} value={formData.unloadingLogData.action}
                                             onChange={e => updateForm('unloadingLogData', 'action', e)}/>
                            </div>
                            <br/>
                            <div><TextArea label={places[props.lang].description} value={formData.unloadingLogData.notes}
                                           onChange={e => updateForm('unloadingLogData', 'notes', e.target.value)}/></div>
                        </fieldset>
                        <br/><br/>
                    </>
                    }
                    <fieldset className="maxWidth">
                        <legend>{home[props.lang].loadingSender}</legend>
                        <div><PlaceInput
                            lang={props.lang}
                            defaultCountry={'PL'}
                            countryValue=''
                            countryOnChange={() => ''}
                            placeValue=''
                            placeOnChange={() => ''}
                            placeIdValue={formData.senderId}
                            placeIdOnChange={e => updateForm('senderId', null, e)}
                            disablePlaceText
                        />
                        </div>
                    </fieldset>
                    <br/><br/>
                    <fieldset className="maxWidth">
                        <legend>{home[props.lang].loadingReceiver}</legend>
                        <div><PlaceInput
                            lang={props.lang}
                            defaultCountry={'PL'}
                            countryValue=''
                            countryOnChange={() => ''}
                            placeValue=''
                            placeOnChange={() => ''}
                            placeIdValue={formData.receiverId}
                            placeIdOnChange={e => updateForm('receiverId', null, e)}
                            disablePlaceText
                        />
                        </div>
                    </fieldset>
                    <br/><br/>
                    <div>
                        <RegistrationNrInput vehicle='vehicle' lang={props.lang} value={formData.vehicle} onChange={e => updateForm('vehicle', null, e)}/>
                    </div>
                    <br/>
                    <div>
                        <LoadReferenceInput lang={props.lang} value={formData.reference} onChange={e => updateForm('reference', null, e.target.value)}/>
                    </div>
                    <br/>
                    <div>
                        <LoadDescriptionInput lang={props.lang} value={formData.description} onChange={e => updateForm('description', null, e.target.value)}/>
                    </div>
                    <br/>
                    <div><LoadWeightInput
                        lang={props.lang}
                        value={formData.weight}
                        onChange={e => updateForm('weight', null, e)}
                    />
                    </div>
                    <br/>
                    <div><LoadQuantityInput
                        lang={props.lang}
                        value={formData.quantity}
                        onChange={e => updateForm('quantity', null, e.target.value)}
                    />
                    </div>
                    <br/>
                    <div>
                        <DistanceInput lang={props.lang} value={formData.distance} onChange={e => updateForm('distance', null, e)}/>
                    </div>
                    <br/>
                    <center>
                        {loading ?
                            <CircularProgress/> :
                            <SubmitButton
                                text={finances[props.lang].edit}
                                disabled={!props.load || areFieldsEqual(props.load, formData)}
                            />
                        }
                    </center>
                </form>
            </ModalContent>
        </Modal>
    );
}