import {useEffect} from "react";

export const SetTitle = (value:string) => {
    useEffect(() => {
        document.title = value;
    }, [value]);
}