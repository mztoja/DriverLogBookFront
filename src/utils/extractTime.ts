export const extractTime = (input: string): string => {
    const regex = /(\d{0,2}):?(\d{0,2})/;
    const match = input.match(regex);

    if (match) {
        let hours = match[1];
        let minutes = match[2];

        hours = hours.replace(/\D/g, '');
        minutes = minutes.replace(/\D/g, '');

        hours = hours.slice(0, 2);

        if (minutes.length > 2) {
            minutes = minutes.slice(0, 2);
        }

        minutes = parseInt(minutes) > 59 ? '59' : minutes;

        if (hours) {
            return hours + (minutes ? ':' + minutes : '');
        }
    }

    return '';
}
