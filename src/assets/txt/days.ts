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
    dayEditHeader: string;
    edit: string;
    editStartLegend: string;
    editStopLegend: string;
    dayCardStateSelect: {
        label: string;
        notUsed: string;
        inserted: string;
        takenOut: string;
    };
    editSuccess: string;
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
        dayEditHeader: 'Edit your workday',
        edit: 'Edit',
        editStartLegend: 'Starting',
        editStopLegend: 'Ending',
        dayCardStateSelect: {
            label: `Driver's card state`,
            notUsed: 'Not used',
            inserted: 'Inserted, not removed',
            takenOut: 'Inserted and removed',
        },
        editSuccess: 'The details of the selected working day have been edited successfully.',
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
        dayEditHeader: 'Edytuj dzień pracy',
        edit: 'Edytuj',
        editStartLegend: 'Rozpoczęcie',
        editStopLegend: 'Zakończenie',
        dayCardStateSelect: {
            label: 'Stan karty kierowcy',
            notUsed: 'Nie używana',
            inserted: 'Włożona, nie wyjęta',
            takenOut: 'Włożona i wyjęta',
        },
        editSuccess: 'Szczegóły wybranego dnia pracy zostały edytowane pomyślnie.',
    },
];