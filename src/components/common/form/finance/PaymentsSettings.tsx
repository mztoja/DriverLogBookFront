import * as React from 'react';
import clsx from 'clsx';
import {styled, css} from '@mui/system';
import {Modal as BaseModal} from '@mui/base/Modal';
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
    const {loading, fetchData} = useApi();

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
        //e.preventDefault();
        const sendData: AddPaymentData = {
            paymentMethod: newMethod,
        }
        const find = props.paymentsList.find((payment) => (payment.method === newMethod));
        if (!find) {
            const result = await fetchData(apiPaths.addPaymentMethod, {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                credentials: "include",
                body: JSON.stringify(sendData),
            });
            if ((result && result.data) && (!result.data.dtc)) {
                props.setPaymentsList(result.data);
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
        const result = await fetchData(apiPaths.deletePaymentMethod, {
            headers: {'Content-Type': 'application/json'},
            method: 'DELETE',
            credentials: "include",
            body: JSON.stringify(sendData),
        });
        if ((result && result.data) && (!result.data.dtc)) {
            props.setPaymentsList(result.data);
        }
    }

    const select = async (id: number) => {
        const sendData: DeletePaymentData = {
            paymentId: id.toString(),
        }
        const result = await fetchData(apiPaths.selectPaymentMethod, {
            headers: {'Content-Type': 'application/json'},
            method: 'PATCH',
            credentials: "include",
            body: JSON.stringify(sendData),
        });
        if ((result && result.data) && (!result.data.dtc)) {
            props.setPaymentsList(result.data);
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