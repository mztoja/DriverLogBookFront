import React, {useEffect, useState} from "react";
import {TextField} from "@mui/material";



interface Props {
    label: string
    value: string;
    onChange: (e: any) => void;
}

export const PlaceGps = (props: Props) => {

    const [validation, setValidation] = useState<boolean>(false);
    const [value, setValue] = useState<string>(props.value);
    useEffect(() => {
        const newValue = props.value;
        setValue(newValue.replace(',', '.'));
        if ((value.length < 11) || (value === '')) {
            setValidation(false);
        } else {
            setValidation(true);
        }
    }, [props.value, value]);

    return (
        <TextField
            id={props.label}
            label={props.label}
            InputLabelProps={{className: 'TextInput__Label'}}
            InputProps={{className: 'TextInput'}}
            type="text"
            value={value}
            onChange={props.onChange}
            fullWidth
            error={validation}
            autoComplete='off'
        />
    );

}

