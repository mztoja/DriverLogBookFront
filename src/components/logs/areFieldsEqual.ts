import {LogEditData, LogInterface } from "types";

export const areFieldsEqual = (data: LogInterface, formData: LogEditData): boolean => {
    return (
        new Date(data.date).getTime() + (new Date(data.date).getTimezoneOffset() * 60 * 1000) === new Date(formData.date).getTime() &&
        data.action === formData.action &&
        data.country === formData.country &&
        (data.placeId === 0 ? data.place === formData.place : data.placeId.toString() === formData.placeId.toString()) &&
        data.odometer.toString() === formData.odometer.toString() &&
        (
            (data.notes === null && formData.notes === '') ||
            data.notes === formData.notes
        )
    );
}