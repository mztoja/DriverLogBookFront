import {commons} from "../assets/txt/commons";
import {login} from "../assets/txt/login";
import {home} from "../assets/txt/home";
import {userLangEnum } from "types";
import {SetAlertType} from "../context/AlertContext";

export const handleApiResult = (
    result: any,
    lang: userLangEnum,
    setAlert: (text:string, type:SetAlertType) => void,
    action: () => void
): void => {
    if (result && !result.success) {
        setAlert(commons[lang].apiConnectionError, 'error');
    } else {
        if (result && result.data) {
            if (!result.data.dtc) {
                action();
            } else {
                switch (result.data.dtc) {
                    case 'invalidLoginData':
                        setAlert(login[lang].responseError, 'warning');
                        break;
                    case 'country':
                        setAlert(login[lang].registerCountryNotExist, 'warning');
                        break;
                    case 'noActiveRoute':
                        setAlert(home[lang].noActiveRoute, 'info');
                        break;
                    case 'activeRoute':
                        setAlert(home[lang].tourExist, 'info');
                        break;
                    case 'email':
                        setAlert(login[lang].registerResInvEmail, 'warning');
                        break;
                    case 'email exist':
                            setAlert(login[lang].registerResEmailExist, 'warning');
                            break;
                    case 'action':
                        setAlert(home[lang].actionNoExist, 'info');
                        break;
                    case 'password':
                        setAlert(login[lang].registerResInvPassword, 'warning');
                        break;
                    case 'companyName':
                        setAlert(login[lang].registerCompanyNameNotExist, 'warning');
                        break;
                    case 'companyCity':
                        setAlert(login[lang].registerCompanyCityNotExist, 'warning');
                        break;
                    case 'trailerExist':
                        setAlert(home[lang].trailerExist, 'info');
                        break;
                    case 'noTrailer':
                        setAlert(home[lang].noTrailer, 'info');
                        break;
                    case 'countryConflict':
                        setAlert(home[lang].countryConflict, 'warning');
                        break;
                    case 'activeDay':
                        setAlert(home[lang].dayExist, 'info');
                        break;
                    case 'vehicle':
                        setAlert(home[lang].noVehicle, 'warning');
                        break;
                    case 'truck':
                        setAlert(home[lang].truckNoExist, 'warning');
                        break;
                    case 'weight':
                        setAlert(home[lang].noWeight, 'warning');
                        break;
                    case 'description':
                        setAlert(home[lang].noDescription, 'warning');
                        break;
                    case 'name':
                        setAlert(login[lang].registerCompanyNameNotExist, 'warning');
                        break;
                    case 'city':
                        setAlert(login[lang].registerCompanyCityNotExist, 'warning');
                        break;
                    case 'fuelCombustion':
                        setAlert(home[lang].typeFuelBurned, 'warning');
                        break;
                    case 'dayNotExist':
                        setAlert(home[lang].dayNotExist, 'info');
                        break;
                    case 'loadId':
                        setAlert(home[lang].noLoadChosen, 'warning');
                        break;
                    case 'noChosenLoad':
                        setAlert(home[lang].noLoadChosen, 'warning');
                        break;
                    case 'chosenLoadIsUnloaded':
                        setAlert(home[lang].chosenLoadIsUnloaded, 'warning');
                        break;
                    case 'noLoadReceiver':
                        setAlert(home[lang].noLoadReceiver, 'warning');
                        break;
                    case 'expenseDescriptionEmpty':
                        setAlert(home[lang].noExpenseDescription, 'warning');
                        break;
                    case 'Unauthorized':
                        setAlert(commons[lang].apiUnauthorized, 'error');
                        break;
                    default:
                        setAlert(commons[lang].apiUnknownError, 'error');
                        break;
                }
            }
        }
    }
};