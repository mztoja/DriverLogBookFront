import {createContext, ReactNode, useState} from 'react';
import {ALERT_TIME} from "../config/set";


export type SetAlertType = "error" | "success" | "info" | "warning" | undefined | "";

interface InitialState {
    text: string;
    type: SetAlertType;
}

const initialState: InitialState = {
    text: '',
    type: '',
};

export const AlertContext = createContext({
    ...initialState,
    setAlert: (text:string, type:SetAlertType):void => {},
});

interface Props {
    children?: ReactNode;
}

export const AlertProvider = ({ children }:Props) => {
    const [text, setText] = useState<string>('');
    const [type, setType] = useState<SetAlertType>('');

    const setAlert = (text:string, type:SetAlertType) => {

        if (type !== undefined) {

            setText(text);
            setType(type);



            setTimeout(() => {
                setText('');
                setType('');
            }, ALERT_TIME);

        }
    };

    return (
        <AlertContext.Provider
            value={{
                text,
                type,
                setAlert,
            }}
        >
            {children}
        </AlertContext.Provider>
    );
};