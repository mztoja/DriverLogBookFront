import React from "react";
import InputLabel from "@mui/material/InputLabel";
import {form} from "../../../../assets/txt/form";
import {OutlinedInput} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import {extractNumberWithDecimal} from "../../../../utils/extractNumberWithDecimal";
import {InputPropsTypes} from "../../../../types/InputPropsTypes";

export const ExpenseQuantityInput = (props: InputPropsTypes) => {
    const onChange = (v: string) => {
        const newValue = extractNumberWithDecimal(v);
        props.onChange(newValue);
    }

    return (
        <FormControl sx={{ width: '100px' }}>
            <InputLabel className="TextInput__Label">{form[props.lang].expenseQuantity}</InputLabel>
            <OutlinedInput
                id='expenseQuantity'
                value={props.value}
                inputProps={{className: 'TextInput'}}
                label={form[props.lang].expenseQuantity}
                onChange={(e) => onChange(e.target.value)}
                autoComplete='off'
                size='small'
            />
        </FormControl>
    );
}