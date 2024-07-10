import {PlaceInterface, userLangEnum} from "types";
import {formatCountry} from "./formatCountry";

export const formatPlace = (place: string, placeData: PlaceInterface | null | undefined, lang: userLangEnum): JSX.Element => {
    if (placeData) {
        return (
            <>
                <div>{placeData.name}</div>
                <div>{placeData.street}</div>
                <div>{placeData.code} - {placeData.city}</div>
                <div>{formatCountry(placeData.country, lang)}</div>
            </>
        );
    }
    return <>{place}</>;
}