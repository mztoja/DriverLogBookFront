import React, {FormEvent, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {UserLangEnum} from "types";
import {CircularProgress} from "@mui/material";
import {apiURL} from "../../config/api";
import {login} from "../../assets/txt/login";
import {EmailInput} from "../common/form/EmailInput";
import {PasswordInput} from "../common/form/PasswordInput";
import {FirstNameInput} from "../common/form/FirstNameInput";
import {LastNameInput} from '../common/form/LastNameInput';
import {LanguageSelect} from "../common/form/LanguageSelect";
import {SubmitButton} from "../common/form/SubmitButton";
import {CompanyNameInput} from "../common/form/CompanyNameInput";
import {CompanyStreetInput} from "../common/form/CompanyStreetInput";
import {CompanyPostCodeInput} from "../common/form/CompanyPostCodeInput";
import {CompanyCityInput} from "../common/form/CompanyCityInput";
import {CountrySelect} from "../common/form/CountrySelect";
import {DefaultCustomerInput} from "../common/form/DefaultCustomerInput";
import {BidTypeSelect} from "../common/form/BidTypeSelect";
import {AmountInput} from "../common/form/AmountInput";
import {FuelConsuptionTypeSelect} from "../common/form/FuelConsuptionTypeSelect";
import {useAlert} from "../../hooks/useAlert";
import {RegisterFormInterface} from "types";
import {SaveToLocalStorage} from "../../hooks/LocalStorageHook";

interface Props {
    lang: UserLangEnum;
}

export const RegisterForm = (props: Props) => {

    const navigate = useNavigate();
    const {setAlert} = useAlert();

    const [registerForm, setRegisterForm] = useState<RegisterFormInterface>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        lang: '',
        companyName: '',
        companyStreet: '',
        companyPostCode: '',
        companyCity: '',
        country: '',
        defaultCustomer: '',
        bidType: '',
        amount: '',
        currency: '',
        fuelConsumptionType: '',
    });

    const [loading, setLoading] = useState<boolean>(false);

    const updateForm = (key: string, value: string) => {
        setRegisterForm((form: RegisterFormInterface) => ({
            ...form,
            [key]: value,
        }));
    };

    const sendForm = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);

        await fetch(apiURL + '/authentication/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(registerForm),
        }).then(async (res) => {
            const data = await res.json();
            console.log(res);
            console.log(data);
            if (res.ok) {
                SaveToLocalStorage('alertSuccess', login[props.lang].registerSuccess);
                setAlert(login[props.lang].registerSuccess, 'success');
                navigate("/login");
            } else {
                if (data.message === 'invalid email') {
                    setAlert(login[props.lang].registerResInvEmail, 'warning');
                } else if (data.message === 'invalid password') {
                    setAlert(login[props.lang].registerResInvPassword, 'warning');
                } else if (data.message === 'email exist') {
                    setAlert(login[props.lang].registerResEmailExist, 'info');
                } else if (data.message === 'company name not specified') {
                    setAlert(login[props.lang].registerCompanyNameNotExist, 'warning');
                } else if (data.message === 'city not specified') {
                    setAlert(login[props.lang].registerCompanyCityNotExist, 'warning');
                } else if (data.message === 'country not specified') {
                    setAlert(login[props.lang].registerCountryNotExist, 'warning');
                } else {
                    setAlert(login[props.lang].dbConnectionError, 'error');
                }
            }

        }).catch(() => {
            setAlert(login[props.lang].connectionError, 'error');
        }).finally(() => {
            setLoading(false);
        });
    };

    if (loading) {
        return <CircularProgress/>
    }

    return <div id="Register">

        <h2>{login[props.lang].welcome}</h2>

        <fieldset>
            <legend>{login[props.lang].register}</legend>
            <form onSubmit={sendForm}>
                <div>
                    <EmailInput lang={props.lang} value={registerForm.email}
                                onChange={e => updateForm('email', e.target.value)}/>
                </div>
                <br/>
                <div>
                    <PasswordInput lang={props.lang} value={registerForm.password}
                                   onChange={e => updateForm('password', e.target.value)}/>
                </div>
                <br/>
                <div>
                    <LanguageSelect lang={props.lang} value={registerForm.lang}
                                    onChange={e => updateForm('lang', e)}/>
                </div>
                <br/>
                <fieldset className="maxWidth">
                    <legend>{login[props.lang].companyData}</legend>

                    {login[props.lang].companyInfo}<br/><br/>

                    <div>
                        <CompanyNameInput lang={props.lang} value={registerForm.companyName}
                                          onChange={e => updateForm('companyName', e.target.value)}/>
                    </div>
                    <br/>
                    <div>
                        <CompanyStreetInput lang={props.lang} value={registerForm.companyStreet}
                                            onChange={e => updateForm('companyStreet', e.target.value)}/>
                    </div>
                    <br/>
                    <div>
                        <CompanyPostCodeInput lang={props.lang} value={registerForm.companyPostCode}
                                              onChange={e => updateForm('companyPostCode', e.target.value)}/>
                    </div>
                    <br/>
                    <div>
                        <CompanyCityInput lang={props.lang} value={registerForm.companyCity}
                                          onChange={e => updateForm('companyCity', e.target.value)}/>
                    </div>
                    <br/>
                    <div>
                        <CountrySelect lang={props.lang} value={registerForm.country}
                                       onChange={e => updateForm('country', e)}/>
                    </div>
                </fieldset>
                <br/>
                <br/>
                <div>
                    {login[props.lang].belowReqDesc}
                </div>
                <br/>
                <div>
                    <FirstNameInput lang={props.lang} value={registerForm.firstName}
                                    onChange={e => updateForm('firstName', e.target.value)}/>
                </div>
                <br/>
                <div>
                    <LastNameInput lang={props.lang} value={registerForm.lastName}
                                   onChange={e => updateForm('lastName', e.target.value)}/>
                </div>
                <br/>
                <div>
                    <DefaultCustomerInput lang={props.lang} value={registerForm.defaultCustomer}
                                          onChange={e => updateForm('defaultCustomer', e.target.value)}/>
                </div>
                <br/>
                <div>
                    <BidTypeSelect lang={props.lang} value={registerForm.bidType}
                                   onChange={e => updateForm('bidType', e)}/>
                </div>
                <br/>
                <div>
                    <AmountInput lang={props.lang}
                                 valueAmount={registerForm.amount}
                                 valueCurrency={registerForm.currency}
                                 onChangeAmount={e => updateForm('amount', e.target.value)}
                                 onChangeCurrency={e => updateForm('currency', e)}
                                 nameId='bid'
                    />
                </div>
                <br/>
                <div>
                    <FuelConsuptionTypeSelect lang={props.lang} value={registerForm.fuelConsumptionType}
                                              onChange={e => updateForm('fuelConsumptionType', e)}/>
                </div>
                <br/>
                <SubmitButton text={login[props.lang].registerSubmit}/>
            </form>
        </fieldset>
    </div>
}