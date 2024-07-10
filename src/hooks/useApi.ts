import {Dispatch, SetStateAction, useState} from "react";
import { userLangEnum } from "types";
import {apiURL} from "../config/api";
import {SetAlertType} from "../context/AlertContext";
import {handleDtcErrors} from "../utils/handleApiResult";
import {commons} from "../assets/txt/commons";

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface FetchDataResponseOld {
    success: boolean;
    responseData?: any;
}

interface FetchDataResponse<i> {
    success: boolean,
    responseData?: i,
    error?: any,
}

interface Config<i> {
    method?: Method;
    sendData?: any;
    setData?: Dispatch<SetStateAction<i | null>>;
}

interface HandleError {
    setAlert: (text: string, type: SetAlertType) => void;
    lang: userLangEnum;
}


export const useApi = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async <i>(apiPatch: string, config?: Config<i>, handleError?: HandleError): Promise<FetchDataResponse<i>> => {
        setLoading(true);
        if (config && config.sendData && config.setData) {
            throw new Error("You can't specify 'setData' and 'sendData' simultaneously.");
        }
        if (config && !config.sendData && !config.setData) {
            throw new Error("You have to specify: 'setData' or 'sendData'");
        }
        try {
            const method: Method = config && config.method ? config.method : 'GET';
            const response = await fetch(apiURL + apiPatch, {
                method,
                headers: method === 'GET' ? {Accept: 'application/json'} : {'Content-Type': 'application/json'},
                body: method === 'GET' ? null : JSON.stringify(config?.sendData),
                credentials: "include",
            });
            if (response.ok) {
                const responseData = await response.json();
                if (config?.sendData) {
                    if (handleError && responseData.dtc) {
                        const dtc = handleDtcErrors(responseData.dtc, handleError.lang);
                        handleError.setAlert(dtc.message, dtc.type);
                        return {success: false}
                    }
                    return {success: true, responseData};
                } else if (!config || config.setData) {
                    if (!responseData.dtc && responseData) {
                        if (config && config.setData) {
                            config.setData(responseData);
                        }
                        return {success: true, responseData};
                    }
                }
            }
            return {success: false};
        } catch (e) {
            if (config?.sendData && handleError) {
                handleError.setAlert(commons[handleError.lang].apiConnectionError, 'error');
            }
            return {success: false, error: e};
        } finally {
            setLoading(false);
        }
    };

    const fetchDataOld = async (apiPatch: string, method: Method, data?: any): Promise<FetchDataResponseOld> => {
        setLoading(true);
        try {
            const response = await fetch(apiURL + apiPatch, {
                method,
                headers: method === 'GET' ? {Accept: 'application/json'} : {'Content-Type': 'application/json'},
                body: method === 'GET' ? null : JSON.stringify(data),
                credentials: "include",
            });

            const responseData = await response.json();

            if (response.ok) {
                return {success: true, responseData};
            } else {
                return {success: false};
            }

        } catch {
            return {success: false};

        } finally {
            setLoading(false);
        }
    };

    return {loading, fetchDataOld, fetchData};

}


//
//
// import {Dispatch, SetStateAction, useState} from "react";
// import {apiURL} from "../config/api";
//
// // interface FetchDataResponse {
// //     success: boolean;
// //     responseData?: any;
// // }
//
// interface Config {
//     apiPatch: string;
//     method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
//     type?: 'standard' | 'getData' | 'saveData';
//     data?: any;
// }
//
// export const useApi = () => {
//     const [loading, setLoading] = useState<boolean>(false);
//
//     const fetchData = async <DataInterface>(config: Config): Promise<{
//         success: boolean;
//         responseData?: DataInterface;
//     }> => {
//         setLoading(true);
//         try {
//             const method: typeof config.method = config.method ? config.method : "GET";
//             const response = await fetch(apiURL+config.apiPatch, {
//                 method,
//                 headers: method === 'GET' ? {Accept: 'application/json'} : {'Content-Type': 'application/json'},
//                 body: method === 'GET' ? null : JSON.stringify(config.data),
//                 credentials: "include",
//             });
//
//             const responseData = await response.json();
//
//             if (response.ok) {
//                 if (!config.type || config.type === 'standard') {
//                     return { success: true, responseData };
//                 }
//                 else if (config.type === 'getData') {
//                     if (!responseData.dtc && typeof responseData == DataInterface) {
//                         return { success: true, responseData: responseData ? responseData : null};
//                     } else {
//                         return { success: false };
//                     }
//                 }
//                 else {
//                     return { success: false };
//                 }
//             } else {
//                 return { success: false };
//             }
//
//         } catch {
//             return { success: false };
//
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     return { loading, fetchData };
//
// }


//
//
//
// import {useState} from "react";
// import {apiURL} from "../config/api";
//
// interface FetchDataResponse {
//     success: boolean;
//     responseData?: any;
// }
//
// export type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';
//
// export const useApi = () => {
//     const [loading, setLoading] = useState<boolean>(false);
//
//     const fetchData = async (apiPatch: string, method: Method, data?:any): Promise<FetchDataResponse> => {
//         setLoading(true);
//         try {
//             const response = await fetch(apiURL+apiPatch, {
//                 method,
//                 headers: method === 'GET' ? {Accept: 'application/json'} : {'Content-Type': 'application/json'},
//                 body: method === 'GET' ? null : JSON.stringify(data),
//                 credentials: "include",
//             });
//
//             const responseData = await response.json();
//
//             if (response.ok) {
//                 return { success: true, responseData };
//             } else {
//                 return { success: false };
//             }
//
//         } catch {
//             return { success: false };
//
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     return { loading, fetchData };
//
// }