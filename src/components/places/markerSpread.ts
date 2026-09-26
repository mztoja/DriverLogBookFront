// Kilka pinezek w tym samym punkcie (np. kilku znajomych w tym samym miejscu albo w środku tego
// samego kraju) nakładało się i widać było tylko jedną. Rozkładamy je w małym okręgu wokół punktu –
// przesuwając SAMĄ IKONĘ o piksele (iconAnchor), a nie współrzędne: rozrzut na ekranie jest taki sam
// przy każdym przybliżeniu, a prawdziwa pozycja się nie zmienia. Ten sam algorytm co w aplikacji
// mobilnej (components/places/LeafletMap.tsx).

export type PixelOffset = [number, number];

export interface SpreadPoint {
    key: string;
    lat: number;
    lon: number;
}

// punkty bliżej niż ~1 m traktujemy jako ten sam
const groupKey = (lat: number, lon: number): string => `${lat.toFixed(5)}_${lon.toFixed(5)}`;

export const computeSpreadOffsets = (points: SpreadPoint[]): Map<string, PixelOffset> => {
    const groups = new Map<string, SpreadPoint[]>();
    points.forEach((p) => {
        const g = groupKey(p.lat, p.lon);
        groups.set(g, [...(groups.get(g) ?? []), p]);
    });
    const offsets = new Map<string, PixelOffset>();
    groups.forEach((group) => {
        if (group.length < 2) return;
        // promień rośnie z liczbą pinezek, żeby się nie nakładały (ikona osoby ma 34 px)
        const radius = Math.max(22, (group.length * 36) / (2 * Math.PI));
        group.forEach((p, i) => {
            const angle = (2 * Math.PI * i) / group.length - Math.PI / 2;
            offsets.set(p.key, [Math.round(radius * Math.cos(angle)), Math.round(radius * Math.sin(angle))]);
        });
    });
    return offsets;
};
