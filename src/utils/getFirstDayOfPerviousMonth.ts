export const getFirstDayOfPreviousMonth = () => {
    const today = new Date();
    let year = today.getUTCFullYear();
    let month = today.getUTCMonth();
    if (month === 0) {
        year--;
        month = 11;
    } else {
        month--;
    }

    return `${year}-${(month + 1).toString().padStart(2, '0')}`;
}