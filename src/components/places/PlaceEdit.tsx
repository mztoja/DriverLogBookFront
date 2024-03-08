import React, {Dispatch, FormEvent, SetStateAction, useState} from "react";
import {EditPlaceFormInterface, userLangEnum, PlaceInterface, placeTypeEnum } from "types";
import {SetAlertType} from "../../context/AlertContext";
import {useApi} from "../../hooks/useApi";
import {apiPaths} from "../../config/api";
import {handleApiResult} from "../../utils/handleApiResult";
import {TextArea} from "../common/form/TextArea";
import {CircularProgress} from "@mui/material";
import {SubmitButton} from "../common/form/SubmitButton";
import {OnOffSwitch} from "../common/form/OnOffSwitch";
import {places} from "../../assets/txt/places";
import {PlaceTypeSelect} from "../common/form/place/PlaceTypeSelect";
import {PlaceNameInput} from "../common/form/place/PlaceNameInput";
import {PlaceStreetInput} from "../common/form/place/PlaceStreetInput";
import {PlacePostCodeInput} from "../common/form/place/PlacePostCodeInput";
import {PlaceCityInput} from "../common/form/place/PlaceCityInput";
import {CountrySelect} from "../common/form/CountrySelect";
import {PlaceGps} from "../common/form/place/PlaceGps";
import {Modal, ModalContent, StyledBackdrop} from "../common/Modal";

interface Props {
    lang: userLangEnum;
    setRefresh: Dispatch<SetStateAction<boolean>>;
    place: PlaceInterface | null;
    setPlace: Dispatch<SetStateAction<PlaceInterface | null>>;
    setAlert: (text: string, type: SetAlertType) => void;
}

export const PlaceEdit = (props: Props) => {

    const defaultValues: EditPlaceFormInterface = {
        isFavorite: props.place?.isFavorite ? 'true' : 'false',
        type: props.place?.type ? props.place.type.toString() : placeTypeEnum.other.toString(),
        country: props.place?.country ? props.place.country : '',
        name: props.place?.name ? props.place.name : '',
        code: props.place?.code ? props.place.code : '',
        city: props.place?.city ? props.place.city : '',
        street: props.place?.street ? props.place.street : '',
        lat: props.place?.lat ? props.place.lat.toString() : '',
        lon: props.place?.lon ? props.place.lon.toString() : '',
        description: props.place?.description ? props.place.description : '',
    }

    const [editPlaceForm, setEditPlaceForm] = useState<EditPlaceFormInterface>(defaultValues);
    const {loading, fetchDataOld} = useApi();

    const updateForm = (key: keyof EditPlaceFormInterface, value: string) => {
        setEditPlaceForm((editPlaceForm: EditPlaceFormInterface) => ({
            ...editPlaceForm,
            [key]: value,
        }));
    };

    const handleClose = () => props.setPlace(null);

    const sendForm = async (e: FormEvent) => {
        e.preventDefault();
        if (props.place) {
            const result = await fetchDataOld(apiPaths.editPlace+'/'+props.place.id, 'PATCH', editPlaceForm);
            handleApiResult(result, props.lang, props.setAlert, () => {
                props.setAlert(places[props.lang].editSuccessInfo, 'success');
                props.setPlace(null);
                props.setRefresh((prev) => !prev);
            });
        }
    }

    return (
        <div>
            <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={props.place !== null}
                onClose={handleClose}
                slots={{backdrop: StyledBackdrop}}
            >
                <ModalContent sx={{width: 400}}>
                    <h2>{places[props.lang].edit} {editPlaceForm.name} - {editPlaceForm.city}</h2>
                    <form onSubmit={sendForm}>
                        <div><PlaceTypeSelect lang={props.lang} value={editPlaceForm.type}
                                              onChange={e => updateForm('type', e)}/></div>
                        <br/>
                        <div><PlaceNameInput lang={props.lang} value={editPlaceForm.name}
                                             onChange={e => updateForm('name', e.target.value)}/></div>
                        <br/>
                        <div className="DivInline"><PlaceStreetInput lang={props.lang} value={editPlaceForm.street}
                                                                     onChange={e => updateForm('street', e.target.value)}/></div>

                        <div className="DivInline"><PlacePostCodeInput lang={props.lang} value={editPlaceForm.code}
                                                                       onChange={e => updateForm('code', e.target.value)}/></div>

                        <div className="DivInline"><PlaceCityInput lang={props.lang} value={editPlaceForm.city}
                                                                   onChange={e => updateForm('city', e.target.value)}/></div>
                        <div className="DivClear"/>
                        <br/>
                        <div><CountrySelect lang={props.lang} value={editPlaceForm.country}
                                            onChange={e => updateForm('country', e)}/></div>
                        <br/>
                        <div><TextArea label={places[props.lang].description} value={editPlaceForm.description}
                                       onChange={e => updateForm('description', e.target.value)}/></div>
                        <br/>
                        <div><OnOffSwitch label={places[props.lang].isFavoriteSwitchLabel} value={editPlaceForm.isFavorite}
                                          onChange={e => updateForm('isFavorite', e)}/></div>
                        <br/>
                        <div className="DivInline"><PlaceGps label={places[props.lang].lat} value={editPlaceForm.lat}
                                                             onChange={e => updateForm('lat', e.target.value)}/></div>

                        <div className="DivInline"><PlaceGps label={places[props.lang].lon} value={editPlaceForm.lon}
                                                             onChange={e => updateForm('lon', e.target.value)}/></div>
                        <div className="DivClear"/>
                        <br/>
                        <center>
                            {loading ?
                                <CircularProgress/> :
                                <SubmitButton text={places[props.lang].edit}/>
                            }
                        </center>
                    </form>
                </ModalContent>
            </Modal>
        </div>
    );
}





