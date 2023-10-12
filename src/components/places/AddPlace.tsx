import React, {FormEvent, useState} from "react";
import {AddPlaceFormInterface, UserLangEnum} from 'types';
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
import {apiURL} from "../../config/api";
import {login} from "../../assets/txt/login";
import AddIcon from "@mui/icons-material/Add";
import {useAlert} from "../../hooks/useAlert";

interface Props {
    lang: UserLangEnum;
    userId: string;
}

export const AddPlace = (props: Props) => {

    const {setAlert} = useAlert();

    const [addPlaceForm, setAddPlaceForm] = useState<AddPlaceFormInterface>({
        userId: props.userId,
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
        mark: '',
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [addPlaceShow, setAddPlaceShow] = useState<boolean>(false);

    const updateForm = (key: string, value: string) => {
        setAddPlaceForm((addPlaceForm: AddPlaceFormInterface) => ({
            ...addPlaceForm,
            [key]: value,
        }));
    };

    const sendAddPlaceForm = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);

        await fetch(apiURL + '/places/create', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(addPlaceForm),
        }).then(async (res) => {
            const data = await res.json();
            if (res.ok) {
                setAddPlaceShow(false);
                setAlert(places[props.lang].addSuccess, 'success');
            } else {
                if (data.message === 'place name not specified') {
                    setAlert(places[props.lang].placeNameNotExist, 'warning');
                } else if (data.message === 'city not specified') {
                    setAlert(places[props.lang].placeCityNotExist, 'warning');
                } else if (data.message === 'country not specified') {
                    setAlert(places[props.lang].countryNotExist, 'warning');
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
                <div><PlaceStreetInput lang={props.lang} value={addPlaceForm.street}
                                       onChange={e => updateForm('street', e.target.value)}/></div>
                <br/>
                <div><PlacePostCodeInput lang={props.lang} value={addPlaceForm.code}
                                         onChange={e => updateForm('code', e.target.value)}/></div>
                <br/>
                <div><PlaceCityInput lang={props.lang} value={addPlaceForm.city}
                                     onChange={e => updateForm('city', e.target.value)}/></div>
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
                <div><OnOffSwitch label={places[props.lang].navigateSwitchLabel} value={addPlaceForm.mark}
                                  onChange={e => updateForm('mark', e)}/></div>
                <br/>
                <div><PlaceGps label={places[props.lang].lat} value={addPlaceForm.lat}
                                  onChange={e => updateForm('lat', e.target.value)}/></div>
                <br/>
                <div><PlaceGps label={places[props.lang].lon} value={addPlaceForm.lon}
                               onChange={e => updateForm('lon', e.target.value)}/></div>
                <br/>
                <SubmitButton text={places[props.lang].submit}/>
            </form>
        </fieldset>}</>
    )
};