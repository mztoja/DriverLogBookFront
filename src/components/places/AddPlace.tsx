import React, {Dispatch, FormEvent, SetStateAction, useState} from "react";
import {AppMainElementsTypes} from "../../types/AppMainElementsTypes";
import {AddPlaceFormInterface, UserInterface, UserLangEnum} from 'types';
import {CircularProgress} from "@mui/material";
import {EmailInput} from "../common/form/EmailInput";
import {PasswordInput} from "../common/form/PasswordInput";
import {SubmitButton} from "../common/form/SubmitButton";
import {places} from "../../assets/txt/places";
import {apiURL} from "../../config/api";
import {GetUserData} from "../../hooks/GetUserData";
import {CompanyIsFavoriteSwitch} from "../common/form/CompanyIsFavoriteSwitch";

interface Props {
    lang: UserLangEnum;
    setUserData?: Dispatch<SetStateAction<UserInterface | null>>;
}

export const AddPlace = (props: Props) => {

    const [addPlaceForm, setAddPlaceForm] = useState<AddPlaceFormInterface>({
        isFavorite: '',
        type: '',
        name: '',
        street: '',
        code: '',
        city: '',
        country: '',
        lat: '',
        lon: '',
        description: '',
    });

    const [loading, setLoading] = useState<boolean>(false);

    const updateForm = (key: string, value: string) => {
        setAddPlaceForm((addPlaceForm: AddPlaceFormInterface) => ({
            ...addPlaceForm,
            [key]: value,
        }));
        console.log(JSON.stringify(addPlaceForm.isFavorite));
    };

    const sendAddPlaceForm = async (e: FormEvent) => {
        e.preventDefault();

    };

    if (loading) {
        return <CircularProgress/>
    }


    return (
        <fieldset>
            <legend>{places[props.lang].addPlace}</legend>

            <form onSubmit={sendAddPlaceForm}>
                <div>
                    <CompanyIsFavoriteSwitch lang={props.lang} value={addPlaceForm.isFavorite}
                                             onChange={e => updateForm('isFavorite', e)}/>
                </div>
                <SubmitButton text={places[props.lang].submit}/>
            </form>
        </fieldset>
    )
};