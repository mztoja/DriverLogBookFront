import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import {userLangEnum} from "types";
import {commons} from "../../assets/txt/commons";
import {Dispatch, SetStateAction} from "react";

interface Props {
    text: string;
    lang: userLangEnum;
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    execute: () => void;
}

export const WindowConfirm = (props: Props) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => {
        props.setShow(false);
    };

    return (
        <Dialog
            fullScreen={fullScreen}
            open={props.show}
            onClose={handleClose}
            aria-labelledby="responsive-dialog"
        >
            <DialogTitle id="responsive-dialog">
                {commons[props.lang].windowConfirmTitle}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    {commons[props.lang].windowConfirmCancel}
                </Button>
                <Button onClick={() => {handleClose(); props.execute();}} autoFocus>
                    {commons[props.lang].windowConfirmAgree}
                </Button>
            </DialogActions>
        </Dialog>
    );
}