import React from "react";
import {TextField} from "@mui/material";
import '../Form.css';
import {InputPropsTypes} from "../../../../types/InputPropsTypes";
import {extractDigits} from "../../../../utils/extractDigits";
import InputAdornment from "@mui/material/InputAdornment";
import {vehicles} from "../../../../assets/txt/vehicles";

export const VehicleServiceInput = (props:InputPropsTypes) => {

    const onChange = (v: string) => {
        const newValue = extractDigits(v);
        props.onChange(newValue);
    }

    return (
        <TextField
            label={vehicles[props.lang].nextService}
            id="nextVehicleService"
            InputLabelProps={{className: 'TextInput__Label'}}
            InputProps={{className: 'TextInput',
                endAdornment: (
                    <InputAdornment className='TextInput' position="end">
                        <span>km</span>
                    </InputAdornment>
                ),}}
            type="text"
            value={props.value}
            onChange={(e) => onChange(e.target.value)}
            fullWidth
            autoComplete="off"
            size='small'
        />
    );
}