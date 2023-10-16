import React from "react";
import {TextField} from "@mui/material";
import './Form.css';

export interface Props {
    label: string;
    value:string;
    onChange: (e:any) => void;
}


export const TextArea = (props:Props) => {

    return (
        <TextField
            id={props.label}
            label={props.label}
            InputLabelProps={{className: 'TextInput__Label'}}
            InputProps={{className: 'TextInput'}}
            multiline
            fullWidth
            value={props.value}
            onChange={props.onChange}
            maxRows={8}
            size='small'
        />
    );
}








