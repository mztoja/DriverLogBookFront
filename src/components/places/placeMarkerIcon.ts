import L from "leaflet";
import {placeTypeEnum} from "types";
import {PixelOffset} from "./markerSpread";

// Osobny kolor pinezki dla każdej kategorii miejsca (paleta Material Design, spójna z resztą UI).
const PLACE_TYPE_COLORS: Record<placeTypeEnum, string> = {
    [placeTypeEnum.other]: '#9e9e9e',
    [placeTypeEnum.base]: '#2196f3',
    [placeTypeEnum.loadingPlace]: '#4caf50',
    [placeTypeEnum.unloadingPlace]: '#ff9800',
    [placeTypeEnum.loadAndunloadPlace]: '#009688',
    [placeTypeEnum.parking]: '#9c27b0',
    [placeTypeEnum.service]: '#795548',
    [placeTypeEnum.customs]: '#f44336',
    [placeTypeEnum.fuelStation]: '#ffc107',
};

// Miejsce z tylko jedną wpisaną współrzędną dostaje przerywaną obwódkę + żółty wykrzyknik —
// jego pozycja na mapie jest z definicji niedokładna (brakująca współrzędna to 0).
const pinSvg = (color: string, partial: boolean): string => `
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" viewBox="0 0 25 41">
        <path fill="${color}" stroke="#000000aa" stroke-width="1" ${partial ? 'stroke-dasharray="3,1.5"' : ''}
            d="M12.5 0C5.6 0 0 5.6 0 12.5c0 9.4 12.5 28.5 12.5 28.5S25 21.9 25 12.5C25 5.6 19.4 0 12.5 0z"/>
        <circle cx="12.5" cy="12.5" r="5.5" fill="#ffffffd0"/>
        ${partial ? `
            <circle cx="19" cy="6" r="5.5" fill="#ffc107" stroke="#000000aa" stroke-width="0.8"/>
            <text x="19" y="8.5" font-size="8" font-weight="bold" text-anchor="middle" fill="#000000">!</text>
        ` : ''}
    </svg>
`;

// Cache ikon per kategoria x kompletność współrzędnych — budujemy L.DivIcon raz,
// nie przy każdym renderze markera.
const iconCache: Map<string, L.DivIcon> = new Map();

// offset – przesunięcie ikony w pikselach, gdy kilka pinezek wypada w tym samym punkcie (markerSpread.ts)
export const getPlaceMarkerIcon = (type: placeTypeEnum, partial: boolean = false, offset: PixelOffset = [0, 0]): L.DivIcon => {
    const key = `${type}_${partial}_${offset[0]}_${offset[1]}`;
    const cached = iconCache.get(key);
    if (cached) {
        return cached;
    }
    const color = PLACE_TYPE_COLORS[type] ?? PLACE_TYPE_COLORS[placeTypeEnum.other];
    const icon = L.divIcon({
        html: pinSvg(color, partial),
        className: 'PlacesMap__pin',
        iconSize: [25, 41],
        iconAnchor: [12 - offset[0], 41 - offset[1]],
        tooltipAnchor: [offset[0], offset[1] - 34],
    });
    iconCache.set(key, icon);
    return icon;
};
