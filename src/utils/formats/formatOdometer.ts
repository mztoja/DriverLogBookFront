export const formatOdometer = (odometer: number): string => {
    if (odometer > 0) {
        return odometer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' km';
    }
    return '0 km';
}