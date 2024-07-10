import React, {useEffect, useState} from "react";
import {TextField} from "@mui/material";
import '../Form.css';
import {InputPropsTypes} from "../../../../types/InputPropsTypes";
import {vehicles} from "../../../../assets/txt/vehicles";

export const VehicleModelInput = (props: InputPropsTypes) => {

    const [validation, setValidation] = useState<boolean>(false);

    useEffect(() => {
        if ((props.value.length <= 30) || (props.value === '')) {
            setValidation(false);
        } else {
            setValidation(true);
        }
    }, [props.value]);

    return (
        <TextField
            label={vehicles[props.lang].model}
            id='vehicleBrandModel'
            InputLabelProps={{className: 'TextInput__Label'}}
            InputProps={{className: 'TextInput'}}
            type="text"
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
            error={validation}
            fullWidth
            size='small'
            autoComplete='off'
        />
    );
}