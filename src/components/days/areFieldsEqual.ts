import { DayEditData, DayInterface, dayCardStateEnum } from "types";

export const areFieldsEqual = (data: DayInterface, formData: DayEditData): boolean => {

    if (!data.startData) {
        return false;
    }

    const areStartDataEqual: boolean = (
        new Date(data.startData.date).getTime() + (new Date(data.startData.date).getTimezoneOffset() * 60 * 1000) === new Date(formData.startData.date).getTime() &&
        data.startData.action === formData.startData.action &&
        data.startData.country === formData.startData.country &&
        (data.startData.placeId === 0 ? data.startData.place === formData.startData.place : data.startData.placeId.toString() === formData.startData.placeId.toString()) &&
        data.startData.odometer.toString() === formData.startData.odometer.toString() &&
        (
            (data.startData.notes === null && formData.startData.notes === '') ||
            data.startData.notes === formData.startData.notes
        ) &&
        data.doubleCrew === (formData.doubleCrew === 'true') &&
        Number(data.distance) === Number(formData.distance)
    );

    if (!data.stopData) {
        return (
            areStartDataEqual &&
            data.cardState === formData.cardState
        );
    }

    return (
        areStartDataEqual &&
        new Date(data.stopData.date).getTime() + (new Date(data.stopData.date).getTimezoneOffset() * 60 * 1000) === new Date(formData.stopData.date).getTime() &&
        data.stopData.action === formData.stopData.action &&
        data.stopData.country === formData.stopData.country &&
        (data.stopData.placeId === 0 ? data.stopData.place === formData.stopData.place : data.stopData.placeId.toString() === formData.stopData.placeId.toString()) &&
        data.stopData.odometer.toString() === formData.stopData.odometer.toString() &&
        (
            (data.stopData.notes === null && formData.stopData.notes === '') ||
            data.stopData.notes === formData.stopData.notes
        ) &&
        data.driveTime.toString() === formData.driveTime.toString() + ':00' &&
        (formData.doubleCrew !== 'true' || data.driveTime2.toString() === formData.driveTime2.toString() + ':00') &&
        data.workTime.toString() === formData.workTime.toString() + ':00' &&
        (data.cardState === dayCardStateEnum.notUsed ||
            data.breakTime.toString() === formData.breakTime.toString() + ':00') &&
        Number(data.fuelBurned) === Number(formData.fuelBurned)
    );
}