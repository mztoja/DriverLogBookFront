import {TextField} from "@mui/material";
import React from "react";
import {InputPropsTypes} from "../../../types/InputPropsTypes";
import {extractNumberWithDecimal} from "../../../utils/extractNumberWithDecimal";

interface Props extends InputPropsTypes {
    label: string;
}

export const NumberInput = (props: Props) => {

    const onChange = (v: string) => {
        const newValue = extractNumberWithDecimal(v);
        props.onChange(newValue);
    }

    return (
        <TextField
        label={props.label}
        id='number'
        InputLabelProps={{className: 'TextInput__Label'}}
        InputProps={{className: 'TextInput'}}
        type="number"
        size='small'
        autoComplete='off'
        value={props.value}
        onChange={(e) => onChange(e.target.value)}
        />
    );
}