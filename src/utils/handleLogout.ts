import {apiPaths} from "../config/api";
import Cookies from "js-cookie";
import {Dispatch, SetStateAction} from "react";
import { UserInterface } from "types";

export const handleLogout = async (setUserData: Dispatch<SetStateAction<UserInterface | null>>, fetchData: any): Promise<void> => {
    await fetchData(apiPaths.logout, 'GET');
    Cookies.remove('jwt');
    setUserData(null);
}