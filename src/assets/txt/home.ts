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
}];
