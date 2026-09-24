import React, {Dispatch, FormEvent, SetStateAction, useState} from "react";
import {userLangEnum} from 'types';
import {CircularProgress, TextField} from "@mui/material";
import {SubmitButton} from "../common/form/SubmitButton";
import {login} from "../../assets/txt/login";
import {EmailInput} from "../common/form/profile/EmailInput";
import {PasswordInput} from "../common/form/profile/PasswordInput";
import {useAlert} from "../../hooks/useAlert";
import {useApi} from '../../hooks/useApi';
import {apiPaths} from "../../config/api";
import {handleApiResult} from "../../utils/handleApiResult";
import {Modal, ModalContent, StyledBackdrop} from "../common/Modal";

interface Props {
    lang: userLangEnum;
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
}

type Step = 'email' | 'code' | 'password' | 'done';

export const ForgotPassword = (props: Props) => {

    const {setAlert} = useAlert();
    const {loading, fetchDataOld} = useApi();

    const [step, setStep] = useState<Step>('email');
    const [email, setEmail] = useState<string>('');
    const [code, setCode] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleClose = () => {
        props.setShow(false);
        // reset dopiero po zamknięciu (nie w trakcie animacji) — użytkownik czasem otwiera to
        // ponownie po pomyłce i nie ma sensu kazać mu wpisywać e-maila od nowa co kliknięcie
        setStep('email');
        setEmail('');
        setCode('');
        setPassword('');
    };

    const sendEmail = async (e: FormEvent) => {
        e.preventDefault();
        const result = await fetchDataOld(apiPaths.forgotPassword, 'POST', {email});
        handleApiResult(result, props.lang, setAlert, () => {
            setAlert(login[props.lang].forgotPasswordSent, 'success');
            setStep('code');
        });
    };

    const sendCode = async (e: FormEvent) => {
        e.preventDefault();
        const result = await fetchDataOld(apiPaths.verifyResetCode, 'POST', {email, code});
        handleApiResult(result, props.lang, setAlert, () => {
            setStep('password');
        });
    };

    const sendNewPassword = async (e: FormEvent) => {
        e.preventDefault();
        const result = await fetchDataOld(apiPaths.resetPassword, 'POST', {email, code, password});
        handleApiResult(result, props.lang, setAlert, () => {
            setAlert(login[props.lang].resetPasswordSuccess, 'success');
            handleClose();
        });
    };

    return (
        <Modal
            aria-labelledby="forgot-password-title"
            aria-describedby="forgot-password-description"
            open={props.show}
            onClose={handleClose}
            slots={{backdrop: StyledBackdrop}}
        >
            <ModalContent sx={{width: 400}}>
                <center>
                    <h2 onClick={handleClose}>{login[props.lang].forgotPasswordTitle}</h2>

                    {step === 'email' &&
                        <form onSubmit={sendEmail}>
                            <p>{login[props.lang].forgotPasswordEmailInfo}</p>
                            <div><EmailInput lang={props.lang} value={email}
                                             onChange={e => setEmail(e.target.value)}/></div>
                            <br/>
                            {loading
                                ? <CircularProgress/>
                                : <SubmitButton text={login[props.lang].forgotPasswordSubmit}/>
                            }
                        </form>
                    }

                    {step === 'code' &&
                        <form onSubmit={sendCode}>
                            <p>{login[props.lang].forgotPasswordSent}</p>
                            <div>
                                <TextField
                                    label={login[props.lang].resetCodeLabel}
                                    InputLabelProps={{className: 'TextInput__Label'}}
                                    InputProps={{className: 'TextInput'}}
                                    type="text"
                                    value={code}
                                    onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    autoComplete='off'
                                    size='small'
                                />
                            </div>
                            <br/>
                            {loading
                                ? <CircularProgress/>
                                : <SubmitButton text={login[props.lang].resetCodeSubmit} disabled={code.length !== 6}/>
                            }
                        </form>
                    }

                    {step === 'password' &&
                        <form onSubmit={sendNewPassword}>
                            <p>{login[props.lang].resetPasswordInfo}</p>
                            <div>
                                <PasswordInput lang={props.lang} value={password} helper
                                               onChange={e => setPassword(e.target.value)}/>
                            </div>
                            <br/>
                            {loading
                                ? <CircularProgress/>
                                : <SubmitButton text={login[props.lang].resetPasswordSubmit}/>
                            }
                        </form>
                    }
                </center>
            </ModalContent>
        </Modal>
    );
};
