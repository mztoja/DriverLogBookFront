export const formatDate = (dateString: string, lang: number): string => {
    let daysOfWeek = ['(Sun)', '(Mon)', '(Tue)', '(Wed)', '(Thu)', '(Fri)', '(Sat)'];
    if (lang === 1) {
        daysOfWeek = ['(Niedz)', '(Pon)', '(Wt)', '(Śr)', '(Czw)', '(Pt)', '(Sob)'];
    }
    const date = new Date(dateString); // Załóżmy, że dateString to np. "2023-10-31T22:33:00.000Z"
    const dayOfWeek = daysOfWeek[date.getUTCDay()];
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear().toString().slice(-2);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${dayOfWeek} ${day}.${month}.${year} ${hours}:${minutes}`;
}