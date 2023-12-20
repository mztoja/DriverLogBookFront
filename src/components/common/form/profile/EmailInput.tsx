import React, {useEffect, useState} from "react";
import {TextField} from "@mui/material";
import { form } from "../../../../assets/txt/form";
import '../Form.css';
import {emailRegExp} from "../../../../config/regexp";
import {InputPropsTypes} from "../../../../types/InputPropsTypes";

export const EmailInput = (props:InputPropsTypes) => {

    const [validation, setValidation] = useState<boolean>(false);

    useEffect(() => {
        const regexp = emailRegExp();
        if ((regexp.test(props.value)) || (props.value === '')) {
            setValidation(false);
        } else {
            setValidation(true);
        }
    }, [props.value]);

    return (
        <TextField
            required
            id="email"
            label={form[props.lang].email}
            InputLabelProps={{className: 'TextInput__Label'}}
            InputProps={{className: 'TextInput'}}
            type="email"
            value={props.value}
            onChange={props.onChange}
            error={validation}
            fullWidth
            autoComplete=''
            size='small'
        />
    );
}