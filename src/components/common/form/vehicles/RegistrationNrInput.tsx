import React, {useEffect, useMemo, useState} from "react";
import {TextField} from "@mui/material";
import { form } from "../../../../assets/txt/form";
import '../Form.css';
import {InputPropsTypes} from "../../../../types/InputPropsTypes";

interface Props extends InputPropsTypes {
    vehicle: 'truck' | 'trailer' | 'vehicle';
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

    const label = useMemo(() => {
        if (props.vehicle === 'truck') {
            return form[props.lang].truck;
        } else if (props.vehicle === 'trailer') {
            return form[props.lang].trailer;
        } else {
            return form[props.lang].vehicleInput;
        }
    }, [props.lang, props.vehicle]);

    return (
        <TextField
            label={label}
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