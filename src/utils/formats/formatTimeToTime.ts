export const formatTimeToTime = (time: string):string => {
    const times = time.split(':');
    const hours = times[0];
    const minutes = times[1];
    if (Number(hours) >= 799) {
        return '> 799:99';
    }
    return `${hours}:${minutes}`;
}