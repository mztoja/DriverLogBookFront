import { DayInterface, dayCardStateEnum } from "types";
import { subtractDatesToTime } from "./subtractDatesToTime";

// Odtwarza po stronie frontu regułę parowania dni z użytą kartą, którą wcześniej liczył
// i zapisywał backend (day.breakTime, zob. days.service.ts). `days` musi być posortowane
// malejąco po `id` (tak jak zwraca API: GET /days/get i /days/getByTourId) — wynik liczony
// jest wyłącznie z danych już wczytanych do listy (na bieżąco, bez czytania day.breakTime).
export const calcBreakTime = (days: DayInterface[], day: DayInterface): string | null => {
    if (day.cardState === dayCardStateEnum.notUsed || !day.stopData) {
        return null;
    }
    const idx = days.findIndex(d => d.id === day.id);
    if (idx === -1) {
        return null;
    }
    // szukamy najbliższego kolejnego (wyższe id / późniejszego) dnia z użytą kartą,
    // pomijając po drodze dni z cardState === notUsed
    for (let i = idx - 1; i >= 0; i--) {
        const candidate = days[i];
        if (candidate.cardState !== dayCardStateEnum.notUsed && candidate.startData) {
            return subtractDatesToTime(candidate.startData.date, day.stopData.date);
        }
    }
    // brak jeszcze kolejnego dnia z użytą kartą — przerwa trwa, liczymy na żywo względem
    // teraz (ten sam wzór co licznik w InfoBar.tsx)
    const stopDate = new Date(day.stopData.date);
    stopDate.setMinutes(stopDate.getMinutes() + stopDate.getTimezoneOffset());
    const diff = Math.abs(new Date().getTime() - stopDate.getTime());
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
};
