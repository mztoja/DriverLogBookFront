import {commons} from "../assets/txt/commons";
import {login} from "../assets/txt/login";
import {home} from "../assets/txt/home";
import {userLangEnum} from "types";
import {SetAlertType} from "../context/AlertContext";
import {vehicles} from "../assets/txt/vehicles";
import {tours} from "../assets/txt/tours";

interface HandleDtcErrors {
    message: string;
    type: 'warning' | 'info' | 'error';
}

export const handleDtcErrors = (dtc: string, lang: userLangEnum): HandleDtcErrors => {
    switch (dtc) {
        case 'invalidLoginData':
            return {
                message: login[lang].responseError,
                type: 'warning',
            }
        case 'country':
            return {
                message: login[lang].registerCountryNotExist,
                type: 'warning',
            }
        case 'noActiveRoute':
            return {
                message: home[lang].noActiveRoute,
                type: 'info',
            }
        case 'activeRoute':
            return {
                message: home[lang].tourExist,
                type: 'info',
            }
        case 'email':
            return {
                message: login[lang].registerResInvEmail,
                type: 'warning',
            }
        case 'email exist':
            return {
                message: login[lang].registerResEmailExist,
                type: 'warning',
            }
        case 'action':
            return {
                message: home[lang].actionNoExist,
                type: 'info',
            }
        case 'password':
            return {
                message: login[lang].registerResInvPassword,
                type: 'warning',
            }
        case 'companyName':
            return {
                message: login[lang].registerCompanyNameNotExist,
                type: 'warning',
            }
        case 'companyCity':
            return {
                message: login[lang].registerCompanyCityNotExist,
                type: 'warning',
            }
        case 'trailerExist':
            return {
                message: home[lang].trailerExist,
                type: 'info',
            }
        case 'noTrailer':
            return {
                message: home[lang].noTrailer,
                type: 'info',
            }
        case 'countryConflict':
            return {
                message: home[lang].countryConflict,
                type: 'warning',
            }
        case 'activeDay':
            return {
                message: home[lang].dayExist,
                type: 'info',
            }
        case 'dayExistRegardRoute':
            return {
                message: home[lang].dayExistRegardRoute,
                type: 'info',
            }
        case 'vehicle':
            return {
                message: home[lang].noVehicle,
                type: 'warning',
            }
        case 'truck':
            return {
                message: home[lang].truckNoExist,
                type: 'warning',
            }
        case 'weight':
            return {
                message: home[lang].noWeight,
                type: 'warning',
            }
        case 'description':
            return {
                message: home[lang].noDescription,
                type: 'warning',
            }
        case 'name':
            return {
                message: login[lang].registerCompanyNameNotExist,
                type: 'warning',
            }
        case 'city':
            return {
                message: login[lang].registerCompanyCityNotExist,
                type: 'warning',
            }
        case 'fuelCombustion':
            return {
                message: home[lang].typeFuelBurned,
                type: 'warning',
            }
        case 'dayNotExist':
            return {
                message: home[lang].dayNotExist,
                type: 'info',
            }
        case 'loadId':
            return {
                message: home[lang].noLoadChosen,
                type: 'warning',
            }
        case 'noChosenLoad':
            return {
                message: home[lang].noLoadChosen,
                type: 'warning',
            }
        case 'chosenLoadIsUnloaded':
            return {
                message: home[lang].chosenLoadIsUnloaded,
                type: 'warning',
            }
        case 'noLoadReceiver':
            return {
                message: home[lang].noLoadReceiver,
                type: 'warning',
            }
        case 'expenseDescriptionEmpty':
            return {
                message: home[lang].noExpenseDescription,
                type: 'warning',
            }
        case 'addVehicleRegEmpty':
            return {
                message: vehicles[lang].addVehicleRegEmpty,
                type: 'error',
            }
        case 'addVehicleWeightEmpty':
            return {
                message: vehicles[lang].addVehicleWeightEmpty,
                type: 'error',
            }
        case 'vehicleRegExist':
            return {
                message: vehicles[lang].vehicleRegExist,
                type: 'error',
            }
        case 'chooseServicedVehicle':
            return {
                message: vehicles[lang].chooseServicedVehicle,
                type: 'error',
            }
        case 'noServiceEntry':
            return {
                message: vehicles[lang].noServiceEntry,
                type: 'error',
            }
        case 'youHaveToChooseRoutes':
            return {
                message: tours[lang].youHaveToChooseRoutes,
                type: 'warning',
            }
        case 'monthIncorrectFormat':
            return {
                message: tours[lang].monthIncorrectFormat,
                type: 'warning',
            }
        case 'Unauthorized':
            return {
                message: commons[lang].apiUnauthorized,
                type: 'error',
            }
        default:
            return {
                message: commons[lang].apiUnknownError,
                type: 'error',
            }
    }
}

export const handleApiResult = (
    result: any,
    lang: userLangEnum,
    setAlert: (text: string, type: SetAlertType) => void,
    action: () => void
): void => {
    if (result && !result.success) {
        setAlert(commons[lang].apiConnectionError, 'error');
    } else {
        if (result && result.responseData) {
            if (!result.responseData.dtc) {
                action();
            } else {
                const dtc = handleDtcErrors(result.responseData.dtc, lang);
                setAlert(dtc.message, dtc.type);
            }
        }
    }
};