import React, {useEffect, useState} from "react";
import {apiPaths} from "../../../../config/api";
import {useApi} from "../../../../hooks/useApi";
import {useAlert} from "../../../../hooks/useAlert";
import { BorderInterface, userLangEnum } from "types";
import {form} from "../../../../assets/txt/form";
import {CircularProgress, FormHelperText} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {Link} from "react-router-dom";
import {CountrySelect} from "../CountrySelect";
import {PlaceField} from "../PlaceField";

interface Props {
    lang: userLangEnum;
    countryValue:string;
    countryOnChange: (e:any) => void;
    placeValue:string;
    placeOnChange: (e:any) => void;
    country: string;
    addNewBorderChange: (e:any) => void;
}

export const BorderInput = (props: Props) => {

    const {loading, fetchData} = useApi();
    const {setAlert} = useAlert();
    const [value, setValue] = useState<BorderInterface | null>(null);
    const [bordersData, setBordersData] = useState<BorderInterface[] | null>(null);
    const [newBorderForm, setNewBorderForm] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const result = await fetchData(apiPaths.getBordersByCountry+'/'+props.country, {
                headers: {'Content-Type': 'application/json'},
            });
            if ((result && result.data) && (!result.data.dtc)) {
                setBordersData(result.data);
            } else {
                setAlert(form[props.lang].bordersApiProblem, 'error');
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (value === null) {
            props.placeOnChange('');
        } else {
            props.placeOnChange(value?.place);
        }
        props.countryOnChange(value?.country2);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const changeInput = () => {
        setNewBorderForm(!newBorderForm);
    }

    useEffect(() => {
        if (newBorderForm) {
            props.addNewBorderChange('true');
        } else {
            props.addNewBorderChange('false');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newBorderForm]);

    if (loading) {
        return <CircularProgress/>
    }

    if (newBorderForm) {
        return (
            <>
                {form[props.lang].yourCountry}: {props.country}<br/>
                {form[props.lang].selectTargetCountry}: <br/><br/>
                <CountrySelect lang={props.lang} value={props.countryValue} onChange={e => props.countryOnChange(e)}/>
                <PlaceField lang={props.lang} value={props.placeValue} onChange={e => props.placeOnChange(e)}/>
                <FormHelperText className='TextInput__Label'>
                    <Link to="" className="Link"
                          onClick={() => changeInput()}>{form[props.lang].switchToBorderList}</Link>
                </FormHelperText>
            </>
        );
    }

    if (bordersData) {
        return (
            <><Autocomplete
                id="border"
                options={bordersData.map(border => {
                    if (border.country1 === props.country) {
                        return border;
                    } else if (border.country2 === props.country) {
                        return {
                            ...border,
                            country1: border.country2,
                            country2: border.country1,
                        };
                    }
                    return border;
                })}
                autoHighlight
                size='small'
                getOptionLabel={(option) => '('+option.country2+') '+option.place}
                renderOption={(props, option) => (
                    <Box component="li" sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}>
                        {option.place} - {option.country1+" > "+option.country2}
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={form[props.lang].border}
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
                onChange={(event: any, newValue: BorderInterface | null) => {
                    setValue(newValue);
                }}
            />
            <FormHelperText className='TextInput__Label'>
                <Link to="" className="Link"
                      onClick={() => changeInput()}>{form[props.lang].switchToNewBorder}</Link>
            </FormHelperText></>
        );
    }
    return <CircularProgress/>;
}