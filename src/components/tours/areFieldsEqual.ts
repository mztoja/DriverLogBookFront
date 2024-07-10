import {TourEditData, TourInterface} from "types";

export const areFieldsEqual = (data: TourInterface, formData: TourEditData): boolean => {
    if (!data.startLogData) {
        return false;
    }
    const areStartDataEqual: boolean = (
        new Date(data.startLogData.date).getTime() === new Date(formData.startData.date).getTime() &&
        data.startLogData.action === formData.startData.action &&
        data.startLogData.country === formData.startData.country &&
        (data.startLogData.placeId === 0 ? data.startLogData.place === formData.startData.place : data.startLogData.placeId.toString() === formData.startData.placeId.toString()) &&
        data.startLogData.odometer.toString() === formData.startData.odometer.toString() &&
        (
            (data.startLogData.notes === null && formData.startData.notes === '') ||
            data.startLogData.notes === formData.startData.notes
        ) &&
        data.fuelStateBefore.toString() === formData.fuelStateBefore &&
        data.tourNr.toString() === formData.tourNr
    );
    if (!data.stopLogData) {
        return (
            areStartDataEqual
        );
    }
    return (
        areStartDataEqual &&
        new Date(data.stopLogData.date).getTime() === new Date(formData.stopData.date).getTime() &&
        data.stopLogData.action === formData.stopData.action &&
        data.stopLogData.country === formData.stopData.country &&
        (data.stopLogData.placeId === 0 ? data.stopLogData.place === formData.stopData.place : data.stopLogData.placeId.toString() === formData.stopData.placeId.toString()) &&
        data.stopLogData.odometer.toString() === formData.stopData.odometer.toString() &&
        (
            (data.stopLogData.notes === null && formData.stopData.notes === '') ||
            data.stopLogData.notes === formData.stopData.notes
        )
        &&
        data.fuelStateAfter.toString() === formData.fuelStateAfter &&
        data.expectedSalary.toString() === formData.expectedSalary &&
        data.currency === formData.currency
    );
}