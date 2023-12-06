import React, {useEffect, useState} from "react";
import {FormControlLabel, Switch} from "@mui/material";
import './Form.css';

interface Props {
    label: string;
    value: 'false' | 'true';
    onChange: (e: any) => void;
    disabled?: boolean;
}

export const OnOffSwitch = (props: Props) => {

    const [value, setValue] = useState<boolean>(false);
    const [renderOnce, setRenderOnce] = useState<boolean>(false);

    useEffect(() => {
        if (value) {
            props.onChange('true');
        } else {
            props.onChange('false');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    if (!renderOnce) {
        if (props.value === 'true') {
            setValue(true);
        }
        setRenderOnce(true);
    }


    return (
        <FormControlLabel control={<Switch checked={value} disabled={props.disabled} onChange={(e) => {
            setValue(e.target.checked);
        }}/>} label={props.label}/>
    );
}