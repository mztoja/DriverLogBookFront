import React, {useEffect, useState} from "react";
import {PlaceInterface, placeTypeEnum, userLangEnum} from "types";
import {CountrySelect} from "./CountrySelect";
import {CircularProgress, FormHelperText, TextField} from "@mui/material";
import {form} from "../../../assets/txt/form";
import {Link} from "react-router-dom";
import {DownloadFromLocalStorage, SaveToLocalStorage} from "../../../hooks/LocalStorageHook";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import {apiPaths} from "../../../config/api";
import {useApi} from '../../../hooks/useApi';
import {places as placesTxt} from "../../../assets/txt/places";
import {useAlert} from "../../../hooks/useAlert";
import {PlaceField} from "./PlaceField";

interface Props {
    lang: userLangEnum;
    defaultCountry: string;
    countryValue: string;
    countryOnChange: (e: any) => void;
    placeValue: string;
    placeOnChange: (e: any) => void;
    placeIdValue: string;
    placeIdOnChange: (e: any) => void;
    disablePlaceText?: boolean;
}

export const PlaceInput = (props: Props) => {

    const [country, setCountry] = useState<string>(props.countryValue ? props.countryValue : props.defaultCountry);
    const [autoCompleteFormSwitch, setAutoCompleteFormSwitch] = useState<boolean>(props.disablePlaceText ? true : (props.placeValue === ''));
    const [firstRender, setFirstRender] = useState<boolean>(true);
    const [placeIdValue, setPlaceIdValue] = useState<string>(props.placeIdValue === '' ? '0' : props.placeIdValue);
    const [placesList, setPlacesList] = useState<PlaceInterface[] | null>(null);
    const [places, setPlaces] = useState<PlaceInterface[] | null>(null);
    const [defaultPlaceValue, setDefaultPlaceValue] = useState<PlaceInterface | null>(null);
    const [clear, setClear] = useState<number>(0);
    const {loading, fetchData} = useApi();
    const {setAlert} = useAlert();

    useEffect(() => {
        (async () => {
            const result = await fetchData(apiPaths.getPlaces, {
                headers: {Accept: 'application/json'},
                credentials: "include",
            });
            if ((result && result.data) && (!result.data.dtc)) {
                setPlacesList(result.data);
            } else {
                setAlert(placesTxt[props.lang].apiError, 'error');
            }
        })();
        // eslint-disable-next-line
    }, []);

    if (firstRender && placesList !== null) {
        const placeId = Number(placeIdValue);
        if (placeId !== 0) {
            const defaultValue = placesList?.find(place => place.id === placeId);
            if (defaultValue) {
                setCountry(defaultValue.country);
                setDefaultPlaceValue(defaultValue);
            }
        } else {
            setDefaultPlaceValue(null);
        }
        setFirstRender(false);
    }

    useEffect(() => {
        const filteredData = placesList?.filter(place => place.country === country).sort((a, b) => {
            if (a.isFavorite && !b.isFavorite) return -1;
            if (!a.isFavorite && b.isFavorite) return 1;
            return a.type - b.type;
        });
        if (filteredData) setPlaces(filteredData);
    }, [placesList, places, country]);

    const changeInput = () => {
        if (autoCompleteFormSwitch) {
            if (placeIdValue) {
                SaveToLocalStorage('placeId', placeIdValue);
            }
            setPlaceIdValue('0');
            props.placeIdOnChange('0');
            const data = DownloadFromLocalStorage('place');
            if (data) {
                props.placeOnChange(data);
            }

        } else if (!autoCompleteFormSwitch) {
            SaveToLocalStorage('place', props.placeValue);
            props.placeOnChange('');
            const data = DownloadFromLocalStorage('placeId');
            if (data) {
                setPlaceIdValue(data);
                props.placeIdOnChange(data);
                setFirstRender(true);
            }
        }
        setAutoCompleteFormSwitch(!autoCompleteFormSwitch);
    }

    const updateCountry = (e: string) => {
        if (country !== e) {
            setPlaceIdValue('0');
            props.placeIdOnChange('0');
            setDefaultPlaceValue(null);
            setClear(clear + 1);
        }
        setCountry(e);
        props.countryOnChange(e);
    }

    if (loading) {
        return <CircularProgress/>
    }

    return (
        <>
            <CountrySelect lang={props.lang} value={country} onChange={e => updateCountry(e)}/>
            {!autoCompleteFormSwitch
                ?
                (
                    <>
                        <PlaceField lang={props.lang} value={props.placeValue} onChange={e => props.placeOnChange(e)}/>
                        <FormHelperText className='TextInput__Label'>
                            <Link to="" className="Link"
                                  onClick={() => changeInput()}>{form[props.lang].switchToPlaceId}</Link>
                        </FormHelperText>
                    </>
                )
                :
                null}
            {autoCompleteFormSwitch && places
                ?
                (
                    <>
                        <Autocomplete
                            id="place"
                            key={clear}
                            options={places}
                            groupBy={(option) => {
                                if (option.isFavorite) {
                                    return form[props.lang].favorite;
                                } else {
                                    if (option.type === placeTypeEnum.other) {
                                        return form[props.lang].placeType0;
                                    } else if (option.type === placeTypeEnum.base) {
                                        return form[props.lang].placeType1;
                                    } else if ((option.type === placeTypeEnum.loadingPlace) ||
                                        (option.type === placeTypeEnum.unloadingPlace) ||
                                        (option.type === placeTypeEnum.loadAndunloadPlace)) {
                                        return form[props.lang].placeType4;
                                    } else if (option.type === placeTypeEnum.parking) {
                                        return form[props.lang].placeType5;
                                    } else if (option.type === placeTypeEnum.service) {
                                        return form[props.lang].placeType6;
                                    } else if (option.type === placeTypeEnum.customs) {
                                        return form[props.lang].placeType7;
                                    } else {
                                        return '';
                                    }
                                }
                            }}
                            autoHighlight
                            size='small'
                            defaultValue={defaultPlaceValue}
                            getOptionLabel={(option) => option.name + '-' + option.code + ' ' + option.city}
                            isOptionEqualToValue={(option, value) =>
                                (option.id === value.id)}
                            renderOption={(props, option) => (
                                <Box component="li" {...props}>
                                    {option.name} - {option.code} {option.city}, {option.street}
                                </Box>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={form[props.lang].place}
                                    InputLabelProps={{className: 'TextInput__Label'}}
                                    InputProps={{...params.InputProps}}
                                    size='small'
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'off',// disable autocomplete and autofill
                                        className: 'TextInput',
                                    }}
                                />
                            )}
                            onChange={(event: any, newValue: PlaceInterface | null) => {
                                if (newValue) {
                                    setPlaceIdValue(newValue.id.toString());
                                    props.placeIdOnChange(newValue.id.toString());
                                } else {
                                    props.placeIdOnChange('0');
                                }
                            }}

                        />
                        {!props.disablePlaceText && <FormHelperText className='TextInput__Label'>
                            <Link to="" className="Link"
                                  onClick={() => changeInput()}>{form[props.lang].switchToPlace}</Link>
                        </FormHelperText>}
                    </>
                )
                :
                null}
        </>
    );
}