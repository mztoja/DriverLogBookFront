export const formatOdometer = (odometer: number): string => {
    return odometer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' km';
}