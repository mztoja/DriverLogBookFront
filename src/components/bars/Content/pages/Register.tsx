import React, {FormEvent, useState} from "react";
import './Register.css';
import {login} from "../../../../data/txt/login";
import {Btn} from "../../../common/Btn";
import {useNavigate} from 'react-router-dom';
import { UserLangEnum } from "types";
import {apiURL} from "../../../../config/api";
import {CircularProgress} from "@mui/material";

interface Props {
    lang: UserLangEnum;
}

export const Register = (props:Props) => {

    const navigate = useNavigate();

    const [form, setForm] = useState<any>({
        name: '',
        email: '',
        password: '',
        lang: 'pl',
    });

    const [loading, setLoading] = useState<boolean>(false);

    const updateForm = (key: string, value: any) => {
        setForm((form: any) => ({
            ...form,
            [key]: value,
        }));
    };

    const sendForm = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {

            const res = await fetch(apiURL+'/authentication/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(form),
            });
            const content = await res.json();
            if (form.email === content.email) {
                navigate("/login");
            }
        } finally {
            setLoading(false);
        }
    };

    const txt = login[props.lang];

    if (loading) {
        return <CircularProgress />
    }




    return <div id="Register">

        <h2>{txt.welcome}</h2>



        <fieldset>
            <legend>{txt.register}</legend>
            <form onSubmit={sendForm}>
                <p>
                    <label>
                        {txt.name}:<br/>
                        <input
                            type="text"
                            value={form.name}
                            onChange={e => updateForm('name', e.target.value)}
                            required
                        />
                    </label>
                </p>
                <p>
                    <label>
                        {txt.email}:<br/>
                        <input
                            type="email"
                            value={form.email}
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
                            value={form.password}
                            onChange={e => updateForm('password', e.target.value)}
                            required
                        />
                    </label>
                </p>
                <p>
                    <label>
                        {txt.lang}:<br/>
                        <input
                            type="text"
                            value={form.lang}
                            onChange={e => updateForm('lang', e.target.value)}
                            required
                        />
                    </label>
                </p>
                <Btn text={txt.registerSubmit}/>
            </form>
        </fieldset>
    </div>
}