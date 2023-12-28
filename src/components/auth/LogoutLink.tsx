import React, {Dispatch, SetStateAction} from "react";
import {UserInterface, userLangEnum} from "types";
import {useApi} from "../../hooks/useApi";
import {CircularProgress, Tooltip} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import {login} from "../../assets/txt/login";
import {handleLogout} from "../../utils/handleLogout";

interface Props {
    lang: userLangEnum;
    setUserData?: Dispatch<SetStateAction<UserInterface | null>>;
}

export const LogoutLink = (props: Props) => {
    const {loading,fetchData} = useApi();
    const click = async () => {
        if (props.setUserData) {
            await handleLogout(props.setUserData, fetchData);
        }
    }


    if (loading) {
        return <CircularProgress/>
    }

    return <Tooltip title={login[props.lang].logout} arrow><LogoutIcon className="Link" onClick={click}/></Tooltip>

}