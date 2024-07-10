import { MenuLabelTypes } from "./MenuLabelTypes";
import { UserInterface, userLangEnum } from "types";
import { Dispatch, SetStateAction } from "react";

export interface AppMainElementsTypes {
    page?: keyof MenuLabelTypes;
    action?: void;
    userData?: UserInterface;
    lang?: userLangEnum;
    setUserData?: Dispatch<SetStateAction<UserInterface | null>>;
}