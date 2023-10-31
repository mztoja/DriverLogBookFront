import {Dispatch, SetStateAction} from "react";
import {ActivitiesTypes, GeneralFormData, TourInterface, UserInterface, userLangEnum, DayInterface} from 'types';

export interface ActionsPropsTypes {
    formData: GeneralFormData;
    lang: userLangEnum;
    updateFormData: (key: string, value: string) => void;
    setActivityForm: Dispatch<SetStateAction<ActivitiesTypes | null>>;
    userData: UserInterface;
    setUserData: Dispatch<SetStateAction<UserInterface | null>>,
    tourData: TourInterface | null;
    setTourData: Dispatch<SetStateAction<TourInterface | null>>;
    dayData: DayInterface | null;
    setDayData: Dispatch<SetStateAction<DayInterface | null>>,
}
