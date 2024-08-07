import React, {useEffect, useState} from "react";
import {TextField} from "@mui/material";
import {form} from "../../../assets/txt/form";
import './Form.css';
import {InputPropsTypes} from "../../../types/InputPropsTypes";

interface Props extends InputPropsTypes {
    valueAsDefault?: boolean;
}

const formatLocalDateTime = (date: any) => {
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - (offset * 60 * 1000));
    return localDate.toISOString().slice(0, 16);
};

export const DateTimeInput = (props: Props) => {

    const [selectedDate, setSelectedDate] = useState(
        props.valueAsDefault
            ? new Date(new Date(props.value).getTime()).toISOString().slice(0, 16)
            : formatLocalDateTime(new Date())
    );

    const handleDateChange = (e: any) => {
        if (!isNaN(Date.parse(e.target.value))) {
            setSelectedDate(e.target.value);
        }
    };

    useEffect(() => {
        props.onChange(selectedDate);
    },[selectedDate, props]);

    return (
        <TextField
            label={form[props.lang].date}
            id="datetime"
            InputLabelProps={{className: 'TextInput__Label'}}
            InputProps={{className: 'TextInput'}}
            type="datetime-local"
            value={selectedDate}
            onChange={handleDateChange}
            fullWidth
            autoComplete="off"
            size='small'
        />
    );
}