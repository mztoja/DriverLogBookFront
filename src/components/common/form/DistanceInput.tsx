import React from "react";
import {TextField} from "@mui/material";
import { form } from "../../../assets/txt/form";
import './Form.css';
import {InputPropsTypes} from "../../../types/InputPropsTypes";
import {extractDigits} from "../../../utils/extractDigits";
import InputAdornment from "@mui/material/InputAdornment";

export const DistanceInput = (props:InputPropsTypes) => {

    const onChange = (v: string) => {
        const newValue = extractDigits(v);
        props.onChange(newValue);
    }

    return (
        <TextField
            label={form[props.lang].distance}
            id="distance"
            InputLabelProps={{className: 'TextInput__Label'}}
            InputProps={{className: 'TextInput',
                endAdornment: (
                    <>
                        <InputAdornment className='TextInput' position="end">
                            <span>km</span>
                        </InputAdornment>
                    </>
                ),}}
            type="text"
            value={props.value === '0' ? '' : props.value}
            onChange={(e) => onChange(e.target.value)}
            fullWidth
            autoComplete="off"
            size='small'
        />
    );
}