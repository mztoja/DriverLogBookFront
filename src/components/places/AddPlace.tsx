import React, {Dispatch, FormEvent, SetStateAction, useState} from "react";
import {AddPlaceFormInterface, userLangEnum} from 'types';
import {CircularProgress, Fab} from "@mui/material";
import {SubmitButton} from "../common/form/SubmitButton";
import {places} from "../../assets/txt/places";
import {OnOffSwitch} from "../common/form/OnOffSwitch";
import {PlaceNameInput} from "../common/form/place/PlaceNameInput";
import {PlaceStreetInput} from "../common/form/place/PlaceStreetInput";
import {PlacePostCodeInput} from "../common/form/place/PlacePostCodeInput";
import {PlaceCityInput} from "../common/form/place/PlaceCityInput";
import {CountrySelect} from "../common/form/CountrySelect";
import {PlaceTypeSelect} from "../common/form/place/PlaceTypeSelect";
import {TextArea} from "../common/form/TextArea";
import {PlaceGps} from "../common/form/place/PlaceGps";
import {login} from "../../assets/txt/login";
import AddIcon from "@mui/icons-material/Add";
import {useAlert} from "../../hooks/useAlert";
import {useApi} from '../../hooks/useApi';
import {apiPaths} from "../../config/api";
import {commons} from "../../assets/txt/commons";

interface Props {
    lang: userLangEnum;
    userId: string;
    setRefresh: Dispatch<SetStateAction<boolean>>;
}

export const AddPlace = (props: Props) => {

    const {setAlert} = useAlert();
    const { loading, fetchData } = useApi();
    const [addPlaceShow, setAddPlaceShow] = useState<boolean>(false);

    const [addPlaceForm, setAddPlaceForm] = useState<AddPlaceFormInterface>({
        isFavorite: '0',
        type: '',
        name: '',
        street: '',
        code: '',
        city: '',
        country: '',
        lat: '',
        lon: '',
        description: '',
        isMarked: '0',
    });

    const updateForm = (key: string, value: string) => {
        setAddPlaceForm((addPlaceForm: AddPlaceFormInterface) => ({
            ...addPlaceForm,
            [key]: value,
        }));
    };

    const sendAddPlaceForm = async (e: FormEvent) => {
        e.preventDefault();

        const result = await fetchData(apiPaths.createPlace, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(addPlaceForm),
                credentials: "include",
            });
        console.log(result);
        if (result && !result.success) {
            setAlert(commons[props.lang].apiConnectionError, 'error');
        } else {
            if (result && result.data) {
                if (!result.data.dtc) {
                        setAddPlaceShow(false);
                        props.setRefresh((prev) => !prev);
                        setAlert(places[props.lang].addSuccess, 'success');
                } else {
                    if (result.data.dtc === 'country') {
                        setAlert(login[props.lang].registerCountryNotExist, 'warning');
                    } else if (result.data.dtc === 'name') {
                        setAlert(login[props.lang].registerCompanyNameNotExist, 'warning');
                    } else if (result.data.dtc === 'city') {
                        setAlert(login[props.lang].registerCompanyCityNotExist, 'warning');
                    } else {
                        setAlert(commons[props.lang].apiUnknownError, 'error');
                    }
                }
            }
        }
    };

    if (loading) {
        return <CircularProgress/>
    }

    return (
        <><div><Fab  onClick={() => setAddPlaceShow(!addPlaceShow)} color="primary" aria-label="add"><AddIcon /></Fab></div><br/>
        {addPlaceShow &&
        <fieldset>
            <legend>{places[props.lang].addPlace}</legend>

            <form onSubmit={sendAddPlaceForm}>

                <div><PlaceTypeSelect lang={props.lang} value={addPlaceForm.type}
                                      onChange={e => updateForm('type', e)}/></div>
                <br/>
                <div><PlaceNameInput lang={props.lang} value={addPlaceForm.name}
                                     onChange={e => updateForm('name', e.target.value)}/></div>
                <br/>
                <div className="DivInline"><PlaceStreetInput lang={props.lang} value={addPlaceForm.street}
                                       onChange={e => updateForm('street', e.target.value)}/></div>

                <div className="DivInline"><PlacePostCodeInput lang={props.lang} value={addPlaceForm.code}
                                         onChange={e => updateForm('code', e.target.value)}/></div>

                <div className="DivInline"><PlaceCityInput lang={props.lang} value={addPlaceForm.city}
                                     onChange={e => updateForm('city', e.target.value)}/></div>
                <div className="DivClear"/>
                <br/>
                <div><CountrySelect lang={props.lang} value={addPlaceForm.country}
                                    onChange={e => updateForm('country', e)}/></div>
                <br/>
                <div><TextArea label={places[props.lang].description} value={addPlaceForm.description}
                               onChange={e => updateForm('description', e.target.value)}/></div>
                <br/>
                <div><OnOffSwitch label={places[props.lang].isFavoriteSwitchLabel} value={addPlaceForm.isFavorite}
                                  onChange={e => updateForm('isFavorite', e)}/></div>
                <br/>
                <div><OnOffSwitch label={places[props.lang].navigateSwitchLabel} value={addPlaceForm.isMarked}
                                  onChange={e => updateForm('isMarked', e)}/></div>
                <br/>
                <div className="DivInline"><PlaceGps label={places[props.lang].lat} value={addPlaceForm.lat}
                                  onChange={e => updateForm('lat', e.target.value)}/></div>

                <div className="DivInline"><PlaceGps label={places[props.lang].lon} value={addPlaceForm.lon}
                               onChange={e => updateForm('lon', e.target.value)}/></div>
                <div className="DivClear"/>
                <br/>
                <SubmitButton text={places[props.lang].submit}/>
            </form>
        </fieldset>}</>
    )
};