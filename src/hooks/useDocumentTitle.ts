import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {userLangEnum} from "types";
import {labels} from "../assets/txt/menuLabels";
import {commons} from "../assets/txt/commons";
import {MenuLabelTypes} from "../types/MenuLabelTypes";

// Ustawia document.title na podstawie aktywnej trasy.
// Wcześniej robił to TopBar; po przebudowie layoutu TopBar znika, więc tytuł
// ustawiamy centralnie w shellu zalogowanego użytkownika.
const ROUTE_TO_LABEL: Record<string, keyof MenuLabelTypes> = {
    "/": "home",
    "/logs": "logs",
    "/days": "days",
    "/finances": "finances",
    "/loadings": "loadings",
    "/tours": "tours",
    "/places": "places",
    "/profile": "profile",
    "/vehicles": "vehicles",
};

// Klucz etykiety menu dla danej ścieżki – używany też w nagłówku ("D.K. - <nazwa>").
export const routeLabelKey = (pathname: string): keyof MenuLabelTypes =>
    ROUTE_TO_LABEL[pathname] ?? (pathname.startsWith("/vehicles") ? "vehicles" : "home");

export const useDocumentTitle = (lang: userLangEnum): void => {
    const {pathname} = useLocation();
    useEffect(() => {
        document.title = `${commons[lang].title} - ${labels[lang][routeLabelKey(pathname)]}`;
    }, [pathname, lang]);
};
