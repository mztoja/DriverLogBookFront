import React, {useEffect, useState} from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {MenuItem, Select} from "@mui/material";
import { form } from "../../../assets/txt/form";
import {InputPropsTypes} from "../../../types/InputPropsTypes";

export const BidTypeSelect = (props: InputPropsTypes) => {

    const [value, setValue] = useState<number>(Number(props.value));

    useEffect(() => {
        props.onChange(value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[value]);

    return (
        <FormControl fullWidth>
            <InputLabel id="bidType" className="TextInput__Label">{form[props.lang].bidType}</InputLabel>
            <Select
                label={form[props.lang].bidType}
                id="bidType"
                value={props.value ? props.value : '0'}
                onChange={(e) => {setValue(Number(e.target.value));}}
                inputProps={{className: 'TextInput'}}
            >
                <MenuItem value={0}>{form[props.lang].bidType0}</MenuItem>
                <MenuItem value={1}>{form[props.lang].bidType1}</MenuItem>
                <MenuItem value={2}>{form[props.lang].bidType2}</MenuItem>
                <MenuItem value={3}>{form[props.lang].bidType3}</MenuItem>
            </Select>
        </FormControl>);
}