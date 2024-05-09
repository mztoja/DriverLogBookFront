import {TourEditData, TourInterface } from "types";

export const defaultValues = (tour:TourInterface | null):TourEditData => ({
    id: 0,
    tourNr: tour?.tourNr ? tour.tourNr.toString() : '0',
    startData: {
        id: 0,
        date: tour?.startLogData?.date ? tour.startLogData.date : '',
        action: tour?.startLogData?.action ? tour.startLogData.action : '',
        country: tour?.startLogData?.country ? tour.startLogData.country : '',
        place: tour?.startLogData?.place ? tour.startLogData.place : '',
        placeId: tour?.startLogData?.placeId ? tour.startLogData.placeId.toString() : '',
        odometer: tour?.startLogData?.odometer ? tour.startLogData.odometer.toString() : '',
        notes: tour?.startLogData?.notes ? tour.startLogData.notes : '',
    },
    stopData: {
        id: 0,
        date: tour?.stopLogData?.date ? tour.stopLogData.date : '',
        action: tour?.stopLogData?.action ? tour.stopLogData.action : '',
        country: tour?.stopLogData?.country ? tour.stopLogData.country : '',
        place: tour?.stopLogData?.place ? tour.stopLogData.place : '',
        placeId: tour?.stopLogData?.placeId ? tour.stopLogData.placeId.toString() : '',
        odometer: tour?.stopLogData?.odometer ? tour.stopLogData.odometer.toString() : '',
        notes: tour?.stopLogData?.notes ? tour.stopLogData.notes : '',
    },
    fuelStateBefore: tour?.fuelStateBefore ? tour.fuelStateBefore.toString() : '0',
    fuelStateAfter: tour?.fuelStateAfter ? tour.fuelStateAfter.toString() : '0',
    expectedSalary: tour?.expectedSalary ? tour.expectedSalary.toString() : '0',
    currency: tour?.currency ? tour.currency : '0',
})