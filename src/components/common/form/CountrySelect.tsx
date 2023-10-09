import React, {useEffect} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {InputPropsTypes} from "../../../types/InputPropsTypes";
import {Country, countries as countriesList} from "../../../data/countries";
import {form,} from "../../../assets/txt/form";
import {countries as txtCountries} from "../../../assets/txt/countries";

export const CountrySelect = (props: InputPropsTypes) => {

    const [value, setValue] = React.useState<Country | null>(null);
    const [countries, setCountries] = React.useState(countriesList);
    const [defaultValue, setDefaultValue] = React.useState<Country | null>(null);
    const [firstRender, setFirstRender] = React.useState<boolean>(false);

    useEffect(() => {
        if (props.lang !== 0) {
            const newCountries: Country[] = countries.map(country => {
                if (country.code in txtCountries[props.lang]) {
                    return {
                        code: country.code,
                        label: txtCountries[props.lang][country.code],
                        phone: country.phone,
                    }
                }
                return {
                    code: country.code,
                    label: country.label,
                    phone: country.phone,
                }
            });
            setCountries(newCountries);
        } else {
            setCountries(countriesList);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.lang]);

    useEffect(() => {
        props.onChange(value?.code);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    if (!firstRender) {
            if (props.value !== '') {
                const set = countries.find(country => country.code === props.value);
                if (set !== undefined) {
                    setDefaultValue({
                        code: set.code,
                        label: set.label,
                        phone: set.phone,
                    });
                }
            }
            setFirstRender(true);
    }


    return (
        <Autocomplete
            id="country"
            options={countries}
            autoHighlight
            defaultValue={defaultValue}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
                <Box component="li" sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}>
                    <img
                        loading="lazy"
                        width="20"
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        alt=""
                    />
                    {option.label} ({option.code}) +{option.phone}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={form[props.lang].country}
                    InputLabelProps={{className: 'TextInput__Label'}}
                    InputProps={{...params.InputProps}}
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password',// disable autocomplete and autofill
                        className: 'TextInput',
                    }}
                />
            )}
            onChange={(event: any, newValue: Country | null) => {
                setValue(newValue);}}
        />
    );
}
