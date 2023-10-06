import React, {Dispatch, FormEvent, SetStateAction, useState} from "react";
import {loginFormInterface, UserInterface, UserLangEnum} from 'types';
import {Spinner} from "../common/Spinner/Spinner";
import {Btn} from "../common/Btn";
import {login} from "../../data/txt/login";
import {apiURL} from "../../config/api";
import {GetUserData} from "../../hooks/GetUserData";


interface Props {
    lang: UserLangEnum;
    setUserData?: Dispatch<SetStateAction<UserInterface | null>>;
}

export const LoginForm = (props: Props) => {

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
        try {
            await fetch(apiURL+'/authentication/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: "include",
                body: JSON.stringify(loginForm),
            });

            GetUserData().then(data => {
                if (data !== undefined) {
                    if ((props.setUserData !== undefined)){
                        props.setUserData(data);}
                }
            });

        } finally {
            setLoading(false);
        }
    };

    const txt = login[props.lang];

    if (loading) {
        return <Spinner/>
    }


    return (<div id="Login">

            <h2>{txt.welcome}</h2>

            <fieldset>
                <legend>{txt.login}</legend>
                <form onSubmit={sendLoginForm}>
                    <p>
                        <label>
                            {txt.email}:<br/>
                            <input
                                type="email"
                                value={loginForm.email}
                                onChange={e => updateForm('email', e.target.value)}
                                required
                            />
                        </label>
                    </p>
                    <p>
                        <label>
                            {txt.password}:<br/>
                            <input
                                type="password"
                                value={loginForm.password}
                                onChange={e => updateForm('password', e.target.value)}
                                required
                            />
                        </label>
                    </p>
                    <Btn text={txt.submit}/>
                </form>
            </fieldset>
        </div>
    )
};
