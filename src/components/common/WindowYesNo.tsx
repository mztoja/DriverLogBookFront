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

interface Props {
    text: string;
    lang: userLangEnum;
    show: boolean;
    onYes: () => void;
    onNo: () => void;
}

// Jak WindowConfirm, ale oba przyciski kontynuują (wywołują callback).
// Widocznością steruje w pełni rodzic przez `show`.
export const WindowYesNo = (props: Props) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Dialog
            fullScreen={fullScreen}
            open={props.show}
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
                <Button onClick={props.onNo}>
                    {commons[props.lang].no}
                </Button>
                <Button onClick={props.onYes} autoFocus>
                    {commons[props.lang].yes}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
