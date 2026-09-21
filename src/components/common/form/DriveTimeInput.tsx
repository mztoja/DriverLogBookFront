import React, {useEffect} from "react";
import {FormHelperText, TextField} from "@mui/material";
import {form} from "../../../assets/txt/form";
import {InputPropsTypes} from "../../../types/InputPropsTypes";
import {extractTime} from "../../../utils/extractTime";

export interface Props extends InputPropsTypes {
    secDriver?: boolean;
    label?: string;
    helperText?: string;
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

    const label = props.label ? props.label : (props.secDriver ? form[props.lang].driveTime2 : form[props.lang].driveTime);
    const helperText = props.helperText !== undefined
        ? props.helperText
        : (props.secDriver ? form[props.lang].driveTimeHelper2 : form[props.lang].driveTimeHelper);

    return (
        <>
            <TextField
                label={label}
                id={props.secDriver ? 'driveTime2' : 'driveTime'}
                InputLabelProps={{className: 'TextInput__Label'}}
                InputProps={{className: 'TextInput'}}
                type="text"
                value={props.value}
                onChange={(e) => onChange(e.target.value)}
                autoComplete='off'
                size='small'
            />
            {helperText &&
                <FormHelperText className='TextInput__Label'>
                    {helperText}
                </FormHelperText>
            }
        </>
    );
}