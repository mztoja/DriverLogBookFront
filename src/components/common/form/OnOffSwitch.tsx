import React, {useEffect, useState} from "react";
import {FormControlLabel, Switch} from "@mui/material";
import './Form.css';

interface Props {
    label: string;
    value: string;
    onChange: (e: any) => void;
}

export const OnOffSwitch = (props: Props) => {

    const [value, setValue] = useState<boolean>(false);
    const [renderOnce, setRenderOnce] = useState<boolean>(false);

    useEffect(() => {
        if (value) {
            props.onChange('1');
        } else {
            props.onChange('0');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    if (!renderOnce) {
        if (props.value === '1') {
            setValue(true);
        }
        setRenderOnce(true);
    }


    return (
        <FormControlLabel control={<Switch checked={value} onChange={(e) => {
            setValue(e.target.checked);
        }}/>} label={props.label}/>
    );
}