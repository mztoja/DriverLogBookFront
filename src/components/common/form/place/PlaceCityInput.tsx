import React, {useEffect, useState} from "react";
import {TextField} from "@mui/material";
import { form } from "../../../../assets/txt/form";
import '../Form.css';
import {InputPropsTypes} from "../../../../types/InputPropsTypes";

export const PlaceCityInput = (props:InputPropsTypes) => {

    const [validation, setValidation] = useState<boolean>(false);

    useEffect(() => {
        setValidation(!((props.value.length <= 30) || (props.value === '')));
    }, [props.value]);

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
            error={validation}
            autoComplete='off'
            size='small'
        />
    );
}
