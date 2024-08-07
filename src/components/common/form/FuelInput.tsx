import React from "react";
import {FormHelperText, TextField} from "@mui/material";
import { form } from "../../../assets/txt/form";
import './Form.css';
import {InputPropsTypes} from "../../../types/InputPropsTypes";
import {userFuelContypeEnum} from 'types';
import InputAdornment from "@mui/material/InputAdornment";
import {extractDigits} from "../../../utils/extractDigits";
import {extractNumberWithDecimal} from "../../../utils/extractNumberWithDecimal";

interface Props extends InputPropsTypes {
    type: 'quantity' | 'combustion';
    userFuelConType: userFuelContypeEnum;
    disableHelper?: boolean;
}

export const FuelInput = (props: Props) => {

    const onChange = (v: string) => {
        if (props.type === 'quantity') {
            const newValue = extractDigits(v);
            props.onChange(newValue);
        } else {
            const newValue = extractNumberWithDecimal(v);
            props.onChange(newValue);
        }
    }

    return (
        <>
            <TextField
                label={props.type === 'quantity' ? form[props.lang].fuelQuantity : form[props.lang].fuelCombustion}
                id={props.type === 'quantity' ? 'fuelQuantity' : 'fuelCombustion'}
                InputLabelProps={{className: 'TextInput__Label'}}
                InputProps={{className: 'TextInput',
                    endAdornment: (
                        <InputAdornment className='TextInput' position="end">
                            {props.userFuelConType === userFuelContypeEnum.per100km ? (
                                props.type === 'quantity' ? <span>L</span> : <span>L/100km</span>
                            ) : (
                                <span>L</span>
                            )}
                        </InputAdornment>
                    ),}}
                type="text"
                value={props.value}
                onChange={(e) => onChange(e.target.value)}
                autoComplete='off'
                size='small'
            />
            {props.disableHelper &&
                <FormHelperText className='TextInput__Label'>
                    {props.type === 'combustion' && props.userFuelConType === userFuelContypeEnum.liters ? form[props.lang].fuelConTypeHelper1 : null}
                    {props.type === 'combustion' && props.userFuelConType === userFuelContypeEnum.per100km ? form[props.lang].fuelConTypeHelper2 : null}
                </FormHelperText>
            }
        </>
    );
}