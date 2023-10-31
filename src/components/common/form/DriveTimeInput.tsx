import React, {useEffect, useState} from "react";
import {FormHelperText, TextField} from "@mui/material";
import {form} from "../../../assets/txt/form";
import {InputPropsTypes} from "../../../types/InputPropsTypes";
import {extractTime} from "../../../utils/extractTime";

export interface Props extends InputPropsTypes {
    secDriver?: boolean;
}

export const DriveTimeInput = (props: Props) => {
    const [time, setTime] = useState('');

    useEffect(() => {
        setTime(extractTime(props.value));
    }, [props.value]);


    return (
        <>
            <TextField
                label={props.secDriver ? form[props.lang].driveTime2 : form[props.lang].driveTime}
                id={props.secDriver ? 'driveTime2' : 'driveTime'}
                InputLabelProps={{className: 'TextInput__Label'}}
                InputProps={{className: 'TextInput'}}
                type="text"
                value={time}
                onChange={props.onChange}
                autoComplete='off'
                size='small'
            />
            <FormHelperText className='TextInput__Label'>
                {props.secDriver ? form[props.lang].driveTimeHelper2 : form[props.lang].driveTimeHelper}
            </FormHelperText>
        </>
    );
}