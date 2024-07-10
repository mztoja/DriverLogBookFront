import {LogEditData, LogInterface } from "types";

export const defaultValues = (log: LogInterface | null): LogEditData  => ({
    id: 0,
    date: log?.date ? log.date : '',
    action: log?.action ? log.action : '',
    country: log?.country ? log.country : '',
    place: log?.place ? log.place : '',
    placeId: log?.placeId ? log.placeId.toString() : '',
    odometer: log?.odometer ? log.odometer.toString() : '',
    notes: log?.notes ? log.notes : '',
});