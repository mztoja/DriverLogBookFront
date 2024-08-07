import React, {Dispatch, SetStateAction} from "react";
import {UserInterface, userLangEnum } from "types";
import {ChangeLang} from "./ChangeLang";
import {LogoutLink} from "../../auth/LogoutLink";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {login} from "../../../assets/txt/login";
import {Tooltip} from "@mui/material";
import {NavLink} from "react-router-dom";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {MenuLabelTypes} from "../../../types/MenuLabelTypes";

interface Props {
    setLang?: Dispatch<SetStateAction<userLangEnum>>;
    userData?: UserInterface;
    setUserData?: Dispatch<SetStateAction<UserInterface | null>>;
    page: keyof MenuLabelTypes;
}

export const TopBarRight = (props: Props) => {

    if (props.userData !== undefined) {
        return <>
            <Tooltip title={login[props.userData.lang].vehicles} arrow>
                <NavLink to='/vehicles'>
                    <LocalShippingIcon className={props.page === 'vehicles' ? 'Link__Active' : 'Link'}/>
                </NavLink>
            </Tooltip>
            &nbsp;&nbsp;
            <Tooltip title={login[props.userData.lang].profile} arrow>
                <NavLink to='/profile'>
                    <AccountCircleIcon className={props.page === 'profile' ? 'Link__Active' : 'Link'}/>
                </NavLink>
            </Tooltip>
            &nbsp;&nbsp;
            <LogoutLink lang={props.userData.lang} setUserData={props.setUserData}/>
        </>
    }
    return <ChangeLang setLang={props.setLang}/>
}