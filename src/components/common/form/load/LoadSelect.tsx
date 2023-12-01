import React, {useEffect, useState} from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {form} from "../../../../assets/txt/form";
import {CircularProgress, MenuItem, Select} from "@mui/material";
import {InputPropsTypes} from "../../../../types/InputPropsTypes";
import {apiPaths} from "../../../../config/api";
import {useApi} from "../../../../hooks/useApi";
import { LoadInterface } from "types";

export const LoadSelect = (props: InputPropsTypes) => {

    const {loading, fetchData} = useApi();
    const [loadList, setLoadList] = useState<LoadInterface[]>([]);

    useEffect(() => {
        (async () => {
            const result = await fetchData(apiPaths.getNotUnloadedLoads, {
                headers: {'Content-Type': 'application/json'},
                credentials: "include",
            });
            if ((result && result.data) && (!result.data.dtc)) {
                setLoadList(result.data);
            }
        })();
        // eslint-disable-next-line
    }, []);

    if (loading) {
        return <CircularProgress/>
    }

    return (
        <FormControl fullWidth>
            <InputLabel id="vehicle" className="TextInput__Label">{form[props.lang].chooseLoad}</InputLabel>
            <Select
                label={form[props.lang].chooseLoad}
                id="chooseLoad"
                value={props.value}
                onChange={(e) => {
                    props.onChange(e.target.value)
                }}
                inputProps={{className: 'TextInput'}}
                size='small'
            >
                {loadList.map(load => (<MenuItem key={load.id} value={load.id}>{load.description} ({load.weight}kg) - {load.receiverData?.name}, {load.receiverData?.city} ({load.receiverData?.country})</MenuItem>))}

            </Select>
        </FormControl>
    );
}