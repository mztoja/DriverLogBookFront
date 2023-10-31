import React, {useEffect, useState} from "react";
import {form} from "../../../assets/txt/form";
import {TextField} from "@mui/material";
import {InputPropsTypes} from "../../../types/InputPropsTypes";

export const PlaceField = (props: InputPropsTypes) => {

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
            label={form[props.lang].place}
            id="place"
            InputLabelProps={{className: 'TextInput__Label'}}
            InputProps={{className: 'TextInput'}}
            type="text"
            value={props.value}
            onChange={(e) => {
                props.onChange(e.target.value)
            }}
            fullWidth
            error={validation}
            size='small'
        />
    );
}
