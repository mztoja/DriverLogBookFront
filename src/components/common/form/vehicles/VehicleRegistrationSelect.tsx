import React, {useEffect, useState} from "react";
import {VehicleInterface, vehicleTypeEnum } from "types";
import {InputPropsTypes} from "../../../../types/InputPropsTypes";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {vehicles} from "../../../../assets/txt/vehicles";
import {CircularProgress, MenuItem, Select} from "@mui/material";
import {apiPaths} from "../../../../config/api";
import {useAlert} from "../../../../hooks/useAlert";
import {useApi} from "../../../../hooks/useApi";

interface Props extends InputPropsTypes {
    companyId: number;
    vehicleType: vehicleTypeEnum;
}

export const VehicleRegistrationSelect = (props: Props) => {

    const {setAlert} = useAlert();
    const {fetchDataOld} = useApi();
    const [value, setValue] = React.useState<number>(Number(props.value));
    const [data, setData] = useState<VehicleInterface[] | null>(null);

    useEffect(() => {
        setData(null);
        setValue(0);
        if (props.vehicleType === vehicleTypeEnum.truck) {
            (async () => {
                const result = await fetchDataOld(apiPaths.getTrucksList, 'GET');
                if ((result && result.responseData) && (!result.responseData.dtc)) {
                    setData(result.responseData);
                } else {
                    setAlert(vehicles[props.lang].apiTrucksError, 'error');
                }
            })();
        }
        if (props.vehicleType === vehicleTypeEnum.trailer) {
            (async () => {
                const result = await fetchDataOld(apiPaths.getTrailersList, 'GET');
                if ((result && result.responseData) && (!result.responseData.dtc)) {
                    setData(result.responseData);
                } else {
                    setAlert(vehicles[props.lang].apiTrailersError, 'error');
                }
            })();
        }
        // eslint-disable-next-line
    }, [props.vehicleType]);

    useEffect(() => {
        props.onChange(value);
        // eslint-disable-next-line
    }, [value]);


    if (data) {
        return (
            <FormControl fullWidth>
                <InputLabel id="vehicleType" className="TextInput__Label">{vehicles[props.lang].registrationPlate}</InputLabel>
                <Select
                    label={vehicles[props.lang].registrationPlate}
                    id="vehicleRegistrationSelect"
                    onChange={(e) => {setValue(Number(e.target.value))}}
                    value={value === 0 ? '' : value}
                    inputProps={{className: 'TextInput'}}
                    size='small'
                >
                    {data
                        .filter(vehicle => (
                            vehicle.companyId === props.companyId
                        ))
                        .map(vehicle => (<MenuItem key={vehicle.id} value={vehicle.id}>{vehicle.registrationNr}</MenuItem>))}
                </Select>
            </FormControl>);
    }
    return <CircularProgress/>;
}