import React, {Dispatch, SetStateAction} from "react";
import {UserInterface, userLangEnum} from "types";
import {apiPaths} from "../../config/api";
import {useApi} from "../../hooks/useApi";
import {CircularProgress, Tooltip} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import {login} from "../../assets/txt/login";
import Cookies from "js-cookie";

interface Props {
    lang: userLangEnum;
    setUserData?: Dispatch<SetStateAction<UserInterface | null>>;
}

export const LogoutLink = (props: Props) => {
    const {loading,fetchData} = useApi();
    const click = async () => {

        await fetchData(apiPaths.logout, {
            headers: {'Content-Type': 'application/json'},
            credentials: "include",
        });
        Cookies.remove('jwt');
        if (props.setUserData) props.setUserData(null);

        // if ((result && result.data) && (!result.data.dtc)) {
        //     if (props.setUserData) props.setUserData(null);
        // }

    }

    if (loading) {
        return <CircularProgress/>
    }

    return <Tooltip title={login[props.lang].logout} arrow><LogoutIcon className="Link" onClick={click}/></Tooltip>

}