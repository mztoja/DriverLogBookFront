import React, {useEffect, useState} from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {MenuItem, Select} from "@mui/material";
import { form } from "../../../assets/txt/form";
import {InputPropsTypes} from "../../../types/InputPropsTypes";

export const FuelConsuptionTypeSelect = (props: InputPropsTypes) => {

    const [value, setValue] = useState<number>(Number(props.value));

    useEffect(() => {
        props.onChange(value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[value]);

    return (
        <FormControl fullWidth>
            <InputLabel id="fuelConsumption" className="TextInput__Label">{form[props.lang].fuelConsumptionType}</InputLabel>
            <Select
                label={form[props.lang].fuelConsumptionType}
                id="fuelConsumption"
                onChange={(e) => {setValue(Number(e.target.value));}}
                value={props.value ? props.value : '1'}
                inputProps={{className: 'TextInput'}}
                size='small'
            >
                <MenuItem value={1}>{form[props.lang].fuelConType1}</MenuItem>
                <MenuItem value={2}>{form[props.lang].fuelConType2}</MenuItem>
            </Select>
        </FormControl>);
}