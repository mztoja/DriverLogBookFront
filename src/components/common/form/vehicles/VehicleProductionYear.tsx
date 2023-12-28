import React from "react";
import {InputPropsTypes} from "../../../../types/InputPropsTypes";
import {TextField} from "@mui/material";
import {vehicles} from "../../../../assets/txt/vehicles";
import {extractDigits} from "../../../../utils/extractDigits";

export const VehicleProductionYear = (props: InputPropsTypes) => {
    const onChange = (v: string) => {
        const newValue = extractDigits(v);
        if (newValue.length > 4) {
            props.onChange(newValue.substring(1));
        } else {
            props.onChange(newValue);
        }

    }
    return (
        <TextField
            label={vehicles[props.lang].yearOfProduction}
            id="yearOfProduction"
            InputLabelProps={{className: 'TextInput__Label'}}
            InputProps={{className: 'TextInput'}}
            type="text"
            value={props.value}
            onChange={(e) => onChange(e.target.value)}
            fullWidth
            autoComplete="off"
            size='small'
        />
    );
}