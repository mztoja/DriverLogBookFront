import React, {useEffect} from "react";
import {InputPropsTypes} from "../../../../types/InputPropsTypes";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {MenuItem, Select} from "@mui/material";
import { vehicles } from "../../../../assets/txt/vehicles";
import { vehicleTypeEnum } from "types";

export const VehicleTypeSelect = (props: InputPropsTypes) => {

    const [value, setValue] = React.useState<vehicleTypeEnum>(props.value === '' ? vehicleTypeEnum.truck : Number(props.value));

    useEffect(() => {
        props.onChange(value.toString());
        // eslint-disable-next-line
    }, [value]);

    return (
        <FormControl fullWidth>
            <InputLabel id="vehicleType" className="TextInput__Label">{vehicles[props.lang].type}</InputLabel>
            <Select
                label={vehicles[props.lang].type}
                id="vehicleType"
                onChange={(e) => {setValue(Number(e.target.value))}}
                value={value}
                inputProps={{className: 'TextInput'}}
                size='small'
            >
                <MenuItem value={vehicleTypeEnum.truck}>{vehicles[props.lang].truck}</MenuItem>
                <MenuItem value={vehicleTypeEnum.trailer}>{vehicles[props.lang].trailer}</MenuItem>
            </Select>
        </FormControl>);
}