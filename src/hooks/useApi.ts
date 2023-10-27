import {useState} from "react";
import {apiURL} from "../config/api";

export const useApi = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async (apiPatch: string, options: any) => {
        setLoading(true);

        try {
            const response = await fetch(apiURL+apiPatch, options);
            const data = await response.json();

            if (response.ok) {
                return { success: true, data };
            }

        } catch {
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    return { loading, fetchData };

}