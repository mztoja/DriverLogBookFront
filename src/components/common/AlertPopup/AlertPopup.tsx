import { Alert } from '@mui/material';
import {useAlert} from "../../../hooks/useAlert";

export const AlertPopup = () => {
    const { text, type } = useAlert();

    if (text && type) {
        return (
            <Alert severity={type}>{text}</Alert>
        );
    } else {
        return <></>;
    }
};