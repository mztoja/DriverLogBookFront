import React, {useEffect, useState} from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {MenuItem, Select} from "@mui/material";
import { form } from "../../../../assets/txt/form";
import {InputPropsTypes} from "../../../../types/InputPropsTypes";

export const PlaceTypeSelect = (props: InputPropsTypes) => {

    const [value, setValue] = useState<number | null>(Number(props.value));

    useEffect(() => {
        props.onChange(value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[value]);

    return (
        <FormControl>
            <InputLabel id="placeType" className="TextInput__Label">{form[props.lang].placeType}</InputLabel>
            <Select
                label={form[props.lang].placeType}
                id="placeType"
                value={props.value ? props.value : '0'}
                onChange={(e) => {setValue(Number(e.target.value));}}
                inputProps={{className: 'TextInput'}}
                size='small'
            >
                <MenuItem value={0}>{form[props.lang].placeType0}</MenuItem>
                <MenuItem value={1}>{form[props.lang].placeType1}</MenuItem>
                <MenuItem value={2}>{form[props.lang].placeType2}</MenuItem>
                <MenuItem value={3}>{form[props.lang].placeType3}</MenuItem>
                <MenuItem value={4}>{form[props.lang].placeType4}</MenuItem>
                <MenuItem value={5}>{form[props.lang].placeType5}</MenuItem>
                <MenuItem value={6}>{form[props.lang].placeType6}</MenuItem>
                <MenuItem value={7}>{form[props.lang].placeType7}</MenuItem>
            </Select>
        </FormControl>);
}