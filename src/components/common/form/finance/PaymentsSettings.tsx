import * as React from 'react';
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {DeletePaymentData, PaymentInterface, userLangEnum} from 'types';
import {form} from "../../../../assets/txt/form";
import {CircularProgress, IconButton, TextField, Tooltip} from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {apiPaths} from "../../../../config/api";
import {useApi} from "../../../../hooks/useApi";
import {AddPaymentData} from "types";
import {Modal, ModalContent, StyledBackdrop} from "../../Modal";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    paymentsList: PaymentInterface[];
    setPaymentsList: Dispatch<SetStateAction<PaymentInterface[]>>;
    lang: userLangEnum;
}

export const PaymentsSettings = (props: Props) => {
    const [newMethod, setNewMethod] = useState<string>('');
    const [validation, setValidation] = useState<boolean>(false);
    const [isDefault, setIsDefault] = useState<boolean>(false);
    const {loading, fetchDataOld} = useApi();

    useEffect(() => {
        const findDefault = props.paymentsList.find((payment) => (payment.default === true));
        setIsDefault(!!findDefault);
    }, [props.paymentsList]);

    useEffect(() => {
        if ((newMethod.length <= 10) || (newMethod === '')) {
            setValidation(false);
        } else {
            setValidation(true);
        }
    }, [newMethod]);

    const handleClose = () => props.setOpen(false);

    const add = async () => {
        const sendData: AddPaymentData = {
            paymentMethod: newMethod,
        }
        const find = props.paymentsList.find((payment) => (payment.method === newMethod));
        if (!find) {
            const result = await fetchDataOld(apiPaths.addPaymentMethod, 'POST', sendData);
            if ((result && result.responseData) && (!result.responseData.dtc)) {
                props.setPaymentsList(result.responseData);
                setNewMethod('');
            }
        } else {
            setNewMethod('');
        }
    }

    const erase = async (id: number) => {
        const sendData: DeletePaymentData = {
            paymentId: id.toString(),
        }
        const result = await fetchDataOld(apiPaths.deletePaymentMethod, 'DELETE', sendData);
        if ((result && result.responseData) && (!result.responseData.dtc)) {
            props.setPaymentsList(result.responseData);
        }
    }

    const select = async (id: number) => {
        const sendData: DeletePaymentData = {
            paymentId: id.toString(),
        }
        const result = await fetchDataOld(apiPaths.selectPaymentMethod, 'PATCH', sendData);
        if ((result && result.responseData) && (!result.responseData.dtc)) {
            props.setPaymentsList(result.responseData);
        }
    }

    return (
        <div>
            <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={props.open}
                onClose={handleClose}
                slots={{backdrop: StyledBackdrop}}
            >
                <ModalContent sx={{width: 400}}>
                    {loading ? <CircularProgress/> :
                        <>
                            <h2 className='center'>{form[props.lang].paymentSetTitle}</h2>
                            <p>
                                <IconButton color="error" aria-label="delete" disabled>
                                    <HighlightOffIcon/>
                                </IconButton>
                                {form[props.lang].cash}
                                {isDefault ?
                                    <Tooltip className='TopBar_Right' title={form[props.lang].paymentSetDefault} arrow>
                                        <IconButton color="info" aria-label="setDefault" onClick={() => select(0)}>
                                            <CheckBoxOutlineBlankIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    :
                                    <IconButton className='TopBar_Right' color="info" aria-label="default">
                                        <CheckBoxIcon/>
                                    </IconButton>
                                }
                            </p>
                            {props.paymentsList.map((payment) => (
                                <p key={payment.id}>
                                    <Tooltip title={form[props.lang].paymentSetDelete} arrow>
                                        <IconButton color="error" aria-label="delete" onClick={() => erase(payment.id)}>
                                            <HighlightOffIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    {payment.method}
                                    {payment.default === true ?
                                        <IconButton className='TopBar_Right' color="info" aria-label="default">
                                            <CheckBoxIcon/>
                                        </IconButton>
                                        :
                                        <Tooltip className='TopBar_Right' title={form[props.lang].paymentSetDefault} arrow>
                                            <IconButton color="info" aria-label="setDefault" onClick={() => select(payment.id)}>
                                                <CheckBoxOutlineBlankIcon/>
                                            </IconButton>
                                        </Tooltip>
                                    }
                                </p>
                            ))}
                            <p className='center'>
                                    <TextField
                                        label={form[props.lang].newPaymentMethod}
                                        id='newPayment'
                                        InputLabelProps={{className: 'TextInput__Label'}}
                                        InputProps={{className: 'TextInput'}}
                                        type="text"
                                        value={newMethod}
                                        onChange={(e) => setNewMethod(e.target.value)}
                                        error={validation}
                                        size='small'
                                        autoComplete='off'
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                add().finally();
                                            }
                                            }
                                        }
                                    />
                                    <Tooltip title={form[props.lang].paymentSetAdd} arrow>
                                        <IconButton color="info" aria-label="add" onClick={add}>
                                            <AddCircleIcon />
                                        </IconButton>
                                    </Tooltip>
                            </p>
                        </>
                    }

                </ModalContent>
            </Modal>
        </div>
    );
}
