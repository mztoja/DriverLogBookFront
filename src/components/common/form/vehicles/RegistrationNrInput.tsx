import React, {useEffect, useState} from "react";
import {TextField} from "@mui/material";
import { form } from "../../../../assets/txt/form";
import '../Form.css';
import {InputPropsTypes} from "../../../../types/InputPropsTypes";

interface Props extends InputPropsTypes {
    vehicle: 'truck' | 'trailer';
}

export const RegistrationNrInput = (props: Props) => {

    const [validation, setValidation] = useState<boolean>(false);

    useEffect(() => {
        if ((props.value.length <= 10) || (props.value === '')) {
            setValidation(false);
        } else {
            setValidation(true);
        }
    }, [props.value]);

    return (
        <TextField
            label={props.vehicle === 'truck' ? form[props.lang].truck : form[props.lang].trailer}
            id={props.vehicle}
            required
            InputLabelProps={{className: 'TextInput__Label'}}
            InputProps={{className: 'TextInput'}}
            type="text"
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
            error={validation}
            fullWidth
            size='small'
        />
    );
}