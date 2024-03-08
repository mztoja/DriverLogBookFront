import { PlaceInterface } from "types";

export const formatSimplePlace = (place: string, placeData: PlaceInterface | null | undefined): string => {
    if (placeData) {
        return placeData.city + ' (' + placeData.name + ')';
    }
    return place;
}