import React, {Dispatch, FormEvent, SetStateAction, useState} from "react";
import { UserInterface, UpdateFormInterface, TourInterface } from "types";
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
    tourData: TourInterface | null;
}

export const ProfileSet = (props: Props) => {

    const {loading, fetchDataOld} = useApi();
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

        const result = await fetchDataOld(apiPaths.userUpdate, 'PATCH', data);
        handleApiResult(result, props.userData.lang, setAlert, () => {
            props.setUserData(result?.responseData);
            setAlert(login[result?.responseData.lang].saveApiSuccess, 'success');
        });
    }

    const areFieldsEqual = (data: UpdateFormInterface, userData: UserInterface): boolean => {
        return (
            data.firstName === userData.firstName &&
            data.lastName === userData.lastName &&
            data.lang.toString() === userData.lang.toString() &&
            data.companyId.toString() === userData.companyId.toString() &&
            data.customer === userData.customer &&
            data.bidType.toString() === userData.bidType.toString() &&
            data.bid.toString() === userData.bid.toString() &&
            data.currency === userData.currency &&
            data.fuelConsumptionType.toString() === userData.fuelConType.toString()
        );
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
                                       onChange={e => updateData('companyId', e)} fullWidth/>
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
                                     currencyDisable={props.tourData !== null}
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
                        <SubmitButton
                            text={login[props.userData.lang].save}
                            disabled={areFieldsEqual(data, props.userData)}
                        />
                    }
                </form>
            </fieldset>
    );
}