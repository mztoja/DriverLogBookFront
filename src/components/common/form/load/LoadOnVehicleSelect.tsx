import React, {useEffect, useState} from "react";
import InputLabel from "@mui/material/InputLabel";
import {form} from "../../../../assets/txt/form";
import {CircularProgress, MenuItem, Select} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { userLangEnum } from "types";
import {useApi} from "../../../../hooks/useApi";
import {apiPaths} from "../../../../config/api";

interface Props {
    lang: userLangEnum;
    onChange: (e:any) => void;
    truck: string;
    trailer: string | null;
    value: string;
}

export const LoadOnVehicleSelect = (props: Props) => {

    enum state {
        notFound = 0,
        loadable = 1,
        unloadable = 2,
    }

    const [value, setValue] = useState<string>(props.value);
    const {loading, fetchData} = useApi();
    const [truckState, setTruckState] = useState<number>(state.notFound);
    const [trailerState, setTrailerState] = useState<number>(state.notFound);

    useEffect(() => {
        props.onChange(value);
        // eslint-disable-next-line
    }, [value]);

    useEffect(() => {
        (async () => {
            const result = await fetchData(apiPaths.getVehicleByRegistration + '/' + props.truck, 'GET');
            if ((result && result.responseData) && (!result.responseData.dtc)) {
                if (result.responseData.isLoadable) {
                    setTruckState(state.loadable);
                    value === '' && setValue(props.truck);
                } else {
                    setTruckState(state.unloadable);
                }
            }
            if (props.trailer){
                const result2 = await fetchData(apiPaths.getVehicleByRegistration + '/' + props.trailer, 'GET');
                if ((result2 && result2.responseData) && (!result2.responseData.dtc)) {
                    if (result2.responseData.isLoadable) {
                        setTrailerState(state.loadable);
                        value === '' && setValue(props.trailer);
                    } else {
                        setTrailerState(state.unloadable);
                    }
                }
            }
        })();
        // eslint-disable-next-line
    }, []);

    if (loading) {
        return <CircularProgress/>
    }

    return (
        <FormControl fullWidth>
            <InputLabel id="vehicle" className="TextInput__Label">{form[props.lang].vehicle}</InputLabel>
            <Select
                label={form[props.lang].vehicle}
                id="vehicle"
                value={value}
                onChange={(e) => {setValue(e.target.value)}}
                inputProps={{className: 'TextInput'}}
                size='small'
            >
                {truckState === state.notFound &&
                    <MenuItem value={props.truck}>{props.truck} ({form[props.lang].vehicleDetailsNotFound})</MenuItem>
                }
                {truckState === state.loadable &&
                    <MenuItem value={props.truck}>{props.truck}</MenuItem>
                }
                {truckState === state.unloadable &&
                    <MenuItem value='' disabled>{props.truck}</MenuItem>
                }
                {props.trailer && trailerState === state.notFound &&
                    <MenuItem value={props.trailer}>{props.trailer} ({form[props.lang].vehicleDetailsNotFound})</MenuItem>
                }
                {props.trailer && trailerState === state.loadable &&
                    <MenuItem value={props.trailer}>{props.trailer}</MenuItem>
                }
                {props.trailer && trailerState === state.unloadable &&
                    <MenuItem value=''>{props.trailer}</MenuItem>
                }
            </Select>
        </FormControl>
    );
}