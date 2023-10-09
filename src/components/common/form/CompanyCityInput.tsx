import React from "react";
import {TextField} from "@mui/material";
import { form } from "../../../assets/txt/form";
import './Form.css';
import {InputPropsTypes} from "../../../types/InputPropsTypes";

export const CompanyCityInput = (props:InputPropsTypes) => {

    return (
        <TextField
            id="companyCity"
            required
            label={form[props.lang].companyCity}
            InputLabelProps={{className: 'TextInput__Label'}}
            InputProps={{className: 'TextInput'}}
            type="text"
            value={props.value}
            onChange={props.onChange}
            fullWidth
            autoComplete="nope"
        />
    );
}