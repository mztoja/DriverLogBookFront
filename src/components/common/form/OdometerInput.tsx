import React, {useEffect, useState} from "react";
import {TextField} from "@mui/material";
import { form } from "../../../assets/txt/form";
import './Form.css';
import {InputPropsTypes} from "../../../types/InputPropsTypes";
import {extractDigits} from "../../../utils/extractDigits";
import InputAdornment from "@mui/material/InputAdornment";

export const OdometerInput = (props:InputPropsTypes) => {

    const [value, setValue] = useState<string>(props.value);

    useEffect(() => {
        setValue(extractDigits(props.value));
    }, [props.value]);

    return (
        <TextField
            label={form[props.lang].odometer}
            id="odometer"
            InputLabelProps={{className: 'TextInput__Label'}}
            InputProps={{className: 'TextInput',
                endAdornment: (
                    <InputAdornment className='TextInput' position="end">
                            <span>km</span>
                    </InputAdornment>
                ),}}
            type="text"
            value={value}
            onChange={props.onChange}
            fullWidth
            autoComplete="off"
            size='small'
        />
    );
}