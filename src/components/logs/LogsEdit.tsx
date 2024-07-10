import React, {Dispatch, FormEvent, SetStateAction, useState} from "react";
import {LogEditData, LogInterface, userLangEnum} from "types";
import {Modal, ModalContent, StyledBackdrop} from "../common/Modal";
import {logs} from "../../assets/txt/logs";
import {DateTimeInput} from "../common/form/DateTimeInput";
import {OdometerInput} from "../common/form/OdometerInput";
import {PlaceInput} from "../common/form/PlaceInput";
import {ActionInput} from "../common/form/ActionInput";
import {TextArea} from "../common/form/TextArea";
import {places} from "../../assets/txt/places";
import {CircularProgress} from "@mui/material";
import {SubmitButton} from "../common/form/SubmitButton";
import {useApi} from "../../hooks/useApi";
import {apiPaths} from "../../config/api";
import {useAlert} from "../../hooks/useAlert";
import {areFieldsEqual} from "./areFieldsEqual";
import {defaultValues} from "./defaultValues";

interface Props {
    log: LogInterface | null;
    setLog: Dispatch<SetStateAction<LogInterface | null>>;
    lang: userLangEnum;
    setRefresh: Dispatch<SetStateAction<boolean>>;
}

export const LogsEdit = (props: Props) => {

    const {setAlert} = useAlert();
    const {loading, fetchData} = useApi();
    const [formData, setFormData] = useState<LogEditData>(defaultValues(props.log));

    const updateForm = (key: keyof LogEditData, value: string) => {
        setFormData((formData: LogEditData) => ({
            ...formData,
            [key]: value,
        }));
    };

    const sendForm = (e: FormEvent):void => {
        e.preventDefault();
        if (props.log) {
            fetchData<LogInterface>(apiPaths.editLog, {method: 'PATCH', sendData: {...formData, id: props.log.id}}, {setAlert, lang: props.lang}).then((res) => {
                if (res.success) {
                    setAlert(logs[props.lang].editSuccess, 'success');
                    props.setLog(null);
                    props.setRefresh((prev) => !prev);
                }
            })
        }
    }

    return (
        <Modal
            aria-labelledby="day-edit"
            open={props.log !== null}
            onClose={() => props.setLog(null)}
            slots={{backdrop: StyledBackdrop}}
        >
            <ModalContent sx={{width: 400}}>
                <h2>{logs[props.lang].logEditHeader}</h2>
                <form onSubmit={sendForm}>
                    <div><DateTimeInput
                        lang={props.lang}
                        value={formData.date}
                        onChange={e => updateForm('date', e)}
                        valueAsDefault
                    />
                    </div>
                    <br/>
                    <div><OdometerInput
                        lang={props.lang}
                        value={formData.odometer}
                        onChange={e => updateForm('odometer', e)}
                    />
                    </div>
                    <br/>
                    <div><PlaceInput
                        lang={props.lang}
                        defaultCountry={'PL'}
                        countryValue={formData.country}
                        countryOnChange={e => updateForm('country', e)}
                        placeValue={formData.place}
                        placeOnChange={e => updateForm('place', e)}
                        placeIdValue={formData.placeId}
                        placeIdOnChange={e => updateForm('placeId', e)}
                    />
                    </div>
                    <br/>
                    <div>
                        <ActionInput lang={props.lang} value={formData.action} onChange={e => updateForm('action', e)}/>
                    </div>
                    <br/>
                    <div><TextArea label={places[props.lang].description} value={formData.notes}
                                   onChange={e => updateForm('notes', e.target.value)}/></div>
                    <br/>
                    <center>
                        {loading ?
                            <CircularProgress/> :
                            <SubmitButton
                                text={logs[props.lang].edit}
                                disabled={!props.log || areFieldsEqual(props.log, formData)}
                            />
                        }
                    </center>
                </form>
            </ModalContent>
        </Modal>
    );
}