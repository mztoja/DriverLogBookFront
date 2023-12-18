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
                setAlert(commons[lang].apiUnknownError, 'error');
                if (result.data.dtc === 'invalidLoginData') {
                    setAlert(login[lang].responseError, 'warning');
                }
                if (result.data.dtc === 'country') {
                    setAlert(login[lang].registerCountryNotExist, 'warning');
                }
                if (result.data.dtc === 'noActiveRoute') {
                    setAlert(home[lang].noActiveRoute, 'info');
                }
                if (result.data.dtc === 'activeRoute') {
                    setAlert(home[lang].tourExist, 'info');
                }
                if (result.data.dtc === 'email') {
                    setAlert(login[lang].registerResInvEmail, 'warning');
                }
                if (result.data.dtc === 'email exist') {
                    setAlert(login[lang].registerResEmailExist, 'warning');
                }
                if (result.data.dtc === 'action') {
                    setAlert(home[lang].actionNoExist, 'info');
                }
                if (result.data.dtc === 'password') {
                    setAlert(login[lang].registerResInvPassword, 'warning');
                }
                if (result.data.dtc === 'companyName') {
                    setAlert(login[lang].registerCompanyNameNotExist, 'warning');
                }
                if (result.data.dtc === 'companyCity') {
                    setAlert(login[lang].registerCompanyCityNotExist, 'warning');
                }
                if (result.data.dtc === 'trailerExist') {
                    setAlert(home[lang].trailerExist, 'info');
                }
                if (result.data.dtc === 'noTrailer') {
                    setAlert(home[lang].noTrailer, 'info');
                }
                if (result.data.dtc === 'countryConflict') {
                    setAlert(home[lang].countryConflict, 'warning');
                }
                if (result.data.dtc === 'activeDay') {
                    setAlert(home[lang].dayExist, 'info');
                }
                if (result.data.dtc === 'vehicle') {
                    setAlert(home[lang].noVehicle, 'warning');
                }
                if (result.data.dtc === 'truck') {
                    setAlert(home[lang].truckNoExist, 'warning');
                }
                if (result.data.dtc === 'weight') {
                    setAlert(home[lang].noWeight, 'warning');
                }
                if (result.data.dtc === 'description') {
                    setAlert(home[lang].noDescription, 'warning');
                }
                if (result.data.dtc === 'name') {
                    setAlert(login[lang].registerCompanyNameNotExist, 'warning');
                }
                if (result.data.dtc === 'city') {
                    setAlert(login[lang].registerCompanyCityNotExist, 'warning');
                }
                if (result.data.dtc === 'fuelCombustion') {
                    setAlert(home[lang].typeFuelBurned, 'warning');
                }
                if (result.data.dtc === 'dayNotExist') {
                    setAlert(home[lang].dayNotExist, 'info');
                }
                if (result.data.dtc === 'loadId') {
                    setAlert(home[lang].noLoadChosen, 'warning');
                }
                if (result.data.dtc === 'noChosenLoad') {
                    setAlert(home[lang].noLoadChosen, 'warning');
                }
                if (result.data.dtc === 'chosenLoadIsUnloaded') {
                    setAlert(home[lang].chosenLoadIsUnloaded, 'warning');
                }
                if (result.data.dtc === 'noLoadReceiver') {
                    setAlert(home[lang].noLoadReceiver, 'warning');
                }
                if (result.data.dtc === 'Unauthorized') {
                    setAlert(commons[lang].apiUnauthorized, 'error');
                }
            }
        }
    }
};