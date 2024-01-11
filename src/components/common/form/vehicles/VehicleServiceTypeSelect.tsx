import React, {useEffect} from "react";
import {InputPropsTypes} from "../../../../types/InputPropsTypes";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {FormHelperText, MenuItem, Select} from "@mui/material";
import { vehicles } from "../../../../assets/txt/vehicles";
import { serviceTypeEnum } from "types";

export const VehicleServiceTypeSelect = (props: InputPropsTypes) => {

    const [value, setValue] = React.useState<serviceTypeEnum>(props.value === '' ? serviceTypeEnum.maintenance : Number(props.value));

    useEffect(() => {
        props.onChange(value.toString());
        // eslint-disable-next-line
    }, [value]);

    return (
        <FormControl fullWidth>
            <InputLabel id="vehicleType" className="TextInput__Label">{vehicles[props.lang].serviceType}</InputLabel>
            <Select
                label={vehicles[props.lang].serviceType}
                id="vehicleServiceType"
                onChange={(e) => {setValue(Number(e.target.value))}}
                value={value}
                inputProps={{className: 'TextInput'}}
                size='small'
            >
                <MenuItem value={serviceTypeEnum.maintenance}>{vehicles[props.lang].serviceMaintenance}</MenuItem>
                <MenuItem value={serviceTypeEnum.service}>{vehicles[props.lang].serviceService}</MenuItem>
            </Select>
            <FormHelperText className="TextInput__Label">
                {value === serviceTypeEnum.maintenance
                    ? vehicles[props.lang].serviceMaintenanceHelper
                    : vehicles[props.lang].serviceServiceHelper
                }
            </FormHelperText>
        </FormControl>);
}