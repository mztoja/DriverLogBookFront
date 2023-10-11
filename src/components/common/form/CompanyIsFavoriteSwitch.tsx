import React, {useEffect, useState} from "react";
import {FormControlLabel, Switch, TextField} from "@mui/material";
import {form} from "../../../assets/txt/form";
import './Form.css';
import {InputPropsTypes} from "../../../types/InputPropsTypes";

export const CompanyIsFavoriteSwitch = (props: InputPropsTypes) => {

    const [value, setValue] = useState<boolean>(false);
    const [renderOnce, setRenderOnce] = useState<boolean>(false);

    useEffect(() => {
        if (value) {
            props.onChange('1');
        } else {
            props.onChange('0');
        }

    }, [value]);

    if (!renderOnce) {
        if (props.value === '1') {
            setValue(true);
        }
        setRenderOnce(true);
    }


    return (
        <FormControlLabel control={<Switch checked={value} onChange={(e) => {
            setValue(e.target.checked);
        }}/>} label={form[props.lang].companyIsFavoriteSwitchLabel}/>
    );
}