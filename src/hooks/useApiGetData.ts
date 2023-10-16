import { useState, useEffect } from 'react';
import {apiURL as prefix} from "../config/api";

export const useApiGetData = <T>(apiURL: string) => {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        (async () => {
            await fetch(prefix + apiURL, {
                headers: {'Content-Type': 'application/json'},
                credentials: "include",
            }).then(async res => {
                if (!res.ok) {
                    throw new Error('Data can not be downloaded');
                }
                const data = await res.json();
                setData(data);
                setError(null);
            }).catch(err => {
                setError(err);
            }).finally(() => {
                setLoading(false);
            })
        })();
    }, [apiURL]);

    return { data, loading, error };
}