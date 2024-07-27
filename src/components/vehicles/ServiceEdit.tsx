import React, {Dispatch, FormEvent, SetStateAction, useEffect, useState} from "react";
import {ServiceInterface, userLangEnum, ServiceEditData, LogEditData, VehicleInterface, vehicleTypeEnum } from "types";
import {useAlert} from "../../hooks/useAlert";
import {useApi} from "../../hooks/useApi";
import {serviceDefaultValues} from "./serviceDefaultValues";
import {Modal, ModalContent, StyledBackdrop} from "../common/Modal";
import {DateTimeInput} from "../common/form/DateTimeInput";
import {OdometerInput} from "../common/form/OdometerInput";
import {PlaceInput} from "../common/form/PlaceInput";
import {ActionInput} from "../common/form/ActionInput";
import {TextArea} from "../common/form/TextArea";
import {places} from "../../assets/txt/places";
import {CircularProgress} from "@mui/material";
import {SubmitButton} from "../common/form/SubmitButton";
import {vehicles} from "../../assets/txt/vehicles";
import {apiPaths} from "../../config/api";
import {VehicleServiceTypeSelect} from "../common/form/vehicles/VehicleServiceTypeSelect";
import {VehicleServiceEntry} from "../common/form/vehicles/VehicleServiceEntry";
import {areServiceFieldEqual} from "./areServiceFieldEqual";

interface Props {
    service: ServiceInterface | null;
    setService: Dispatch<SetStateAction<ServiceInterface | null>>;
    lang: userLangEnum;
    setRefresh: Dispatch<SetStateAction<boolean>>;
}

export const ServiceEdit = (props: Props) => {
    const {setAlert} = useAlert();
    const {loading, fetchData} = useApi();
    const [formData, setFormData] = useState<ServiceEditData>(serviceDefaultValues(props.service));
    const [vehicle, setVehicle] = useState<VehicleInterface | null>(null);

    useEffect(() => {
        if (props.service) {
            fetchData<{data: string}>(`${apiPaths.getVehicleRegById}/${props.service.vehicleId}`).then((res) => {
                if (res.responseData) {
                    fetchData<VehicleInterface>(`${apiPaths.getVehicleByRegistration}/${res.responseData.data}`).then((res) => {
                        if (res.responseData) {
                            setVehicle(res.responseData);
                        }
                    });
                }
            });
        }
        // eslint-disable-next-line
    }, [props.service]);

    const updateForm = (key: keyof ServiceEditData, subKey: keyof LogEditData | null, value: string | number) => {
        if (subKey) {
            setFormData((formData: ServiceEditData) => ({
                ...formData,
                [key]: {
                    ...(formData[key] as any),
                    [subKey]: value,
                }
            }));
        } else {
            setFormData((formData: ServiceEditData) => ({...formData, [key]: value}));
        }
    };

    const sendForm = (e: FormEvent): void => {
        e.preventDefault();
        if (!props.service) {
            return;
        }
        fetchData<ServiceInterface>(apiPaths.editService, {
            method: 'PATCH',
            sendData: {
                ...formData, id: props.service.id,
                logData: {...formData.logData, id: props.service.logId},
            },
        }, {
            setAlert,
            lang: props.lang,
        }).then((res) => {
            if (res.success) {
                setAlert(vehicles[props.lang].editServiceSuccess, 'success');
                props.setService(null);
                props.setRefresh((prev) => !prev);
            }
        });
    }

    const handleClose = () => props.setService(null);

    return (
        <Modal
            aria-labelledby="day-edit"
            open={props.service !== null}
            onClose={handleClose}
            slots={{backdrop: StyledBackdrop}}
        >
            <ModalContent sx={{width: 400}}>
                <h2 onClick={handleClose}>{vehicles[props.lang].editServiceHeader}</h2>
                <form onSubmit={sendForm}>
                    <fieldset>
                        <legend>{vehicles[props.lang].editLogLegend}</legend>
                        <div><DateTimeInput
                            lang={props.lang}
                            value={formData.logData.date}
                            onChange={e => updateForm('logData', 'date', e)}
                            valueAsDefault
                        />
                        </div>
                        {vehicle?.type === vehicleTypeEnum.truck &&
                            <>
                                <br/>
                                <div><OdometerInput
                                    lang={props.lang}
                                    value={formData.logData.odometer}
                                    onChange={e => updateForm('logData', 'odometer', e)}
                                />
                                </div>
                            </>
                        }
                        <br/>
                        <div><PlaceInput
                            lang={props.lang}
                            defaultCountry={'PL'}
                            countryValue={formData.logData.country}
                            countryOnChange={e => updateForm('logData', 'country', e)}
                            placeValue={formData.logData.place}
                            placeOnChange={e => updateForm('logData', 'place', e)}
                            placeIdValue={formData.logData.placeId}
                            placeIdOnChange={e => updateForm('logData', 'placeId', e)}
                        />
                        </div>
                        <br/>
                        <div>
                            <ActionInput lang={props.lang} value={formData.logData.action}
                                         onChange={e => updateForm('logData', 'action', e)}/>
                        </div>
                        <br/>
                        <div><TextArea label={places[props.lang].description} value={formData.logData.notes}
                                       onChange={e => updateForm('logData', 'notes', e.target.value)}/></div>
                    </fieldset>
                    <br/><br/>
                    <div>
                        <VehicleServiceTypeSelect
                            lang={props.lang}
                            value={formData.type.toString()}
                            onChange={e => updateForm('type', null, e)}
                        />
                    </div>
                    <br/>
                    <div>
                        <VehicleServiceEntry
                            lang={props.lang}
                            value={formData.entry}
                            onChange={e => updateForm('entry', null, e)}
                        />
                    </div>
                    <br/>
                    <center>
                        {loading ?
                            <CircularProgress/> :
                            <SubmitButton
                                text={vehicles[props.lang].edit}
                                disabled={!props.service || areServiceFieldEqual(props.service, formData)}
                            />
                        }
                    </center>
                </form>
            </ModalContent>
        </Modal>
    );
}