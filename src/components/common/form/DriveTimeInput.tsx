import React, {useEffect} from "react";
import {FormHelperText, TextField} from "@mui/material";
import {form} from "../../../assets/txt/form";
import {InputPropsTypes} from "../../../types/InputPropsTypes";
import {extractTime} from "../../../utils/extractTime";

export interface Props extends InputPropsTypes {
    secDriver?: boolean;
}

export const DriveTimeInput = (props: Props) => {

    useEffect(() => {
        props.onChange(extractTime(props.value))
        // eslint-disable-next-line
    }, []);

    const onChange = (v: string) => {
        const newValue = extractTime(v);
        props.onChange(extractTime(newValue));
    }

    return (
        <>
            <TextField
                label={props.secDriver ? form[props.lang].driveTime2 : form[props.lang].driveTime}
                id={props.secDriver ? 'driveTime2' : 'driveTime'}
                InputLabelProps={{className: 'TextInput__Label'}}
                InputProps={{className: 'TextInput'}}
                type="text"
                value={props.value}
                onChange={(e) => onChange(e.target.value)}
                autoComplete='off'
                size='small'
            />
            <FormHelperText className='TextInput__Label'>
                {props.secDriver ? form[props.lang].driveTimeHelper2 : form[props.lang].driveTimeHelper}
            </FormHelperText>
        </>
    );
}