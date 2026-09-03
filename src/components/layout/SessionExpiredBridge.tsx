import {Dispatch, SetStateAction, useEffect} from "react";
import {UserInterface, userLangEnum} from "types";
import {setSessionExpiredHandler} from "../../utils/apiFetch";
import {commons} from "../../assets/txt/commons";
import {SaveToLocalStorage} from "../../hooks/LocalStorageHook";

interface Props {
    lang: userLangEnum;
    setUserData: Dispatch<SetStateAction<UserInterface | null>>;
}

/**
 * Headless. Rejestruje w apiFetch handler „sesja wygasła": gdy odnowienie sesji
 * (refresh token) się nie powiedzie – zapisuje komunikat i wylogowuje.
 *
 * Komunikat idzie przez localStorage (`alertError`), bo `setUserData(null)`
 * natychmiast odmontowuje AppLayout wraz z jego AlertProvider – ekran logowania
 * ma własny AlertProvider i odczytuje ten klucz przy montowaniu (LoginForm).
 */
export const SessionExpiredBridge = ({lang, setUserData}: Props) => {
    useEffect(() => {
        setSessionExpiredHandler(() => {
            SaveToLocalStorage('alertError', commons[lang].apiUnauthorized);
            setUserData(null);
        });
        return () => setSessionExpiredHandler(null);
    }, [setUserData, lang]);

    return null;
};
