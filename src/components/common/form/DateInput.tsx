import React from "react";
import {TextField} from "@mui/material";
import './Form.css';
import {InputPropsTypes} from "../../../types/InputPropsTypes";

interface Props extends InputPropsTypes{
    label: string;
    onlyMonth?: boolean;
}

export const DateInput = (props: Props) => {

    return (
        <TextField
            label={props.label}
            id={props.onlyMonth ? 'month' : 'date'}
            InputLabelProps={{className: 'TextInput__Label'}}
            InputProps={{className: 'TextInput'}}
            type={props.onlyMonth ? 'month' : 'date'}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            fullWidth={!props.onlyMonth}
            autoComplete="off"
            size='small'
        />
    );
}