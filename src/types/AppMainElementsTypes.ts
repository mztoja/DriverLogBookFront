import { MenuLabelTypes } from "./MenuLabelTypes";
import { UserInterface, UserLangEnum } from "types";
import { Dispatch, SetStateAction } from "react";

export interface AppMainElementsTypes {
    page?: keyof MenuLabelTypes;
    action?: void;
    userData?: UserInterface;
    lang?: UserLangEnum;
    setUserData?: Dispatch<SetStateAction<UserInterface | null>>;
}