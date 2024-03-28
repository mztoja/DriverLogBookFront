import {ServiceEditData, ServiceInterface, serviceTypeEnum } from "types";

export const serviceDefaultValues = (service: ServiceInterface | null): ServiceEditData => ({
    id: 0,
    logData: {
        id: 0,
        date: service?.logData?.date ? service.logData.date : '',
        action: service?.logData?.action ? service.logData.action : '',
        country: service?.logData?.country ? service.logData.country : '',
        place: service?.logData?.place ? service.logData.place : '',
        placeId: service?.logData?.placeId ? service.logData.placeId.toString() : '',
        odometer: service?.logData?.odometer ? service.logData.odometer.toString() : '0',
        notes: service?.logData?.notes ? service.logData.notes : '',
    },
    type: service?.type ? service.type : serviceTypeEnum.maintenance,
    entry: service?.entry ? service.entry : '',
});