import React, {Dispatch, FormEvent, SetStateAction, useEffect, useState} from "react";
import {LoginFormInterface, UserInterface, userLangEnum} from 'types';
import {login} from "../../assets/txt/login";
import {apiPaths} from "../../config/api";
import {CircularProgress} from "@mui/material";
import {useAlert} from "../../hooks/useAlert";
import {EmailInput} from "../common/form/EmailInput";
import {PasswordInput} from "../common/form/PasswordInput";
import {SubmitButton} from "../common/form/SubmitButton";
import {useLocation} from "react-router-dom";
import {DeleteFromLocalStorage, DownloadFromLocalStorage} from "../../hooks/LocalStorageHook";
import {useApi} from "../../hooks/useApi";
import {handleApiResult} from "../../utils/handleApiResult";

interface Props {
    lang: userLangEnum;
    setUserData?: Dispatch<SetStateAction<UserInterface | null>>;
}

export const LoginForm = (props: Props) => {

    const {setAlert} = useAlert();
    const location = useLocation();
    const {loading, fetchData} = useApi();

    // show alert after register success
    useEffect(() => {
        const alertSuccess = DownloadFromLocalStorage('alertSuccess');
        if (alertSuccess != null) {
            setAlert(alertSuccess, 'success');
            DeleteFromLocalStorage('alertSuccess');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    const txt = login[props.lang];

    const [loginForm, setLoginForm] = useState<LoginFormInterface>({
        email: '',
        password: '',
    });

    const updateForm = (key: string, value: string) => {
        setLoginForm((loginForm: LoginFormInterface) => ({
            ...loginForm,
            [key]: value,
        }));
    };

    const sendLoginForm = async (e: FormEvent) => {
        e.preventDefault();

        const result = await fetchData(apiPaths.login, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: "include",
            body: JSON.stringify(loginForm),
        });
        handleApiResult(result, props.lang, setAlert, () => {
            props.setUserData && props.setUserData(result?.data);
        });
    }

    if (loading) {
        return <CircularProgress/>
    }

    return (<div id="Login">

            <fieldset>
                <legend>{txt.login}</legend>

                <form onSubmit={sendLoginForm}>
                    <div>
                        <EmailInput lang={props.lang} value={loginForm.email}
                                    onChange={e => updateForm('email', e.target.value)}/>
                    </div>
                    <br/>
                    <div>
                        <PasswordInput lang={props.lang} value={loginForm.password}
                                       onChange={e => updateForm('password', e.target.value)}/>
                    </div>
                    <br/>
                    <SubmitButton text={txt.submit}/>
                </form>
            </fieldset>
        </div>
    )
}