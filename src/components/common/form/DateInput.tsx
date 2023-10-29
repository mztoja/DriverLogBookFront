import React, {useEffect, useState} from "react";
import {TextField} from "@mui/material";
import {form} from "../../../assets/txt/form";
import './Form.css';
import {InputPropsTypes} from "../../../types/InputPropsTypes";

export const DateInput = (props: InputPropsTypes) => {

    const [selectedDate, setSelectedDate] = useState(new Date(new Date().getTime() + 60*60*1000).toISOString().slice(0, 16));

    const handleDateChange = (e: any) => {
        setSelectedDate(e.target.value);
    };

    useEffect(() => {
        props.onChange(selectedDate);
    },[selectedDate, props]);

    return (
        <TextField
            label={form[props.lang].date}
            id="date"
            InputLabelProps={{className: 'TextInput__Label'}}
            InputProps={{className: 'TextInput'}}
            type="datetime-local"
            value={selectedDate}
            onChange={handleDateChange}
            fullWidth
            autoComplete="nope"
            size='small'
        />
    );
}