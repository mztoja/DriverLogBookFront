import {LoadEditData, LoadInterface } from "types";

export const defaultValues = (load: LoadInterface | null): LoadEditData => ({
    id: 0,
    loadingLogData: {
        id: 0,
        date: load?.loadingLogData?.date ? load.loadingLogData.date : '',
        action: load?.loadingLogData?.action ? load.loadingLogData.action : '',
        country: load?.loadingLogData?.country ? load.loadingLogData.country : '',
        place: load?.loadingLogData?.place ? load.loadingLogData.place : '',
        placeId: load?.loadingLogData?.placeId ? load.loadingLogData.placeId.toString() : '',
        odometer: load?.loadingLogData?.odometer ? load.loadingLogData.odometer.toString() : '',
        notes: load?.loadingLogData?.notes ? load.loadingLogData.notes : '',
    },
    unloadingLogData: {
        id: 0,
        date: load?.unloadingLogData?.date ? load.unloadingLogData.date : '',
        action: load?.unloadingLogData?.action ? load.unloadingLogData.action : '',
        country: load?.unloadingLogData?.country ? load.unloadingLogData.country : '',
        place: load?.unloadingLogData?.place ? load.unloadingLogData.place : '',
        placeId: load?.unloadingLogData?.placeId ? load.unloadingLogData.placeId.toString() : '',
        odometer: load?.unloadingLogData?.odometer ? load.unloadingLogData.odometer.toString() : '',
        notes: load?.unloadingLogData?.notes ? load.unloadingLogData.notes : '',
    },
    senderId: load?.senderId ? load.senderId.toString() : '0',
    receiverId: load?.receiverId ? load.receiverId.toString() : '0',
    vehicle: load?.vehicle ? load.vehicle : '',
    description: load?.description ? load.description : '',
    quantity: load?.quantity ? load.quantity : '',
    weight: load?.weight ? load.weight.toString() : '',
    reference: load?.reference ? load.reference : '',
    distance: load?.distance ? load.distance.toString() : '',
});