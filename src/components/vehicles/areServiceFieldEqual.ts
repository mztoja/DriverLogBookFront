import {ServiceEditData, ServiceInterface} from "types";

export const areServiceFieldEqual = (data: ServiceInterface, formData: ServiceEditData): boolean => {
    if (!data.logData) {
        return false;
    }
    return (
        data.entry === formData.entry &&
        data.type.toString() === formData.type.toString() &&
        new Date(data.logData.date).getTime() === new Date(formData.logData.date).getTime() &&
        data.logData.action === formData.logData.action &&
        data.logData.country === formData.logData.country &&
        (data.logData.placeId === 0 ? data.logData.place === formData.logData.place : data.logData.placeId.toString() === formData.logData.placeId.toString()) &&
        data.logData.odometer.toString() === formData.logData.odometer.toString() &&
        (
            (data.logData.notes === null && formData.logData.notes === '') ||
            data.logData.notes === formData.logData.notes
        )
    );
}