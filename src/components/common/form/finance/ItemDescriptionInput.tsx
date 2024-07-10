import React, {useEffect, useState} from "react";
import {TextField} from "@mui/material";
import { form } from "../../../../assets/txt/form";
import '../Form.css';
import {InputPropsTypes} from "../../../../types/InputPropsTypes";

interface Props extends InputPropsTypes {
    disabled?: boolean;
}

export const ItemDescriptionInput = (props: Props) => {

    const [validation, setValidation] = useState<boolean>(false);

    useEffect(() => {
        if ((props.value.length <= 100) || (props.value === '')) {
            setValidation(false);
        } else {
            setValidation(true);
        }
    }, [props.value]);

    return (
        <TextField
            label={form[props.lang].expenseItemDescription}
            id='itemDescription'
            InputLabelProps={{className: 'TextInput__Label'}}
            InputProps={{className: 'TextInput'}}
            type="text"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            error={validation}
            fullWidth
            disabled={props.disabled}
            size='small'
        />
    );
}