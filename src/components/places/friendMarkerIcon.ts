import L from "leaflet";

// Pinezka znajomego/własnej pozycji — okrągły awatar z inicjałami, w odróżnieniu od "łezki"
// placeMarkerIcon.ts (miejsca). Osoba z aktywną trasą (ma ładunek w drodze) dostaje mały żółty
// znacznik "T", tak jak niekompletne współrzędne w placeMarkerIcon.ts. Własna pozycja dostaje
// inny kolor niż znajomi, żeby dało się ją odróżnić na pierwszy rzut oka.
const FRIEND_COLOR = '#e91e63';
const SELF_COLOR = '#3f51b5';
const SIZE = 34;

const pinSvg = (color: string, initials: string, onActiveTour: boolean): string => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
        <circle cx="${SIZE / 2}" cy="${SIZE / 2}" r="${SIZE / 2 - 2}" fill="${color}"
            stroke="#ffffff" stroke-width="2"/>
        <text x="${SIZE / 2}" y="${SIZE / 2 + 5}" font-size="13" font-weight="bold"
            text-anchor="middle" fill="#ffffff">${initials}</text>
        ${onActiveTour ? `
            <circle cx="${SIZE - 5}" cy="5" r="5.5" fill="#ffc107" stroke="#000000aa" stroke-width="0.8"/>
            <text x="${SIZE - 5}" y="7.7" font-size="7" font-weight="bold" text-anchor="middle" fill="#000000">T</text>
        ` : ''}
    </svg>
`;

// Cache per kolor x inicjały x aktywna trasa — każda osoba ma inną ikonę (inne inicjały), więc,
// w przeciwieństwie do placeMarkerIcon.ts (stała liczba kategorii), klucz nie jest z góry
// ograniczony, ale liczba znajomych w praktyce jest mała.
const iconCache: Map<string, L.DivIcon> = new Map();

const buildIcon = (color: string, initials: string, onActiveTour: boolean): L.DivIcon => {
    const key = `${color}_${initials}_${onActiveTour}`;
    const cached = iconCache.get(key);
    if (cached) {
        return cached;
    }
    const icon = L.divIcon({
        html: pinSvg(color, initials, onActiveTour),
        className: 'PlacesMap__pin',
        iconSize: [SIZE, SIZE],
        iconAnchor: [SIZE / 2, SIZE / 2],
        tooltipAnchor: [0, -SIZE / 2],
    });
    iconCache.set(key, icon);
    return icon;
};

export const getFriendMarkerIcon = (initials: string, onActiveTour: boolean = false): L.DivIcon =>
    buildIcon(FRIEND_COLOR, initials, onActiveTour);

export const getSelfMarkerIcon = (initials: string, onActiveTour: boolean = false): L.DivIcon =>
    buildIcon(SELF_COLOR, initials, onActiveTour);
