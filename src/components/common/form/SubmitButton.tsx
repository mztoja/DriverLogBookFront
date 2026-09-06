import React from "react";
import SendIcon from "@mui/icons-material/Send";
import {ActionButton} from "../ActionButton";

interface Props {
    text: string;
    disabled?: boolean;
}

export const SubmitButton = (props: Props) => {
    return (
        <ActionButton
            type="submit"
            variant="accent"
            large
            iconRight
            icon={<SendIcon/>}
            disabled={props.disabled}
        >
            {props.text}
        </ActionButton>
    );
}
