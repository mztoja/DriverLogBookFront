import React, {useEffect, useState} from "react";
import {TextField} from "@mui/material";
import { UserLangEnum } from "types";
import { form } from "../../../assets/txt/form";
import './Form.css';
import {emailRegExp} from "../../../config/regexp";

interface Props {
    lang: UserLangEnum;
    value:string;
    onChange: (e:any) => void;
}

export const EmailInput = (props:Props) => {

    const [validation, setValidation] = useState<boolean>(false);

    useEffect(() => {
        const regexp = emailRegExp();
        if (regexp.test(props.value)) {
            setValidation(false);
        } else {
            setValidation(true);
        }
    }, [props.value]);

    return (
        <TextField
            required
            id="outlined-required"
            label={form[props.lang].email}
            InputLabelProps={{className: 'TextInput__Label'}}
            InputProps={{className: 'TextInput'}}
            type="email"
            value={props.value}
            onChange={props.onChange}
            error={validation}
            fullWidth
        />
    );
}