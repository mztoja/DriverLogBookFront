import React from 'react';
import {InputPropsTypes} from "../../../../types/InputPropsTypes";
import InputLabel from "@mui/material/InputLabel";
import {MenuItem, Select} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import {days} from "../../../../assets/txt/days";
import { dayCardStateEnum } from 'types';

interface Props extends InputPropsTypes {
    disabled?: boolean;
}

export const DayCardStateSelect = (props: Props) => {
    return (
    <FormControl fullWidth>
        <InputLabel id="vehicleType" className="TextInput__Label">{days[props.lang].dayCardStateSelect.label}</InputLabel>
        <Select
            label={days[props.lang].dayCardStateSelect.label}
            id="dayCardStateSelect"
            onChange={(e) => {
                props.onChange(Number(e.target.value))
            }}
            value={props.value}
            inputProps={{className: 'TextInput'}}
            size='small'
            disabled={props.disabled ? props.disabled : false}
        >
            <MenuItem value={dayCardStateEnum.notUsed}>{days[props.lang].dayCardStateSelect.notUsed}</MenuItem>
            <MenuItem value={dayCardStateEnum.inserted}>{days[props.lang].dayCardStateSelect.inserted}</MenuItem>
            <MenuItem value={dayCardStateEnum.takenOut} disabled>{days[props.lang].dayCardStateSelect.takenOut}</MenuItem>
        </Select>
    </FormControl>);
}