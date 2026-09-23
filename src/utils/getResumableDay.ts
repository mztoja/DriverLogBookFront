import { dayStatusEnum, DayInterface } from "types";

// Szuka najnowszego zakończonego dnia pracy w przekazanej liście dni trasy, który rozpoczął się
// nie więcej niż 15h temu (pojedyncza obsada) / 21h temu (podwójna obsada, wg doubleCrew tego dnia)
// — próg wg jego rozpoczęcia sugeruje, że przerwa nie była pełnym odpoczynkiem, więc dzień
// nadaje się do wznowienia zamiast rozpoczynania nowego.
export const getResumableDay = (days: DayInterface[]): DayInterface | null => {
    const lastFinished = days.find((day) => day.status === dayStatusEnum.finished);
    if (!lastFinished || !lastFinished.startData) {
        return null;
    }
    const thresholdHours = lastFinished.doubleCrew ? 21 : 15;
    const startDate = new Date(lastFinished.startData.date);
    startDate.setMinutes(startDate.getMinutes() + startDate.getTimezoneOffset());
    const elapsedHours = (Date.now() - startDate.getTime()) / 3600000;
    return elapsedHours >= 0 && elapsedHours <= thresholdHours ? lastFinished : null;
};
