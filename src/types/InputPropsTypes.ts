import { UserLangEnum } from "types";

export interface InputPropsTypes {
    lang: UserLangEnum;
    value:string;
    onChange: (e:any) => void;
}