import React, {Dispatch, SetStateAction} from "react";
import {Link} from "react-router-dom";
import {UserInterface, UserLangEnum} from "types";
import {apiURL} from "../../config/api";
import {login} from "../../data/txt/login";

interface Props {
    lang: UserLangEnum;
    setUserData?: Dispatch<SetStateAction<UserInterface | null>>;
}

export const LogoutLink = (props: Props) => {
    const logout = async () => {
        await fetch(apiURL + '/authentication/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: "include",
        });
        if (props.setUserData !== undefined)
        props.setUserData(null);
    }

    return <Link to="login" onClick={logout}>{login[props.lang].logout}</Link>
}