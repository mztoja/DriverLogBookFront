import React, {useEffect, useMemo, useState} from "react";
import {PlaceInterface, placeTypeEnum, userLangEnum} from "types";
import {CountrySelect} from "./CountrySelect";
import {TextField} from "@mui/material";
import {form} from "../../../assets/txt/form";
import Box from "@mui/material/Box";
import Autocomplete, {createFilterOptions} from "@mui/material/Autocomplete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {usePlaces} from '../../../hooks/usePlaces';

interface Props {
    lang: userLangEnum;
    defaultCountry: string;
    countryValue: string;
    countryOnChange: (e: any) => void;
    placeValue: string;
    placeOnChange: (e: any) => void;
    placeIdValue: string;
    placeIdOnChange: (e: any) => void;
    disablePlaceText?: boolean; // tryb tylko-wybór z listy (brak wpisu ręcznego)
    withoutPlaceId?: boolean;   // tryb tylko wpis ręczny (bez listy adresowej)
    label?: string;
}

const formatPlace = (p: PlaceInterface): string =>
    `${p.name} - ${p.street}, ${p.code} ${p.city}`;

const placeFilter = createFilterOptions<PlaceInterface>({
    stringify: (o) => `${o.name} ${o.code} ${o.city} ${o.street}`,
});

// wstrzykuje zielony ptaszek jako pierwsze dziecko wewnątrz kontenera .MuiAutocomplete-endAdornment,
// dzięki czemu ikona ląduje po lewej stronie krzyżyka (a nie w normalnym flow pod polem)
const injectPlaceIdMark = (
    endAdornment: React.ReactElement<{ children?: React.ReactNode }> | undefined,
    show: boolean,
    title: string,
): React.ReactNode => {
    if (!show || !React.isValidElement(endAdornment)) return endAdornment;
    const mark = (
        <CheckCircleIcon
            fontSize="small"
            titleAccess={title}
            sx={{color: 'success.main', mr: 0.5, verticalAlign: 'middle'}}
        />
    );
    return React.cloneElement(
        endAdornment,
        undefined,
        <React.Fragment key="place-id-mark">{mark}{endAdornment.props.children}</React.Fragment>,
    );
};

