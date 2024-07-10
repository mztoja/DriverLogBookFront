import { userLangEnum } from "types";

export const formatDate = (dateString: string, lang: number): string => {
    let daysOfWeek = ['(Sun)', '(Mon)', '(Tue)', '(Wed)', '(Thu)', '(Fri)', '(Sat)'];
    if (lang === userLangEnum.pl) {
        daysOfWeek = ['(Niedz)', '(Pon)', '(Wt)', '(Śr)', '(Czw)', '(Pt)', '(Sob)'];
    }
    const date = new Date(dateString);
    const dayOfWeek = daysOfWeek[date.getUTCDay()];
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${dayOfWeek} ${day}.${month}.${year} ${hours}:${minutes}`;
}