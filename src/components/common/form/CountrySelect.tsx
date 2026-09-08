import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {InputPropsTypes} from "../../../types/InputPropsTypes";
import {Country, countries} from "../../../data/countries";
import {form,} from "../../../assets/txt/form";
import {countries as txtCountries} from "../../../assets/txt/countries";

export const CountrySelect = (props: InputPropsTypes) => {

    const txt = txtCountries[props.lang];

    // komponent w pełni kontrolowany — źródłem prawdy jest props.value (kod kraju).
    // Dzięki temu widżet zawsze odzwierciedla stan zewnętrzny (również zmiany
    // asynchroniczne / programowe), a onChange odpala się wyłącznie na akcję usera.
    const value: Country | null =
        countries.find((country) => country.code === props.value) ?? null;

    const labelFor = (code: string): string => txt[code] ?? code;

    return (
        <Autocomplete
            id="country"
            options={countries}
            autoHighlight
            size='small'
            value={value}
            isOptionEqualToValue={(option, selected) => option.code === selected.code}
            getOptionLabel={(option) => `${labelFor(option.code)} (${option.code})`}
            renderOption={(optionProps, option) => (
                <Box component="li" sx={{'& > img': {mr: 2, flexShrink: 0}}} {...optionProps}>
                    <img
                        loading="lazy"
                        width="20"
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        alt=""
                    />
                    {labelFor(option.code)} ({option.code}) +{option.phone}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={form[props.lang].country}
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
            onChange={(event: any, newValue: Country | null) => {
                props.onChange(newValue ? newValue.code : '');
            }}
        />
    );
}
