import React from "react";
import {InputPropsTypes} from "../../../../types/InputPropsTypes";
import {extractDigits} from "../../../../utils/extractDigits";
import {TextField} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { vehicles } from "../../../../assets/txt/vehicles";

interface Props extends InputPropsTypes {
    type: 'fuel' | 'weight';
}

export const VehicleWeightAndTankCapacity = (props: Props) => {
    const onChange = (v: string) => {
        const newValue = extractDigits(v);
        props.onChange(newValue);
    }

    return (
        <>
            <TextField
                label={props.type === 'fuel' ? vehicles[props.lang].tankCapacity : vehicles[props.lang].weight}
                id={props.type === 'fuel' ? 'fuelCapacity' : 'vehicleWeight'}
                required={props.type === 'weight'}
                InputLabelProps={{className: 'TextInput__Label'}}
                InputProps={{
                    className: 'TextInput',
                    endAdornment: (
                        <InputAdornment className='TextInput' position="end">
                            {props.type === 'fuel'
                                ? <span>L</span>
                                : <span>kg</span>
                            }
                        </InputAdornment>
                    ),
                }}
                type="text"
                value={props.value === '0' ? '' : props.value}
                onChange={(e) => onChange(e.target.value)}
                autoComplete='off'
                size='small'
            />
        </>
    );
}