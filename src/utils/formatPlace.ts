import { PlaceInterface } from "types";

export const formatPlace = (place: string, placeData: PlaceInterface | null | undefined): string => {
    if (placeData) {
        return placeData.city + ' (' + placeData.name + ')...';
    }
    return place;
}