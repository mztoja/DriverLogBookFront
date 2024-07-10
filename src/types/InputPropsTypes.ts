import { userLangEnum } from "types";

export interface InputPropsTypes {
    lang: userLangEnum;
    value:string;
    onChange: (e:any) => void;
}