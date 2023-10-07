import React, {Dispatch, FormEvent, SetStateAction, useState} from "react";
import {loginFormInterface, UserInterface, UserLangEnum} from 'types';
import {login} from "../../assets/txt/login";
import {apiURL} from "../../config/api";
import {GetUserData} from "../../hooks/GetUserData";
import {
    Button,
    CircularProgress, FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField
} from "@mui/material";
import {useAlert} from "../../hooks/useAlert";
import SendIcon from "@mui/icons-material/Send";
import {Visibility, VisibilityOff} from "@mui/icons-material";


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
    const [emailValidation, setEmailValidation] = useState<boolean>(false);

    const updateForm = (key: string, value: any) => {
        setLoginForm((loginForm: any) => ({
            ...loginForm,
            [key]: value,
        }));
        const regexp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/);
        if (regexp.test(loginForm.email)) {
            setEmailValidation(false);
        } else {
            setEmailValidation(true);
        }
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

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    if (loading) {
        return <CircularProgress/>
    }


    return (<div id="Login">

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
                            error={emailValidation}
                        />
                    </p>
                    <p>
                        <TextField
                            required
                            id="outlined-passwprd-input"
                            label={txt.password}
                            InputLabelProps={{className: 'textfield__label'}}
                            InputProps={{className: 'textfield'}}
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            value={loginForm.password}
                            onChange={e => updateForm('password', e.target.value)}
                        />
                    </p>

                    <p>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                        </FormControl>
                    </p>
                    <Button variant="contained" type="submit" endIcon={<SendIcon/>}>{txt.submit}</Button>
                </form>
            </fieldset>
        </div>
    )
};
