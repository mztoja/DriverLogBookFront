import {dayCardStateEnum, DayEditData, DayInterface } from "types";

export const defaultValues = (day:DayInterface | null):DayEditData => ({
    id: 0,
    startData: {
        id: 0,
        date: day?.startData?.date ? day.startData.date : '',
        action: day?.startData?.action ? day.startData.action : '',
        country: day?.startData?.country ? day.startData.country : '',
        place: day?.startData?.place ? day.startData.place : '',
        placeId: day?.startData?.placeId ? day.startData.placeId.toString() : '',
        odometer: day?.startData?.odometer ? day.startData.odometer.toString() : '',
        notes: day?.startData?.notes ? day.startData.notes : '',
    },
    stopData: {
        id: 0,
        date: day?.stopData?.date ? day.stopData.date : '',
        action: day?.stopData?.action ? day.stopData.action : '',
        country: day?.stopData?.country ? day.stopData.country : '',
        place: day?.stopData?.place ? day.stopData.place : '',
        placeId: day?.stopData?.placeId ? day.stopData.placeId.toString() : '',
        odometer: day?.stopData?.odometer ? day.stopData.odometer.toString() : '',
        notes: day?.stopData?.notes ? day.stopData.notes : '',
    },
    cardState: day?.cardState ? day.cardState : dayCardStateEnum.notUsed,
    distance: day?.distance ? day.distance.toString() : '0',
    driveTime: day?.driveTime ? day.driveTime : '',
    driveTime2: day?.driveTime2 ? day.driveTime2 : '',
    workTime: day?.workTime ? day.workTime : '',
    breakTime: day?.breakTime ? day.breakTime : '',
    fuelBurned: day?.fuelBurned ? day.fuelBurned.toString() : '0',
    doubleCrew: day?.doubleCrew ? 'true' : 'false',
})