import {countries} from "../../assets/txt/countries";

export const formatCountry = (prefix: string, lang: number): string => {
    return countries[lang][prefix];
}