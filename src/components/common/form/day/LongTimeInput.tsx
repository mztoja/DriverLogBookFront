import React, {useEffect} from "react";
import {TextField} from "@mui/material";
import {InputPropsTypes} from "../../../../types/InputPropsTypes";
import {extractTime} from "../../../../utils/extractTime";
import {days} from "../../../../assets/txt/days";

export interface Props extends InputPropsTypes {
    type: 'work' | 'break';
}

export const LongTimeInput = (props: Props) => {

    useEffect(() => {
        const startValue = extractTime(props.value, true);
        if (startValue.indexOf(':') === 1) {
            props.onChange('0' + startValue);
        } else {
            props.onChange(startValue);
        }
        // eslint-disable-next-line
    }, [props.value]);

    const onChange = (v: string) => {
        const newValue = extractTime(v, true);
        props.onChange(extractTime(newValue, true));
    }

    return (
        <>
            <TextField
                label={props.type === 'work' ? days[props.lang].workTime : days[props.lang].breakTime}
                id={props.type === 'work' ? 'workTime' : 'breakTime'}
                InputLabelProps={{className: 'TextInput__Label'}}
                InputProps={{className: 'TextInput'}}
                type="text"
                value={props.value}
                onChange={(e) => onChange(e.target.value)}
                autoComplete='off'
                size='small'
            />
        </>
    );
}