export const PlaceInput = (props: Props) => {

    const {places: placesList, loading, ensurePlaces} = usePlaces();
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
        ensurePlaces();
    }, [ensurePlaces]);

    useEffect(() => {
        if (!props.countryValue && props.defaultCountry) {
            props.countryOnChange(props.defaultCountry);
        }
        // eslint-disable-next-line
    }, []);

    const country = props.countryValue || props.defaultCountry;

    const selectedPlace = useMemo<PlaceInterface | null>(() => {
        const id = Number(props.placeIdValue);
        if (!id || id <= 0 || !placesList) return null;
        return placesList.find((p) => p.id === id) ?? null;
    }, [placesList, props.placeIdValue]);

    const options = useMemo<PlaceInterface[]>(() => {
        if (!placesList) return [];
        return [...placesList]
            .filter((p) => p.country === country)
            .sort((a, b) => {
                if (a.isFavorite !== b.isFavorite) return a.isFavorite ? -1 : 1;
                if (a.type !== b.type) return a.type - b.type;
                if (a.code !== b.code) return a.code < b.code ? -1 : 1;
                if (a.name !== b.name) return a.name < b.name ? -1 : 1;
                return 0;
            });
    }, [placesList, country]);

    // widoczny tekst zawsze zgodny ze stanem zewnętrznym
    useEffect(() => {
        setInputValue(selectedPlace ? formatPlace(selectedPlace) : props.placeValue);
    }, [selectedPlace, props.placeValue]);

    // kraj podąża za wybranym miejscem
    useEffect(() => {
        if (selectedPlace && selectedPlace.country !== props.countryValue) {
            props.countryOnChange(selectedPlace.country);
        }
        // eslint-disable-next-line
    }, [selectedPlace]);

    const groupBy = (o: PlaceInterface): string => {
        if (o.isFavorite) return form[props.lang].favorite;
        switch (o.type) {
            case placeTypeEnum.other:
                return form[props.lang].placeType0;
            case placeTypeEnum.base:
                return form[props.lang].placeType1;
            case placeTypeEnum.loadingPlace:
                return form[props.lang].placeType2;
            case placeTypeEnum.unloadingPlace:
                return form[props.lang].placeType3;
            case placeTypeEnum.loadAndunloadPlace:
                return form[props.lang].placeType4;
            case placeTypeEnum.parking:
                return form[props.lang].placeType5;
            case placeTypeEnum.service:
                return form[props.lang].placeType6;
            case placeTypeEnum.customs:
                return form[props.lang].placeType7;
            case placeTypeEnum.fuelStation:
                return form[props.lang].placeType8;
            default:
                return '';
        }
    };

    const handleInputChange = (
        _e: React.SyntheticEvent,
        newInput: string,
        reason: string,
    ): void => {
        if (reason === 'reset') return; // wewnętrzne resety MUI — steruje efekt synchronizujący
        setInputValue(newInput);
        if (reason === 'clear') {
            props.placeIdOnChange('0');
            props.placeOnChange('');
            return;
        }
        if (props.disablePlaceText) return; // tryb tylko-wybór: pisanie jedynie filtruje listę
        if (reason === 'input') {
            props.placeIdOnChange('0');
            props.placeOnChange(newInput);
        }
    };

    const handleChange = (
        _e: React.SyntheticEvent,
        newValue: PlaceInterface | string | null,
    ): void => {
        if (newValue && typeof newValue !== 'string') {
            props.placeOnChange('');
            props.placeIdOnChange(newValue.id.toString());
            if (newValue.country !== props.countryValue) {
                props.countryOnChange(newValue.country);
            }
        } else if (typeof newValue === 'string') {
            if (props.disablePlaceText) return;
            props.placeIdOnChange('0');
            props.placeOnChange(newValue);
        } else {
            props.placeIdOnChange('0');
            props.placeOnChange('');
        }
    };

    const updateCountry = (e: string): void => {
        const next = e || '';
        if (next && next !== props.countryValue && Number(props.placeIdValue) > 0) {
            props.placeIdOnChange('0');
            props.placeOnChange('');
        }
        props.countryOnChange(next);
    };

    const placeError = props.placeValue.length > 30;
    const label = props.label ?? form[props.lang].place;
    const hasPlaceId = Number(props.placeIdValue) > 0;

    if (props.withoutPlaceId) {
        return (
            <>
                <CountrySelect lang={props.lang} value={country} onChange={updateCountry}/>
                <TextField
                    id="place"
                    label={label}
                    InputLabelProps={{className: 'TextInput__Label'}}
                    InputProps={{className: 'TextInput'}}
                    type="text"
                    value={props.placeValue}
                    onChange={(e) => props.placeOnChange(e.target.value)}
                    fullWidth
                    size="small"
                    error={placeError}
                    helperText={placeError ? form[props.lang].placeHelper : undefined}
                />
            </>
        );
    }

    return (
        <>
            <CountrySelect lang={props.lang} value={country} onChange={updateCountry}/>
            <Autocomplete
                id="place"
                freeSolo={!props.disablePlaceText}
                options={options}
                value={props.disablePlaceText ? selectedPlace : (selectedPlace ?? (props.placeValue || null))}
                inputValue={inputValue}
                onChange={handleChange}
                onInputChange={handleInputChange}
                onClose={() => {
                    if (props.disablePlaceText) {
                        setInputValue(selectedPlace ? formatPlace(selectedPlace) : '');
                    }
                }}
                filterOptions={placeFilter}
                groupBy={groupBy}
                getOptionLabel={(option) =>
                    typeof option === 'string' ? option : formatPlace(option)}
                isOptionEqualToValue={(option, value) =>
                    typeof option !== 'string' && typeof value !== 'string' && option.id === value.id}
                loading={loading}
                disabled={!placesList}
                autoHighlight
                size="small"
                renderOption={(optionProps, option) => {
                    const {key, ...rest} = optionProps as React.HTMLAttributes<HTMLLIElement> & { key?: string };
                    return (
                        <Box component="li" key={key} {...rest}>
                            {formatPlace(option)}
                        </Box>
                    );
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={label}
                        InputLabelProps={{className: 'TextInput__Label'}}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: injectPlaceIdMark(
                                params.InputProps.endAdornment as React.ReactElement<{ children?: React.ReactNode }> | undefined,
                                hasPlaceId,
                                form[props.lang].placeIdSelected,
                            ),
                        }}
                        size="small"
                        error={placeError}
                        helperText={placeError ? form[props.lang].placeHelper : undefined}
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'off', // disable autocomplete and autofill
                            className: 'TextInput',
                        }}
                    />
                )}
            />
        </>
    );
}
