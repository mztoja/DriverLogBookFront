import React, {Dispatch, FormEvent, SetStateAction, useState} from "react";
import {AddVehicleFormInterface, UserInterface, vehicleTypeEnum } from "types";
import {CircularProgress, Fab} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {VehicleTypeSelect} from "../common/form/vehicles/VehicleTypeSelect";
import { vehicles } from "../../assets/txt/vehicles";
import {RegistrationNrInput} from "../common/form/vehicles/RegistrationNrInput";
import {VehicleProductionYear} from "../common/form/vehicles/VehicleProductionYear";
import {OnOffSwitch} from "../common/form/OnOffSwitch";
import {VehicleWeightAndTankCapacity} from "../common/form/vehicles/VehicleWeightAndTankCapacity";
import {DateInput} from "../common/form/DateInput";
import {VehicleServiceInput} from "../common/form/vehicles/VehicleServiceInput";
import {SubmitButton} from "../common/form/SubmitButton";
import {useApi} from "../../hooks/useApi";
import {TextArea} from "../common/form/TextArea";
import {apiPaths} from "../../config/api";
import {VehicleModelInput} from "../common/form/vehicles/VehicleModelInput";
import {handleApiResult} from "../../utils/handleApiResult";
import {useAlert} from "../../hooks/useAlert";

interface Props {
    userData: UserInterface;
    setRefresh: Dispatch<SetStateAction<boolean>>;
}

const defaultValues: AddVehicleFormInterface = {
    type: vehicleTypeEnum.trailer,
    registrationNr: '',
    model: '',
    isLoadable: 'false',
    weight: '',
    year: '',
    fuel: '',
    techRev: '',
    insurance: '',
    tacho: '',
    service: '',
    notes: '',
}

export const AddVehicle = (props: Props) => {
    const [addVehicleShow, setAddVehicleShow] = useState<boolean>(false);
    const [addVehicleForm, setAddVehicleForm] = useState<AddVehicleFormInterface>(defaultValues);
    const txt = vehicles[props.userData.lang];
    const {loading, fetchData} = useApi();
    const {setAlert} = useAlert();

    const updateForm = (key: keyof AddVehicleFormInterface, value: string) => {
        setAddVehicleForm((addVehicleForm: AddVehicleFormInterface) => ({
            ...addVehicleForm,
            [key]: value,
        }));
    };

    const sendAddVehicleForm = async (e: FormEvent) => {
        e.preventDefault();
        const result = await fetchData(apiPaths.createVehicle, 'POST', addVehicleForm);
        handleApiResult(result, props.userData.lang, setAlert, () => {
            setAlert(vehicles[props.userData.lang].addSuccess, 'success');
            setAddVehicleShow(false);
            props.setRefresh((prev) => !prev);
        });
    }

    return (
        <>
            <div><Fab  onClick={() => setAddVehicleShow(!addVehicleShow)} color="primary" aria-label="add"><AddIcon /></Fab></div><br/>
            {addVehicleShow &&
                <fieldset>
                    <legend>{txt.addVehicle}</legend>
                    <form onSubmit={sendAddVehicleForm}>
                        <div>
                            <VehicleTypeSelect value={addVehicleForm.type.toString()} onChange={e => updateForm('type', e)} lang={props.userData.lang}/>
                        </div>
                        <br/>
                        <div>
                            <RegistrationNrInput vehicle={addVehicleForm.type === vehicleTypeEnum.truck ? 'truck' : 'trailer'} lang={props.userData.lang} value={addVehicleForm.registrationNr} onChange={e => updateForm('registrationNr', e)}/>
                        </div>
                        <br/>
                        <div>
                            <VehicleModelInput lang={props.userData.lang} value={addVehicleForm.model} onChange={e => updateForm('model', e)}/>
                        </div>
                        <br/>
                        <div>
                            <VehicleProductionYear value={addVehicleForm.year} onChange={e => updateForm('year', e)} lang={props.userData.lang}/>
                        </div>
                        <br/>
                        <div>
                            <VehicleWeightAndTankCapacity type='weight' value={addVehicleForm.weight} onChange={e => updateForm('weight', e)} lang={props.userData.lang}/>
                        </div>
                        {addVehicleForm.type === vehicleTypeEnum.truck &&
                            <>
                                <br/>
                                <div>
                                    <OnOffSwitch label={txt.isLoadable} value={addVehicleForm.isLoadable} onChange={e => updateForm('isLoadable', e)}/>
                                </div>
                                <br/>
                                <div>
                                    <VehicleWeightAndTankCapacity type='fuel' value={addVehicleForm.fuel} onChange={e => updateForm('fuel', e)} lang={props.userData.lang}/>
                                </div>
                            </>
                        }
                        <br/>
                        <div>
                            <DateInput label={txt.insurance} lang={props.userData.lang} value={addVehicleForm.insurance} onChange={e => updateForm('insurance', e)}/>
                        </div>
                        <br/>
                        <div>
                            <DateInput label={txt.techRev} lang={props.userData.lang} value={addVehicleForm.techRev} onChange={e => updateForm('techRev', e)}/>
                        </div>
                        {addVehicleForm.type === vehicleTypeEnum.truck &&
                            <>
                                <br/>
                                <div>
                                    <DateInput label={txt.tacho} lang={props.userData.lang} value={addVehicleForm.tacho} onChange={e => updateForm('tacho', e)}/>
                                </div>
                                <br/>
                                <div>
                                    <VehicleServiceInput lang={props.userData.lang} value={addVehicleForm.service} onChange={e => updateForm('service', e)}/>
                                </div>
                            </>
                        }
                        <br/>
                        <div><TextArea label={txt.notes} value={addVehicleForm.notes}
                                       onChange={e => updateForm('notes', e.target.value)}/></div>
                        <br/>
                        {loading ?
                            <CircularProgress/> :
                            <SubmitButton text={txt.addVehicle}/>
                        }
                    </form>
                </fieldset>
            }
        </>
    );
}