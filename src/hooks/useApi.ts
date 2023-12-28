import {useState} from "react";
import {apiURL} from "../config/api";

interface FetchDataResponse {
    success: boolean;
    responseData?: any;
}

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export const useApi = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async (apiPatch: string, method: Method, data?: any): Promise<FetchDataResponse> => {
        setLoading(true);
        try {
            const response = await fetch(apiURL+apiPatch, {
                method,
                headers: method === 'GET' ? {Accept: 'application/json'} : {'Content-Type': 'application/json'},
                body: method === 'GET' ? null : JSON.stringify(data),
                credentials: "include",
            });
            const responseData = await response.json();
            if (response.ok) {
                return { success: true, responseData };
            } else {
                return { success: false };
            }
        } catch {
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    return { loading, fetchData };

}