import React from "react";
import SendIcon from "@mui/icons-material/Send";
import {Button} from "@mui/material";

interface Props {
    text: string;
    disabled?: boolean;
}

export const SubmitButton = (props:Props) => {
    return (
        <Button
            variant="contained"
            type="submit"
            size='small'
            endIcon={<SendIcon/>}
            disabled={props.disabled}
        >
            {props.text}
        </Button>
    );
}