interface Logs {
    apiError: string;
    tableHeader: string;
    thLp: string;
    thTourNr: string;
    thDate: string;
    thLog: string;
    thCountry: string;
    thPlace: string;
    thOdometer: string;
}

export const logs: Logs[] = [
    {//en
        apiError: 'Your activity list could not be downloaded due to a connection problem. Please try again later.',
        tableHeader: 'Activities List',
        thLp: 'No.',
        thTourNr: 'Tour',
        thDate: 'Date',
        thLog: 'Activity',
        thCountry: 'Country',
        thPlace: 'Place',
        thOdometer: 'Odometer',
    },
    {//pl
        apiError: 'Twoja lista czynności nie mogła zostać pobrana z powodu problemu z połączeniem. Spróbuj ponownie później.',
        tableHeader: 'Lista czynności',
        thLp: 'Lp.',
        thTourNr: 'Trasa',
        thDate: 'Data',
        thLog: 'Czynność',
        thPlace: 'Miejsce',
        thCountry: 'Kraj',
        thOdometer: 'Przebieg',
    },
];