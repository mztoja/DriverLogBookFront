export const formatDateToTime = (dateString: string, addHours?: number) => {

    const date = new Date(dateString);
    if (addHours) {
        date.setHours(date.getHours() + addHours);
    }
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
}