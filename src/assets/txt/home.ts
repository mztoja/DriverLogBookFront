interface Home {
    welcome: string;
    subTitle: string;
    fieldDaysLogs: string;
    fieldFinances: string;
    dayStart: string;
    dayStop: string;
    borderCross: string;
    anotherLog: string;
    tourStart: string;
    tourStop: string;
    back: string;
    startedTour: string;
    startedTourAction: string;
    truckNoExist: string;
    fuelQuantityNoExist: string;
    placeNoExist: string;
}

export const home:Home[] = [{
    //en
    welcome: 'Select action from the list below',
    subTitle: `Driver's Log-Book`,
    fieldDaysLogs: 'Days/Logs',
    fieldFinances: 'Finances',
    dayStart: 'Start your day',
    dayStop: 'Finish your day',
    borderCross: 'Border Crossing',
    anotherLog: 'Add another log',
    tourStart: 'Start your tour',
    tourStop: 'Finish your tour',
    back: 'Back',
    startedTour: 'Your tour has started.',
    startedTourAction: 'Route no. has started',
    truckNoExist: 'Please enter truck number.',
    fuelQuantityNoExist: 'Please enter fuel quantity',
    placeNoExist: 'Please choose or enter place activity.',

},{//pl
    welcome: 'Wybierz czynność z listy poniżej',
    subTitle: 'Dziennik Kierowcy',
    fieldDaysLogs: 'Dni/Czynności',
    fieldFinances: 'Finanse',
    dayStart: 'Rozpoczęcie dnia',
    dayStop: 'Zakończenie dnia',
    borderCross: 'Przekroczenie granicy',
    anotherLog: 'Dodaj inną czynność',
    tourStart: 'Rozpocznij trasę',
    tourStop: 'Zakończ trasę',
    back: 'Powrót',
    startedTour: 'Twoja trasa została rozpoczęta.',
    startedTourAction: 'Trasa nr. została rozpoczęta',
    truckNoExist: 'Podaj nr rej. ciągnika.',
    fuelQuantityNoExist: 'Podaj ilość paliwa.',
    placeNoExist: 'Wybierz lub wpisz miejsce czynności.'
}];
