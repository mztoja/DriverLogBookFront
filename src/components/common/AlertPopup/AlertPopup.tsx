import React, {useEffect, useRef} from "react";
import { Alert } from '@mui/material';
import {useAlert} from "../../../hooks/useAlert";

export const AlertPopup = () => {
    const { text, type, setAlert } = useAlert();

    const alertPopupRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (alertPopupRef.current) {
            alertPopupRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [text, type]);

    if (text && type) {
        return (
            <Alert onClick={() => setAlert('', '')} ref={alertPopupRef} severity={type}>{text}</Alert>
        );
    } else {
        return <></>;
    }
};