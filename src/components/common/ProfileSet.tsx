import React, {Dispatch, FormEvent, SetStateAction, useState} from "react";
import { UserInterface, UpdateFormInterface } from "types";
import {login} from "../../assets/txt/login";
import {LanguageSelect} from "./form/profile/LanguageSelect";
import {FirstNameInput} from "./form/profile/FirstNameInput";
import {LastNameInput} from "./form/profile/LastNameInput";
import {DefaultCustomerInput} from "./form/profile/DefaultCustomerInput";
import {BidTypeSelect} from "./form/profile/BidTypeSelect";
import {AmountInput} from "./form/finance/AmountInput";
import {FuelConsuptionTypeSelect} from "./form/profile/FuelConsuptionTypeSelect";
import {SubmitButton} from "./form/SubmitButton";
import {form} from "../../assets/txt/form";
import {CompanySelect} from "./form/place/CompanySelect";
import {apiPaths} from "../../config/api";
import {useApi} from "../../hooks/useApi";
import {useAlert} from "../../hooks/useAlert";
import {CircularProgress} from "@mui/material";
import {handleApiResult} from "../../utils/handleApiResult";

interface Props {
    userData: UserInterface;
    setUserData: Dispatch<SetStateAction<UserInterface | null>>;
}

export const ProfileSet = (props: Props) => {

    const {loading, fetchData} = useApi();
    const {setAlert} = useAlert();

    const [data, setData] = useState<UpdateFormInterface>({
        firstName: props.userData.firstName,
        lastName: props.userData.lastName,
        lang: props.userData.lang.toString(),
        companyId: props.userData.companyId.toString(),
        customer: props.userData.customer,
        bidType: props.userData.bidType.toString(),
        bid: props.userData.bid.toString(),
        currency: props.userData.currency,
        fuelConsumptionType: props.userData.fuelConType.toString(),
    });

    const updateData = (key: string, value: string) => {
        setData((form: UpdateFormInterface) => ({
            ...form,
            [key]: value,
        }));
    };

    const sendForm = async (e: FormEvent) => {
        e.preventDefault();

        const result = await fetchData(apiPaths.userUpdate, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
            credentials: "include",
        });
        handleApiResult(result, props.userData.lang, setAlert, () => {
            props.setUserData(result?.data);
            setAlert(login[result?.data.lang].saveApiSuccess, 'success');
        });
    }

    return (
            <fieldset>
                <legend>{login[props.userData.lang].profile}</legend>
                <form onSubmit={sendForm}>
                    <div>
                        {form[props.userData.lang].email}<br/>
                        {props.userData.email}
                    </div>
                    <br/>
                    <div>
                        <LanguageSelect lang={props.userData.lang} value={data.lang}
                                        onChange={e => updateData('lang', e)}/>
                    </div>
                    <br/>
                    <div>
                        <FirstNameInput lang={props.userData.lang} value={data.firstName}
                                        onChange={e => updateData('firstName', e.target.value)}/>
                    </div>
                    <br/>
                    <div>
                        <LastNameInput lang={props.userData.lang} value={data.lastName}
                                       onChange={e => updateData('lastName', e.target.value)}/>
                    </div>
                    <br/>
                    <div>
                        <CompanySelect lang={props.userData.lang} value={data.companyId}
                                       onChange={e => updateData('companyId', e)}/>
                    </div>
                    <br/>
                    <div>
                        <DefaultCustomerInput lang={props.userData.lang} value={data.customer}
                                              onChange={e => updateData('customer', e.target.value)}/>
                    </div>
                    <br/>
                    <div>
                        <BidTypeSelect lang={props.userData.lang} value={data.bidType}
                                       onChange={e => updateData('bidType', e)}/>
                    </div>
                    <br/>
                    <div>
                        <AmountInput lang={props.userData.lang}
                                     valueAmount={data.bid}
                                     valueCurrency={data.currency}
                                     onChangeAmount={e => updateData('bid', e)}
                                     onChangeCurrency={e => updateData('currency', e)}
                                     nameId='bid'
                        />
                    </div>
                    <br/>
                    <div>
                        <FuelConsuptionTypeSelect lang={props.userData.lang} value={data.fuelConsumptionType}
                                                  onChange={e => updateData('fuelConsumptionType', e)}/>
                    </div>
                    <br/>
                    {loading ?
                        <CircularProgress/> :
                        <SubmitButton text={login[props.userData.lang].save}/>
                    }
                </form>
            </fieldset>
    );
}