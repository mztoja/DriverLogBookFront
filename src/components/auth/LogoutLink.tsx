import React, {Dispatch, SetStateAction} from "react";
import {Link} from "react-router-dom";
import {UserInterface, userLangEnum} from "types";
import {apiPaths} from "../../config/api";
import {login} from "../../assets/txt/login";
import {useApi} from "../../hooks/useApi";

interface Props {
    lang: userLangEnum;
    setUserData?: Dispatch<SetStateAction<UserInterface | null>>;
}

export const LogoutLink = (props: Props) => {
    const {fetchData} = useApi();
    const logout = async () => {

        const result = await fetchData(apiPaths.logout, {
            headers: {'Content-Type': 'application/json'},
            credentials: "include",
        });
        if ((result && result.data) && (!result.data.dtc)) {
            if (props.setUserData) props.setUserData(null);
        }
    }

    return <Link to="" className="Link" onClick={logout}>{login[props.lang].logout}</Link>
}