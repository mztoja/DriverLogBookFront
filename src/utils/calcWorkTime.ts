import { DayInterface } from "types";
import { subtractDatesToTime } from "./subtractDatesToTime";

// Liczy czas pracy dnia na bieżąco z jego własnych dat start/stop (day.workTime nie jest już
// przechowywany/aktualizowany po stronie backendu). Dla dnia w toku (brak stopData) liczy
// aktualnie upływający czas na żywo względem "teraz" (ten sam wzorzec co calcBreakTime).
export const calcWorkTime = (day: DayInterface): string => {
    if (!day.startData) {
        return '0:00';
    }
    if (day.stopData) {
        return subtractDatesToTime(day.stopData.date, day.startData.date);
    }
    const startDate = new Date(day.startData.date);
    startDate.setMinutes(startDate.getMinutes() + startDate.getTimezoneOffset());
    const diff = Math.abs(new Date().getTime() - startDate.getTime());
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
};
