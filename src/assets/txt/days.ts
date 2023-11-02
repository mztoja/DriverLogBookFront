interface Days {
    apiError: string;
    tableHeader: string;
    start: string;
    stop: string;
    odometer: string;
    lp: string;
    tnr: string;
    driveTime: string;
    workTime: string;
    breakTime: string;
    fuel: string;
    na: string;
    curDay: string;
}

export const days: Days[] = [
    {//en
        apiError: 'Your working day\'s list could not be downloaded due to a connection problem. Please try again later.',
        tableHeader: 'Working day\'s list',
        start: 'Getting started',
        stop: 'End of work',
        odometer: 'Odometer',
        lp: 'No.',
        tnr: 'Tour',
        driveTime: 'Drive',
        workTime: 'Work',
        breakTime: 'Break',
        fuel: 'Fuel Cons.',
        na: '- - -',
        curDay: 'Current working day',
    },
    {//pl
        apiError: 'Twoja lista dni pracy nie mogła zostać pobrana z powodu problemu z połączeniem. Spróbuj ponownie później.',
        tableHeader: 'Lista dni pracy',
        start: 'Rozpoczęcie',
        stop: 'Zakończenie',
        odometer: 'Przebieg',
        lp: 'Lp.',
        tnr: 'Trasa',
        driveTime: 'Jazda',
        workTime: 'Praca',
        breakTime: 'Pauza',
        fuel: 'Spalanie',
        na: '- - -',
        curDay: 'Aktualny dzień pracy',
    },
];