import React, {useEffect, useState} from "react";
import {PlaceInterface, PlaceTypeEnum, UserLangEnum} from "types";
import {CountrySelect} from "./CountrySelect";
import {CircularProgress, FormHelperText, TextField} from "@mui/material";
import {form} from "../../../assets/txt/form";
import {Link} from "react-router-dom";
import {DownloadFromLocalStorage, SaveToLocalStorage} from "../../../hooks/LocalStorageHook";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import {useApiGetData} from "../../../hooks/useApiGetData";
import {apiLocation} from "../../../config/api";

interface Props {
    lang: UserLangEnum;
    defaultCountry: string;
    countryValue: string;
    countryOnChange: (e: any) => void;
    placeValue: string;
    placeOnChange: (e: any) => void;
    placeIdValue: string;
    placeIdOnChange: (e: any) => void;
}

export const PlaceInput = (props: Props) => {

    const [country, setCountry] = useState<string>(props.countryValue ? props.countryValue : props.defaultCountry);
    const [autoCompleteFormSwitch, setAutoCompleteFormSwitch] = useState<boolean>(true);
    const [firstRender, setFirstRender] = useState<boolean>(true);
    const [placeIdValue, setPlaceIdValue] = useState<string>(props.placeIdValue === '' ? '0' : props.placeIdValue);
    const [places, setPlaces] = useState<PlaceInterface[] | null>(null);
    const [defaultPlaceValue, setDefaultPlaceValue] = useState<PlaceInterface | null>(null);
    const [clear, setClear] = useState<number>(0);

    const {data: placesList, loading} = useApiGetData<PlaceInterface[]>(apiLocation.getPlaces, true);

    if (firstRender) {
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
        console.log('updateCountry');
        setCountry(e);
        props.countryOnChange(e);
        setPlaceIdValue('0');
        props.placeIdOnChange('0');
        setDefaultPlaceValue(null);
        setClear(clear + 1);
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
                        <TextField
                            label={form[props.lang].place}
                            id="place"
                            InputLabelProps={{className: 'TextInput__Label'}}
                            InputProps={{className: 'TextInput'}}
                            type="text"
                            value={props.placeValue}
                            onChange={(e) => {props.placeOnChange(e.target.value)}}
                            fullWidth
                            size='small'
                        />
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
                                    if (option.type === PlaceTypeEnum.other) {
                                        return form[props.lang].placeType0;
                                    } else if (option.type === PlaceTypeEnum.base) {
                                        return form[props.lang].placeType1;
                                    } else if ((option.type === PlaceTypeEnum.loadingPlace) ||
                                        (option.type === PlaceTypeEnum.unloadingPlace) ||
                                        (option.type === PlaceTypeEnum.loadAndunloadPlace)) {
                                        return form[props.lang].placeType4;
                                    } else if (option.type === PlaceTypeEnum.parking) {
                                        return form[props.lang].placeType5;
                                    } else if (option.type === PlaceTypeEnum.service) {
                                        return form[props.lang].placeType6;
                                    } else if (option.type === PlaceTypeEnum.customs) {
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
                        <FormHelperText className='TextInput__Label'>
                            <Link to="" className="Link"
                                  onClick={() => changeInput()}>{form[props.lang].switchToPlace}</Link>
                        </FormHelperText>
                    </>
                )
                :
                null}
        </>
    );
}