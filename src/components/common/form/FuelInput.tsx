import React, {useEffect, useState} from "react";
import {FormHelperText, TextField} from "@mui/material";
import { form } from "../../../assets/txt/form";
import './Form.css';
import {InputPropsTypes} from "../../../types/InputPropsTypes";
import {UserFuelContypeEnum} from 'types';
import InputAdornment from "@mui/material/InputAdornment";
import {extractDigits} from "../../../utils/extractDigits";
import {extractNumberWithDecimal} from "../../../utils/extractNumberWithDecimal";

interface Props extends InputPropsTypes {
    type: 'quantity' | 'combustion';
    userFuelConType: UserFuelContypeEnum;
}

export const FuelInput = (props: Props) => {

    const [value, setValue] = useState<string>(props.value);

    useEffect(() => {
        if (props.type === 'quantity') {
            setValue(extractDigits(props.value));
        } else {
            setValue(extractNumberWithDecimal(props.value));
        }

    }, [props.value, props.type]);

    return (
        <>
            <TextField
                label={props.type === 'quantity' ? form[props.lang].fuelQuantity : form[props.lang].fuelCombustion}
                id={props.type === 'quantity' ? 'fuelQuantity' : 'fuelCombustion'}
                InputLabelProps={{className: 'TextInput__Label'}}
                InputProps={{className: 'TextInput',
                    endAdornment: (
                        <InputAdornment className='TextInput' position="end">
                            {props.userFuelConType === UserFuelContypeEnum.per100km
                                ?
                                (<span>L/100km</span>)
                                :
                                (<span>L</span>)
                            }
                        </InputAdornment>
                    ),}}
                type="text"
                value={value}
                onChange={props.onChange}
                autoComplete='off'
                size='small'
            />
            <FormHelperText className='TextInput__Label'>
                {props.type === 'combustion' && props.userFuelConType === UserFuelContypeEnum.liters ? form[props.lang].fuelConTypeHelper1 : null}
                {props.type === 'combustion' && props.userFuelConType === UserFuelContypeEnum.per100km ? form[props.lang].fuelConTypeHelper2 : null}
            </FormHelperText>
        </>
    );
}