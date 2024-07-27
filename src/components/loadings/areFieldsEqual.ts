import {LoadEditData, LoadInterface} from "types";

export const areFieldsEqual = (data: LoadInterface, formData: LoadEditData): boolean => {
    if (!data.loadingLogData) {
        return false;
    }

    const areLoadingDataEqual: boolean = (
        new Date(data.loadingLogData.date).getTime() + (new Date(data.loadingLogData.date).getTimezoneOffset() * 60 * 1000) === new Date(formData.loadingLogData.date).getTime() &&
        data.loadingLogData.action === formData.loadingLogData.action &&
        data.loadingLogData.country === formData.loadingLogData.country &&
        (data.loadingLogData.placeId === 0 ? data.loadingLogData.place === formData.loadingLogData.place : data.loadingLogData.placeId.toString() === formData.loadingLogData.placeId.toString()) &&
        data.loadingLogData.odometer.toString() === formData.loadingLogData.odometer.toString() &&
        (
            (data.loadingLogData.notes === null && formData.loadingLogData.notes === '') ||
            data.loadingLogData.notes === formData.loadingLogData.notes
        ) &&
        data.senderId.toString() === formData.senderId.toString() &&
        data.receiverId.toString() === formData.receiverId.toString() &&
        data.reference === formData.reference &&
        data.description === formData.description &&
        data.weight.toString() === formData.weight.toString() &&
        data.quantity === formData.quantity &&
        data.vehicle === formData.vehicle &&
        data.distance.toString() === formData.distance.toString()
    );

    if (!data.unloadingLogData) {
        return (
            areLoadingDataEqual
        );
    }

    return (
        areLoadingDataEqual &&
        new Date(data.unloadingLogData.date).getTime() + (new Date(data.unloadingLogData.date).getTimezoneOffset() * 60 * 1000) === new Date(formData.unloadingLogData.date).getTime() &&
        data.unloadingLogData.action === formData.unloadingLogData.action &&
        data.unloadingLogData.country === formData.unloadingLogData.country &&
        (data.unloadingLogData.placeId === 0 ? data.unloadingLogData.place === formData.unloadingLogData.place : data.unloadingLogData.placeId.toString() === formData.unloadingLogData.placeId.toString()) &&
        data.unloadingLogData.odometer.toString() === formData.unloadingLogData.odometer.toString() &&
        (
            (data.unloadingLogData.notes === null && formData.unloadingLogData.notes === '') ||
            data.unloadingLogData.notes === formData.unloadingLogData.notes
        )
    );
}