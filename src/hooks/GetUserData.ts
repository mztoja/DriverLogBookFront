import {apiURL} from "../config/api";
import {UserInterface} from "types";


export const GetUserData = async (): Promise<UserInterface | undefined> => {
    try {
        const res = await fetch(apiURL + '/authentication/user', {
            headers: {'Content-Type': 'application/json'},
            credentials: "include",
        });
        if (!res.ok) {
            throw new Error('User data could not be retrieved');
        }
        const data = await res.json();
        console.log('User data retrieved');
        return data;
    } catch (err) {
        console.log(err);
    }
}
