import React, {useEffect, useState} from "react";
import {TextField} from "@mui/material";



interface Props {
    label: string
    value: string;
    onChange: (e: string) => void;
}

export const PlaceGps = (props: Props) => {

    const [validation, setValidation] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        props.onChange(e.target.value.replace(',', '.').replace(/[^0-9.,-]/g, ''));
    }

    useEffect(() => {
        if ((props.value.length < 9) || (props.value === '')) {
            setValidation(false);
        } else {
            setValidation(true);
        }
    }, [props.value]);

    return (
        <TextField
            id={props.label}
            label={props.label}
            InputLabelProps={{className: 'TextInput__Label'}}
            InputProps={{className: 'TextInput'}}
            type="text"
            value={props.value}
            onChange={handleChange}
            fullWidth
            error={validation}
            autoComplete='off'
            size='small'
        />
    );

}

