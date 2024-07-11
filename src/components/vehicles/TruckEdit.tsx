import React, {Dispatch, FormEvent, SetStateAction, useState} from "react";
import {EditTruckFormInterface, userLangEnum, VehicleInterface } from "types";
import {SetAlertType} from "../../context/AlertContext";
import {useApi} from "../../hooks/useApi";
import {apiPaths} from "../../config/api";
import {handleApiResult} from "../../utils/handleApiResult";
import {vehicles} from "../../assets/txt/vehicles";
import {RegistrationNrInput} from "../common/form/vehicles/RegistrationNrInput";
import {VehicleModelInput} from "../common/form/vehicles/VehicleModelInput";
import {VehicleProductionYear} from "../common/form/vehicles/VehicleProductionYear";
import {VehicleWeightAndTankCapacity} from "../common/form/vehicles/VehicleWeightAndTankCapacity";
import {DateInput} from "../common/form/DateInput";
import {TextArea} from "../common/form/TextArea";
import {CircularProgress} from "@mui/material";
import {SubmitButton} from "../common/form/SubmitButton";
import {OnOffSwitch} from "../common/form/OnOffSwitch";
import {VehicleServiceInput} from "../common/form/vehicles/VehicleServiceInput";
import {Modal, ModalContent, StyledBackdrop} from "../common/Modal";

interface Props {
    lang: userLangEnum;
    setRefresh: Dispatch<SetStateAction<boolean>>;
    vehicle: VehicleInterface | null;
    setVehicle: Dispatch<SetStateAction<VehicleInterface | null>>;
    setAlert: (text: string, type: SetAlertType) => void;
}

export const TruckEdit = (props: Props) => {

    const defaultValues: EditTruckFormInterface = {
        isLoadable: props.vehicle?.isLoadable ? 'true' : 'false',
        registrationNr: props.vehicle ? props.vehicle.registrationNr : '',
        model: props.vehicle ? props.vehicle.model : '',
        weight: props.vehicle ? props.vehicle.weight.toString() : '',
        fuel: props.vehicle?.fuel ? props.vehicle.fuel.toString() : '0',
        year: props.vehicle ? props.vehicle.year.toString() : '',
        techRev: props.vehicle ? props.vehicle.techRev : '',
        insurance: props.vehicle ? props.vehicle.insurance : '',
        tacho: props.vehicle?.tacho ? props.vehicle.tacho : '',
        service: props.vehicle?.service ? props.vehicle.service.toString() : '',
        notes: props.vehicle?.notes ? props.vehicle.notes : '',
    }

    const [editTruckForm, setEditTruckForm] = useState<EditTruckFormInterface>(defaultValues);
    const {loading, fetchDataOld} = useApi();

    const updateForm = (key: keyof EditTruckFormInterface, value: string) => {
        setEditTruckForm((editTruckForm: EditTruckFormInterface) => ({
            ...editTruckForm,
            [key]: value,
        }));
    };

    const handleClose = () => props.setVehicle(null);

    const sendForm = async (e: FormEvent) => {
        e.preventDefault();
        if (props.vehicle) {
            const result = await fetchDataOld(apiPaths.editTruck+'/'+props.vehicle.id, 'PATCH', editTruckForm);
            handleApiResult(result, props.lang, props.setAlert, () => {
                props.setAlert(vehicles[props.lang].editSuccessInfo, 'success');
                props.setVehicle(null);
                props.setRefresh((prev) => !prev);
            });
        }
    }

    const areFieldsEqual = (data: VehicleInterface, formData: EditTruckFormInterface): boolean => {
        return (
            data.isLoadable === (formData.isLoadable === 'true') &&
            data.registrationNr === formData.registrationNr &&
            data.model === formData.model &&
            data.fuel?.toString() === formData.fuel.toString() &&
            data.techRev === formData.techRev &&
            data.year.toString() === formData.year.toString() &&
            data.insurance === formData.insurance &&
            data.tacho === formData.tacho &&
            data.service?.toString() === formData.service.toString() &&
            (
                (data.notes === null && formData.notes === '') ||
                data.notes === formData.notes
            )
        );
    }

    return (
        <div>
            <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={props.vehicle !== null}
                onClose={handleClose}
                slots={{backdrop: StyledBackdrop}}
            >
                <ModalContent sx={{width: 400}}>
                    <h2 onClick={handleClose}>{vehicles[props.lang].edit} {editTruckForm.registrationNr}</h2>
                    <form onSubmit={sendForm}>
                        <div>
                            <RegistrationNrInput vehicle={'truck'} lang={props.lang} value={editTruckForm.registrationNr} onChange={e => updateForm('registrationNr', e)}/>
                        </div>
                        <br/>
                        <div>
                            <VehicleModelInput lang={props.lang} value={editTruckForm.model} onChange={e => updateForm('model', e)}/>
                        </div>
                        <br/>
                        <div>
                            <VehicleProductionYear value={editTruckForm.year} onChange={e => updateForm('year', e)} lang={props.lang}/>
                        </div>
                        <br/>
                        <div>
                            <VehicleWeightAndTankCapacity type='weight' value={editTruckForm.weight} onChange={e => updateForm('weight', e)} lang={props.lang}/>
                        </div>
                        <br/>
                        <div>
                            <OnOffSwitch label={vehicles[props.lang].isLoadable} value={editTruckForm.isLoadable} onChange={e => updateForm('isLoadable', e)}/>
                        </div>
                        <br/>
                        <div>
                            <VehicleWeightAndTankCapacity type='fuel' value={editTruckForm.fuel} onChange={e => updateForm('fuel', e)} lang={props.lang}/>
                        </div>
                        <br/>
                        <div>
                            <DateInput label={vehicles[props.lang].insurance} lang={props.lang} value={editTruckForm.insurance} onChange={e => updateForm('insurance', e)}/>
                        </div>
                        <br/>
                        <div>
                            <DateInput label={vehicles[props.lang].techRev} lang={props.lang} value={editTruckForm.techRev} onChange={e => updateForm('techRev', e)}/>
                        </div>
                        <br/>
                        <div>
                            <DateInput label={vehicles[props.lang].tacho} lang={props.lang} value={editTruckForm.tacho} onChange={e => updateForm('tacho', e)}/>
                        </div>
                        <br/>
                        <div>
                            <VehicleServiceInput lang={props.lang} value={editTruckForm.service} onChange={e => updateForm('service', e)}/>
                        </div>
                        <br/>
                        <div><TextArea label={vehicles[props.lang].notes} value={editTruckForm.notes}
                                       onChange={e => updateForm('notes', e.target.value)}/></div>
                        <br/>
                        <center>
                            {loading ?
                                <CircularProgress/> :
                                <SubmitButton
                                    text={vehicles[props.lang].edit}
                                    disabled={!props.vehicle || areFieldsEqual(props.vehicle, editTruckForm)}
                                />
                            }
                        </center>
                    </form>
                </ModalContent>
            </Modal>
        </div>
    );
}
