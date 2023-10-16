import React from "react";
import {TextField} from "@mui/material";
import { form } from "../../../assets/txt/form";
import './Form.css';
import {InputPropsTypes} from "../../../types/InputPropsTypes";

export const SearchInput = (props:InputPropsTypes) => {

    return (
        <TextField
            label={form[props.lang].search}
            id="lastName"
            InputLabelProps={{className: 'TextInput__Label'}}
            InputProps={{className: 'TextInput'}}
            type="text"
            value={props.value}
            onChange={props.onChange}
            fullWidth
            autoComplete="off"
            size='small'
        />
    );
}