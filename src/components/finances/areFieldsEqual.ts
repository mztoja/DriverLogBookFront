import {FinanceEditData, FinanceInterface} from "types";

export const areFieldsEqual = (data: FinanceInterface, formData: FinanceEditData): boolean => {
    if (!data.logData) {
        return false;
    }

    return (
        new Date(data.logData.date).getTime() === new Date(formData.logData.date).getTime() &&
        data.logData.action === formData.logData.action &&
        data.logData.country === formData.logData.country &&
        (data.logData.placeId === 0 ? data.logData.place === formData.logData.place : data.logData.placeId.toString() === formData.logData.placeId.toString()) &&
        data.logData.odometer.toString() === formData.logData.odometer.toString() &&
        (
            (data.logData.notes === null && formData.logData.notes === '') ||
            data.logData.notes === formData.logData.notes
        ) &&
        data.amount.toString() === formData.amount.toString() &&
        data.quantity.toString() === formData.quantity.toString() &&
        data.foreignAmount.toString() === formData.foreignAmount.toString() &&
        data.payment === formData.payment &&
        data.foreignCurrency === formData.foreignCurrency &&
        data.currency === formData.currency &&
        data.itemDescription === formData.itemDescription
    );
};