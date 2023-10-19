import React, {useEffect, useState} from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {MenuItem, Select} from "@mui/material";
import {commons} from '../../../assets/txt/commons';
import { form } from "../../../assets/txt/form";
import {InputPropsTypes} from "../../../types/InputPropsTypes";

export const LanguageSelect = (props: InputPropsTypes) => {

    const [value, setValue] = useState<number>(Number(props.lang));

    useEffect(() => {
        props.onChange(value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[value]);


    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" className="TextInput__Label">{form[props.lang].lang}</InputLabel>
            <Select
                displayEmpty
                value={value}
                onChange={(e) => {setValue(Number(e.target.value));}}
                label={form[props.lang].lang}
                id="language"
                autoWidth
                required
                inputProps={{className: 'TextInput'}}
                size='small'
            >
                <MenuItem key={0} value={0}>{commons[props.lang].en}</MenuItem>
                <MenuItem key={1} value={1}>{commons[props.lang].pl}</MenuItem>
            </Select>
        </FormControl>);
}