import React from "react";
import {TextField} from "@mui/material";
import { form } from "../../../assets/txt/form";
import './Form.css';
import {InputPropsTypes} from "../../../types/InputPropsTypes";
import {extractDigits} from "../../../utils/extractDigits";
import InputAdornment from "@mui/material/InputAdornment";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { FormHelperText } from "@mui/material";

interface Props extends InputPropsTypes {
    lastOdometer?: number | null;
}

export const OdometerInput = (props: Props) => {

    const onChange = (v: string) => {
        const newValue = extractDigits(v);
        props.onChange(newValue);
    }
    const handleClear = ():void => {
        props.onChange('');
    }
    // +1 km (jak „+1 min" w DateTimeInput); przy pustym polu startujemy od ostatniego licznika
    const handleAdd = ():void => {
        const current = Number(props.value) || Number(props.lastOdometer) || 0;
        props.onChange(String(current + 1));
    }

    return (
        <>
        <TextField
            label={form[props.lang].odometer}
            id="odometer"
            InputLabelProps={{className: 'TextInput__Label'}}
            InputProps={{className: 'TextInput',
                endAdornment: (
                    <>
                        <InputAdornment className='TextInput' position="end">
                            <span>km</span>
                        </InputAdornment>
                        {props.value.length !== 0 &&
                            <IconButton onClick={handleClear} size="small">
                            <ClearIcon />
                            </IconButton>
                        }
                        <IconButton onClick={handleAdd} size="small">
                            <AddIcon />
                        </IconButton>
                    </>
                ),}}
            type="text"
            value={props.value === '0' ? '' : props.value}
            onChange={(e) => onChange(e.target.value)}
            fullWidth
            autoComplete="off"
            size='small'
        />
            {
                props.lastOdometer &&
                <FormHelperText className="TextInput__Label">
                    {form[props.lang].odometerHelperDiff}: {Number(props.value) - props.lastOdometer} km
                </FormHelperText>
            }
        </>
    );
}