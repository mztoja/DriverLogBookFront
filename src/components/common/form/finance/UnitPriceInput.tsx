import React from "react";
import {extractNumberWithDecimal} from "../../../../utils/extractNumberWithDecimal";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {form} from "../../../../assets/txt/form";
import {OutlinedInput} from "@mui/material";
import {InputPropsTypes} from "../../../../types/InputPropsTypes";

export const UnitPriceInput = (props: InputPropsTypes) => {

    const onChange = (v: string) => {
            const newValue = extractNumberWithDecimal(v);
            props.onChange(newValue);
    }

    return (
        <FormControl sx={{ width: '100px' }}>
            <InputLabel className="TextInput__Label">{form[props.lang].expenseUnitPrice}</InputLabel>
            <OutlinedInput
                id='expenseUnitPrice'
                value={props.value}
                inputProps={{className: 'TextInput'}}
                label={form[props.lang].expenseUnitPrice}
                onChange={(e) => onChange(e.target.value)}
                autoComplete='off'
                size='small'
            />
        </FormControl>
    );
}