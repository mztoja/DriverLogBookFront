import React, {useEffect, useState} from "react";
import {TextField} from "@mui/material";
import {form} from "../../../../assets/txt/form";
import {InputPropsTypes} from "../../../../types/InputPropsTypes";

export const LoadDescriptionInput = (props: InputPropsTypes) => {

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
            label={form[props.lang].loadDescription}
            id='loadDescription'
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