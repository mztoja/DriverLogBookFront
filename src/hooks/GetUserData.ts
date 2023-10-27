import {apiURL} from "../config/api";
import {UserInterface} from "types";


export const GetUserData = async () => {
    try {
        const res = await fetch(apiURL + '/authentication/user', {
            headers: {'Content-Type': 'application/json'},
            credentials: "include",
        });
        // if (!res.ok) {
        //     throw new Error('User data could not be retrieved');
        // }
        return await res.json();
        // if (data.ok) {
        //     console.log('User data retrieved');
        //     return data;
        // } else {
        //     throw new Error(data.message.en);
        // }
    } catch (err) {
        console.error(err);
    }
}
