import React from "react";
import {TextField} from "@mui/material";
import './Form.css';
import {InputPropsTypes} from "../../../types/InputPropsTypes";

interface Props extends InputPropsTypes{
    label: string;
}

export const DateInput = (props: Props) => {

    return (
        <TextField
            label={props.label}
            id="date"
            InputLabelProps={{className: 'TextInput__Label'}}
            InputProps={{className: 'TextInput'}}
            type="date"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            fullWidth
            autoComplete="off"
            size='small'
        />
    );
}