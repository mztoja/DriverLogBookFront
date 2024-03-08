export const formatTimeToTime = (time: string):string => {
    const times = time.split(':');
    const hours = times[0];
    const minutes = times[1];
    return `${hours}:${minutes}`;
}