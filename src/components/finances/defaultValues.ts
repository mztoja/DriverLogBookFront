import {FinanceEditData, FinanceInterface } from "types";

export const defaultValues = (finance: FinanceInterface | null): FinanceEditData => ({
    id: 0,
    logData: {
        id: 0,
        date: finance?.logData?.date ? finance.logData.date : '',
        action: finance?.logData?.action ? finance.logData.action : '',
        country: finance?.logData?.country ? finance.logData.country : '',
        place: finance?.logData?.place ? finance.logData.place : '',
        placeId: finance?.logData?.placeId ? finance.logData.placeId.toString() : '',
        odometer: finance?.logData?.odometer ? finance.logData.odometer.toString() : '',
        notes: finance?.logData?.notes ? finance.logData.notes : '',
    },
    itemDescription: finance?.itemDescription ? finance.itemDescription : '',
    quantity: finance?.quantity ? finance.quantity.toString() : '',
    amount: finance?.amount ? finance.amount.toString() : '',
    currency: finance?.currency ? finance.currency : '',
    foreignAmount: finance?.foreignAmount ? finance.foreignAmount.toString() : '',
    foreignCurrency: finance?.foreignCurrency ? finance.foreignCurrency : '',
    payment: finance?.payment ? finance.payment : '',
    unitPrice: (Number(finance?.amount)/Number(finance?.quantity)).toFixed(2),
});