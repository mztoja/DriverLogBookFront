import React, {useEffect, useState} from "react";
import {TextField} from "@mui/material";
import {form} from "../../../../assets/txt/form";
import {InputPropsTypes} from "../../../../types/InputPropsTypes";

export const LoadReferenceInput = (props: InputPropsTypes) => {

    const [validation, setValidation] = useState<boolean>(false);

    useEffect(() => {
        if ((props.value.length <= 20) || (props.value === '')) {
            setValidation(false);
        } else {
            setValidation(true);
        }
    }, [props.value]);

    return (
        <TextField
            label={form[props.lang].loadReference}
            id='loadReference'
            InputLabelProps={{className: 'TextInput__Label'}}
            InputProps={{className: 'TextInput'}}
            type="text"
            value={props.value}
            onChange={props.onChange}
            error={validation}
            fullWidth
            size='small'
        />
    );
}