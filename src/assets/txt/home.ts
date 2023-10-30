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
    placeNoExist: string;
    tourExist: string;
    doubleCrew: string;
    cardInserted: string;
    cardTakeOut: string;
    startedDay: string;
    finishedDay: string;
    dayExist: string;
    dayNotExist: string;
    startedDayAction: string;
    startedDayActionCardInsert: string;
    startedDayActionCardTakeOut: string;
    finishedDayAction: string;
    noActiveRoute: string;
    typeFuelBurned: string;
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
    placeNoExist: 'Please choose or enter place activity.',
    tourExist: 'You have already started a route, so you cannot start another one.',
    doubleCrew: 'Double crew',
    cardInserted: `I insert my driver card`,
    cardTakeOut: 'I take out my driver card',
    startedDay: 'You have started your working day.',
    finishedDay: 'You have finished your working day.',
    dayExist: 'You\'ve already started your working day, so you can\'t start the next one until you finish it.',
    dayNotExist: 'You don\'t have a working day that you could finish.',
    startedDayAction: 'Starting the day',
    startedDayActionCardInsert: '(card insert)',
    startedDayActionCardTakeOut: '(card take out)',
    finishedDayAction: 'End of the day',
    noActiveRoute: 'You don\'t have a route to start your working day.',
    typeFuelBurned: 'You forgot to top up the amount of fuel burned.',
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
    placeNoExist: 'Wybierz lub wpisz miejsce czynności.',
    tourExist: 'Masz już rozpoczętą trasę, więc nie możesz rozpocząć kolejnej.',
    doubleCrew: 'Podwójna obsada',
    cardInserted: 'Wkładam kartę kierowcy',
    cardTakeOut: 'Wyciągam kartę kierowcy',
    startedDay: 'Rozpocząłeś swój dzień pracy.',
    finishedDay: 'Zakończyłeś swój dzień pracy.',
    dayExist: 'Masz już rozpoczęty dzień pracy, więc nie możesz zacząć kolejnego do póki go nie zakończysz.',
    dayNotExist: 'Nie masz rozpoczętego dnia pracy który mógłbyś zakończyć.',
    startedDayAction: 'Rozpoczęcie dnia',
    startedDayActionCardInsert: '(włożenie karty)',
    startedDayActionCardTakeOut: '(wyjęcie karty)',
    finishedDayAction: 'Zakończenie dnia',
    noActiveRoute: 'Nie masz rozpoczętej trasy w której można by rozpocząć dzień pracy.',
    typeFuelBurned: 'Zapomniałeś uzupełnić ilośći spalonego paliwa.',
}];
