import React, {useEffect, useState} from "react";
import {TextField} from "@mui/material";
import { form } from "../../../assets/txt/form";
import './Form.css';
import {InputPropsTypes} from "../../../types/InputPropsTypes";


export const DefaultCustomerInput = (props:InputPropsTypes) => {

    const [validation, setValidation] = useState<boolean>(false);

    useEffect(() => {
        if ((props.value.length <= 20) || (props.value === '')) {
            setValidation(false);
        } else {
            setValidation(true);
        }
    }, [props.value]);

    return (
        <TextField
            id="defaultCustomer"
            label={form[props.lang].defaultCustomer}
            InputLabelProps={{className: 'TextInput__Label'}}
            InputProps={{className: 'TextInput'}}
            type="text"
            value={props.value}
            onChange={props.onChange}
            fullWidth
            error={validation}
            autoComplete="nope"
        />
    );
}