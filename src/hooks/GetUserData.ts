import {apiURL} from "../config/api";
import { UserInterface } from "types";


    export const GetUserData = async ():Promise<UserInterface | undefined> => {
        try {
            console.log('probuje pobrac dane')
            const res = await fetch(apiURL + '/authentication/user', {
                headers: {'Content-Type': 'application/json'},
                credentials: "include",
            });
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            console.log('pobrano ', data);
            return data;
        } catch(e) {
            console.log('Error: ', e);
        }
    }
