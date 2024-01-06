import React, {Dispatch, FormEvent, SetStateAction, useState} from "react";
import { userLangEnum, VehicleInterface, EditTrailerFormInterface } from "types";
import {css, styled} from "@mui/system";
import {Modal as BaseModal} from "@mui/base/Modal/Modal";
import clsx from "clsx";
import {vehicles} from "../../assets/txt/vehicles";
import {RegistrationNrInput} from "../common/form/vehicles/RegistrationNrInput";
import {VehicleModelInput} from "../common/form/vehicles/VehicleModelInput";
import {VehicleProductionYear} from "../common/form/vehicles/VehicleProductionYear";
import {VehicleWeightAndTankCapacity} from "../common/form/vehicles/VehicleWeightAndTankCapacity";
import {DateInput} from "../common/form/DateInput";
import {TextArea} from "../common/form/TextArea";
import {CircularProgress} from "@mui/material";
import {SubmitButton} from "../common/form/SubmitButton";
import {useApi} from "../../hooks/useApi";
import {apiPaths} from "../../config/api";
import {handleApiResult} from "../../utils/handleApiResult";
import {SetAlertType} from "../../context/AlertContext";

interface Props {
    lang: userLangEnum;
    setRefresh: Dispatch<SetStateAction<boolean>>;
    vehicle: VehicleInterface | null;
    setVehicle: Dispatch<SetStateAction<VehicleInterface | null>>;
    setAlert: (text: string, type: SetAlertType) => void;
}

export const TrailerEdit = (props: Props) => {

    const defaultValues: EditTrailerFormInterface = {
        registrationNr: props.vehicle ? props.vehicle.registrationNr : '',
        model: props.vehicle ? props.vehicle.model : '',
        weight: props.vehicle ? props.vehicle.weight.toString() : '',
        year: props.vehicle ? props.vehicle.year.toString() : '',
        techRev: props.vehicle ? props.vehicle.techRev : '',
        insurance: props.vehicle ? props.vehicle.insurance : '',
        notes: props.vehicle?.notes ? props.vehicle.notes : '',
    }

    const [editTrailerForm, setEditTrailerForm] = useState<EditTrailerFormInterface>(defaultValues);
    const {loading, fetchData} = useApi();

    const updateForm = (key: keyof EditTrailerFormInterface, value: string) => {
        setEditTrailerForm((editTrailerForm: EditTrailerFormInterface) => ({
            ...editTrailerForm,
            [key]: value,
        }));
    };

    const handleClose = () => props.setVehicle(null);

    const sendForm = async (e: FormEvent) => {
        e.preventDefault();
        if (props.vehicle) {
            const result = await fetchData(apiPaths.editTrailer+'/'+props.vehicle.id, 'PATCH', editTrailerForm);
            handleApiResult(result, props.lang, props.setAlert, () => {
                props.setAlert(vehicles[props.lang].editSuccessInfo, 'success');
                props.setVehicle(null);
                props.setRefresh((prev) => !prev);
            });
        }
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
                        <h2>{vehicles[props.lang].edit} {editTrailerForm.registrationNr}</h2>
                        <form onSubmit={sendForm}>
                            <div>
                                <RegistrationNrInput vehicle={'trailer'} lang={props.lang} value={editTrailerForm.registrationNr} onChange={e => updateForm('registrationNr', e)}/>
                            </div>
                            <br/>
                            <div>
                                <VehicleModelInput lang={props.lang} value={editTrailerForm.model} onChange={e => updateForm('model', e)}/>
                            </div>
                            <br/>
                            <div>
                                <VehicleProductionYear value={editTrailerForm.year} onChange={e => updateForm('year', e)} lang={props.lang}/>
                            </div>
                            <br/>
                            <div>
                                <VehicleWeightAndTankCapacity type='weight' value={editTrailerForm.weight} onChange={e => updateForm('weight', e)} lang={props.lang}/>
                            </div>
                            <br/>
                            <div>
                                <DateInput label={vehicles[props.lang].insurance} lang={props.lang} value={editTrailerForm.insurance} onChange={e => updateForm('insurance', e)}/>
                            </div>
                            <br/>
                            <div>
                                <DateInput label={vehicles[props.lang].techRev} lang={props.lang} value={editTrailerForm.techRev} onChange={e => updateForm('techRev', e)}/>
                            </div>
                            <br/>
                            <div><TextArea label={vehicles[props.lang].notes} value={editTrailerForm.notes}
                                           onChange={e => updateForm('notes', e.target.value)}/></div>
                            <br/>
                            <center>
                            {loading ?
                                <CircularProgress/> :
                                <SubmitButton text={vehicles[props.lang].edit}/>
                            }
                            </center>
                        </form>
                </ModalContent>
            </Modal>
        </div>
    );
}

const Backdrop = React.forwardRef<HTMLDivElement,
    { open?: boolean; className: string }>((props, ref) => {
    const {open, className, ...other} = props;
    return (
        <div
            className={clsx({'MuiBackdrop-open': open}, className)}
            ref={ref}
            {...other}
        />
    );
});

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled('div')(
    () => css`
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 500;
      text-align: start;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 8px;
      overflow: hidden;
      background-color: #424242;
      border-radius: 8px;
      border: 2px solid #152944;
      box-shadow: 0 4px 12px rgb(0 0 0 / 0.5);
      padding: 24px;
      color: #F3F6F9;
      max-height: 90vh;
      overflow-y: auto;
    `,
);