import React, {FormEvent, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {userLangEnum} from "types";
import {CircularProgress} from "@mui/material";
import {apiPaths} from "../../config/api";
import {login} from "../../assets/txt/login";
import {EmailInput} from "../common/form/profile/EmailInput";
import {PasswordInput} from "../common/form/profile/PasswordInput";
import {FirstNameInput} from "../common/form/profile/FirstNameInput";
import {LastNameInput} from '../common/form/profile/LastNameInput';
import {LanguageSelect} from "../common/form/profile/LanguageSelect";
import {SubmitButton} from "../common/form/SubmitButton";
import {PlaceNameInput} from "../common/form/place/PlaceNameInput";
import {PlaceStreetInput} from "../common/form/place/PlaceStreetInput";
import {PlacePostCodeInput} from "../common/form/place/PlacePostCodeInput";
import {PlaceCityInput} from "../common/form/place/PlaceCityInput";
import {CountrySelect} from "../common/form/CountrySelect";
import {DefaultCustomerInput} from "../common/form/profile/DefaultCustomerInput";
import {BidTypeSelect} from "../common/form/profile/BidTypeSelect";
import {AmountInput} from "../common/form/finance/AmountInput";
import {FuelConsuptionTypeSelect} from "../common/form/profile/FuelConsuptionTypeSelect";
import {useAlert} from "../../hooks/useAlert";
import {RegisterFormInterface} from "types";
import {SaveToLocalStorage} from "../../hooks/LocalStorageHook";
import {useApi} from "../../hooks/useApi";
import {handleApiResult} from "../../utils/handleApiResult";

interface Props {
    lang: userLangEnum;
}

export const RegisterForm = (props: Props) => {

    const navigate = useNavigate();
    const {setAlert} = useAlert();
    const {loading, fetchDataOld} = useApi();

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
        bid: '',
        currency: '',
        fuelConsumptionType: '',
    });

    const updateForm = (key: string, value: string) => {
        setRegisterForm((form: RegisterFormInterface) => ({
            ...form,
            [key]: value,
        }));
    };

    const sendForm = async (e: FormEvent) => {
        e.preventDefault();

        const result = await fetchDataOld(apiPaths.register, 'POST', registerForm);
        handleApiResult(result, props.lang, setAlert, () => {
            SaveToLocalStorage('alertSuccess', login[props.lang].registerSuccess);
            setAlert(login[props.lang].registerSuccess, 'success');
            navigate("/login");
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
                                   onChange={e => updateForm('password', e.target.value)} helper/>
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
                        <PlaceNameInput lang={props.lang} value={registerForm.companyName}
                                        onChange={e => updateForm('companyName', e.target.value)}/>
                    </div>
                    <br/>
                    <div>
                        <PlaceStreetInput lang={props.lang} value={registerForm.companyStreet}
                                          onChange={e => updateForm('companyStreet', e.target.value)}/>
                    </div>
                    <br/>
                    <div>
                        <PlacePostCodeInput lang={props.lang} value={registerForm.companyPostCode}
                                            onChange={e => updateForm('companyPostCode', e.target.value)}/>
                    </div>
                    <br/>
                    <div>
                        <PlaceCityInput lang={props.lang} value={registerForm.companyCity}
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
                                 valueAmount={registerForm.bid}
                                 valueCurrency={registerForm.currency}
                                 onChangeAmount={e => updateForm('bid', e)}
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