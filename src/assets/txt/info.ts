interface Info {
    routeNo: string;
    distance: string;
    lasts: string;
    and: string;
    day: string;
    days: string;
    in: string;
    youStartedDayAt: string;
    traveledToday: string;
    workingTimeUntil: string;
    truck: string;
    trailer: string;
    fuel: string;
    edit: string;
    showVehicleDetails: string;
    actualMass: string;
    noDataInfo: string;
    empty: string;
    destination: string;
    delete: string;
    deleteSuccess: string;
    close: string;
    noActiveDay: string;
    breakLasts: string;
    break9HourEnd: string;
    break11HourEnd: string;
    breakOver: string;
    breakIn: string;
}

export const info: Info[] = [
    {//en
        routeNo: 'Route no.',
        distance: 'Traveled distance',
        lasts: 'Lasts',
        and: 'and',
        day: 'day',
        days: 'days',
        in: 'in',
        youStartedDayAt: 'You started the day at',
        traveledToday: 'Traveled today',
        workingTimeUntil: 'Working time until',
        truck: 'Truck',
        trailer: 'Trailer',
        fuel: 'Fuel',
        edit: 'Edit vehicle data',
        showVehicleDetails: 'Show vehicle details',
        actualMass: 'Actual mass',
        noDataInfo: 'To know the weight, enter the vehicle details.',
        empty: 'empty',
        destination: 'Destination',
        delete: 'Delete',
        deleteSuccess: 'Marked place was removed successfully.',
        close: 'Close',
        noActiveDay: 'You haven\'t started your working day.',
        breakLasts: 'Break Lasts',
        break9HourEnd: 'The 9-hour break will end at',
        break11HourEnd: 'The 11-hour break will end at',
        breakOver: 'The required daily break has been completed',
        breakIn: 'in',
    },
    {//pl
        routeNo: 'Trasa nr.',
        distance: 'Przejechany dystans',
        lasts: 'Trwa',
        and: 'i',
        days: 'dni',
        day: 'dzień',
        in: 'w',
        youStartedDayAt: 'Rozpocząłeś dzień o',
        traveledToday: 'Dziś przejechałeś',
        workingTimeUntil: 'Czas pracy do',
        truck: 'Ciągnik',
        trailer: 'Naczepa',
        fuel: 'Paliwo',
        edit: 'Edytuj dane pojazdu',
        showVehicleDetails: 'Wyświetl szczegóły pojazdu',
        actualMass: 'Masa rzeczywista',
        noDataInfo: 'Aby znać masę zestawu, wpisz dane pojazdu.',
        empty: 'pusty',
        destination: 'Oznaczono',
        delete: 'Usuń',
        deleteSuccess: 'Pomyślnie usunięto oznaczone miejsce.',
        close: 'Zamknij',
        noActiveDay: 'Nie masz rozpoczętego dnia pracy.',
        breakLasts: 'Przerwa trwa',
        break9HourEnd: '9h przerwy upłynie o',
        break11HourEnd: '11h przerwy upłynie o',
        breakOver: 'Wymagany odpoczynek dobowy został już odebrany',
        breakIn: 'za',
    },
];