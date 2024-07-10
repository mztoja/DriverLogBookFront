import React from "react";
import {TextField} from "@mui/material";
import { form } from "../../../assets/txt/form";
import './Form.css';
import {InputPropsTypes} from "../../../types/InputPropsTypes";
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from "@mui/material/IconButton";

export const SearchInput = (props:InputPropsTypes) => {

    const handleClear = ():void => {
        props.onChange('');
    }

    return (
        <TextField
            label={form[props.lang].search}
            id="search"
            InputLabelProps={{className: 'TextInput__Label'}}
            InputProps={{className: 'TextInput', endAdornment: (
                    <>
                        {props.value.length !== 0 &&
                            <IconButton onClick={handleClear} size="small"><ClearIcon/></IconButton>
                        }
                    </>
                )}}
            type="text"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            fullWidth
            autoComplete="off"
            size='small'
        />
    );
}