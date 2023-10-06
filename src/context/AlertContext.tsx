import {createContext, ReactNode, useState} from 'react';

const ALERT_TIME = 10000;

type Type = "error" | "success" | "info" | "warning" | undefined | "";

interface InitialState {
    text: string;
    type: Type;
}

const initialState: InitialState = {
    text: '',
    type: '',
};

export const AlertContext = createContext({
    ...initialState,
    setAlert: (text:string, type:Type):void => {},
});

interface Props {
    children?: ReactNode;
}

export const AlertProvider = ({ children }:Props) => {
    const [text, setText] = useState<string>('');
    const [type, setType] = useState<Type>('');

    const setAlert = (text:string, type:Type) => {

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