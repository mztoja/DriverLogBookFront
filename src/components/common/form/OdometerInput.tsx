import React from "react";
import {TextField} from "@mui/material";
import { form } from "../../../assets/txt/form";
import './Form.css';
import {InputPropsTypes} from "../../../types/InputPropsTypes";
import {extractDigits} from "../../../utils/extractDigits";
import InputAdornment from "@mui/material/InputAdornment";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";

export const OdometerInput = (props:InputPropsTypes) => {

    const onChange = (v: string) => {
        const newValue = extractDigits(v);
        props.onChange(newValue);
    }
    const handleClear = ():void => {
        props.onChange('');
    }

    return (
        <TextField
            label={form[props.lang].odometer}
            id="odometer"
            InputLabelProps={{className: 'TextInput__Label'}}
            InputProps={{className: 'TextInput',
                endAdornment: (
                    <>
                        <InputAdornment className='TextInput' position="end">
                            <span>km</span>
                        </InputAdornment>
                        {props.value.length !== 0 &&
                            <IconButton onClick={handleClear} size="small">
                            <ClearIcon />
                            </IconButton>
                        }
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