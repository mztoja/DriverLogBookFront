import React, {Dispatch, FormEvent, SetStateAction, useState} from "react";
import {loginFormInterface, UserInterface, UserLangEnum} from 'types';
import {login} from "../../data/txt/login";
import {apiURL} from "../../config/api";
import {GetUserData} from "../../hooks/GetUserData";
import {Button, CircularProgress, TextField} from "@mui/material";
import {useAlert} from "../../hooks/useAlert";
import SendIcon from "@mui/icons-material/Send";


interface Props {
    lang: UserLangEnum;
    setUserData?: Dispatch<SetStateAction<UserInterface | null>>;
}

export const LoginForm = (props: Props) => {

    const {setAlert} = useAlert();
    const txt = login[props.lang];

    const [loginForm, setLoginForm] = useState<loginFormInterface>({
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState<boolean>(false);

    const updateForm = (key: string, value: any) => {
        setLoginForm((loginForm: any) => ({
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

            <h2>{txt.welcome}</h2>

            <fieldset>
                <legend>{txt.login}</legend>
                <form onSubmit={sendLoginForm}>
                    <p>
                        <TextField
                            required
                            id="outlined-required"
                            label={txt.email}
                            InputLabelProps={{className: 'textfield__label'}}
                            InputProps={{className: 'textfield'}}
                            type="email"
                            value={loginForm.email}
                            onChange={e => updateForm('email', e.target.value)}
                        />
                    </p>
                    <p>
                        <TextField
                            required
                            id="outlined-passwprd-input"
                            label={txt.password}
                            InputLabelProps={{className: 'textfield__label'}}
                            InputProps={{className: 'textfield'}}
                            type="password"
                            autoComplete="current-password"
                            value={loginForm.password}
                            onChange={e => updateForm('password', e.target.value)}
                        />
                    </p>
                    <Button variant="contained" type="submit" endIcon={<SendIcon/>}>{txt.submit}</Button>
                </form>
            </fieldset>
        </div>
    )
};
