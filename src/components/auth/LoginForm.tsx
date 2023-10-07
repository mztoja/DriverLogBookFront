import React, {Dispatch, FormEvent, SetStateAction, useState} from "react";
import {LoginFormInterface, UserInterface, UserLangEnum} from 'types';
import {login} from "../../assets/txt/login";
import {apiURL} from "../../config/api";
import {GetUserData} from "../../hooks/GetUserData";
import {CircularProgress} from "@mui/material";
import {useAlert} from "../../hooks/useAlert";
import {EmailInput} from "../common/form/EmailInput";
import {PasswordInput} from "../common/form/PasswordInput";
import {SubmitButton} from "../common/form/SubmitButton";

interface Props {
    lang: UserLangEnum;
    setUserData?: Dispatch<SetStateAction<UserInterface | null>>;
}

export const LoginForm = (props: Props) => {

    const {setAlert} = useAlert();
    const txt = login[props.lang];

    const [loginForm, setLoginForm] = useState<LoginFormInterface>({
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState<boolean>(false);

    const updateForm = (key: string, value: string) => {
        setLoginForm((loginForm: LoginFormInterface) => ({
            ...loginForm,
            [key]: value,
        }));
    };

    const sendLoginForm = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        await fetch(apiURL + '/authentication/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: "include",
            body: JSON.stringify(loginForm),
        })
            .then((res) => {
                if (res.ok) {
                    GetUserData()
                        .then(data => {
                            if (data !== undefined) {
                                if ((props.setUserData !== undefined)) {
                                    props.setUserData(data);
                                }
                            }
                        })
                } else {
                    setAlert(txt.responseError, 'warning');
                }
            })
            .catch(() => {
                setAlert(txt.connectionError, 'error');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    if (loading) {
        return <CircularProgress/>
    }

    return (<div id="Login">

            <fieldset>
                <legend>{txt.login}</legend>

                <form onSubmit={sendLoginForm}>
                    <p>
                        <EmailInput lang={props.lang} value={loginForm.email}
                                    onChange={e => updateForm('email', e.target.value)}/>
                    </p>
                    <p>
                        <PasswordInput lang={props.lang} value={loginForm.password}
                                       onChange={e => updateForm('password', e.target.value)}/>
                    </p>
                    <SubmitButton text={txt.submit}/>
                </form>
            </fieldset>
        </div>
    )
};
