interface Tours {
    apiError: string;
    apiError2: string;
    apiError3: string;
    unaccountedRoutes: string;
    tour: string;
    tours: string;
    from: string;
    to: string;
    driveTime: string;
    workTime: string;
    fuel: string;
    before: string;
    after: string;
    burned: string;
    boardComputer: string;
    real: string;
    refueled: string;
    fuelUsage: string;
    averageLoadWeight: string;
    numberOfLoads: string;
    distance: string;
    na: string;
    salary: string;
    predicted: string;
    rate: string;
    perHour: string;
    perKm: string;
    perDay: string;
    outgoings: string;
    onDuty: string;
    offDuty: string;
    start: string;
    stop: string;
    settle: string;
    createMonthlySettlement: string;
    selectRoutes: string;
    chasedTours: string;
    currency: string;
    amountEnter: string;
    monthEnter: string;
    createSettlementSuccess: string;
    youHaveToChooseRoutes: string;
    monthIncorrectFormat: string;
    settlementsHeader: string;
    month: string;
    monthlyToursHeader: (x: string) => string;
    viewRouteList: string;
    details: string;
    close: string;
    showLogs: string;
    showDays: string;
    showFinances: string;
    showLoads: string;
    editHeader: string;
    editStartLegend: string;
    editStopLegend: string;
    edit: string;
    tourNumber: string;
    editSuccess: string;
    generate: string;
    generateError: string;
    generateTitle: (x: string) => string;
    generatorNotFound: string;
    delete: string;
    deleteConfirm: (x: string) => string;
    deleteSuccess: string;
    generatorTourEdit: string;
}

export const tours: Tours[] = [
    {//en
        apiError: 'Your tours list could not be downloaded due to a connection problem. Please try again later.',
        apiError2: 'Your settlements list could not be downloaded due to a connection problem. Please try again later.',
        apiError3: 'Details of your selected tour could not be downloaded due to a connection problem. Please try again later.',
        unaccountedRoutes: 'List of unaccounted routes',
        tour: 'Tour',
        tours: 'Tours',
        from: 'From',
        to: 'To',
        driveTime: 'Drive time',
        workTime: 'Work time',
        fuel: 'Fuel',
        after: 'After',
        before: 'Before',
        burned: 'Burned',
        boardComputer: 'Board Comp.',
        real: 'Real',
        refueled: 'Refueled',
        fuelUsage: 'Fuel usage',
        averageLoadWeight: 'Avg. load weight',
        numberOfLoads: 'Number of loads',
        distance: 'Distance',
        na: '- - -',
        predicted: 'Predicted',
        salary: 'Salary',
        rate: 'Rate',
        perDay: 'per day',
        perHour: 'per hour',
        perKm: 'per km',
        outgoings: 'Outgoings',
        onDuty: 'On duty days',
        offDuty: 'Off duty days',
        start: 'Start of the route',
        stop: 'Stop of the route',
        settle: 'Settle the month',
        createMonthlySettlement: 'Create a monthly settlement',
        selectRoutes: 'Select the routes that you want to settle together as one month',
        chasedTours: 'Chased tours',
        currency: 'Currency',
        amountEnter: 'Enter your net remuneration for the selected routes',
        monthEnter: 'Enter your settlement period',
        createSettlementSuccess: 'The selected routes have been settled successfully.',
        monthIncorrectFormat: 'The wrong settlement period format was entered.',
        youHaveToChooseRoutes: 'You must select at least one route for settlement.',
        settlementsHeader: 'Monthly settlements list',
        month: 'Month',
        monthlyToursHeader: (x) => `List of routes from ${x}`,
        viewRouteList: 'View route list',
        details: 'Show details',
        close: 'Close',
        showLogs: 'Show logs',
        showDays: 'Show days',
        showLoads: 'Show loadings',
        showFinances: 'Show finances',
        editHeader: 'Edit your tour',
        editStartLegend: 'Starting',
        editStopLegend: 'Ending',
        edit: 'Edit',
        tourNumber: 'Tour Number',
        editSuccess: 'The details of the selected route have been edited successfully.',
        generate: 'Generate route settlement',
        generateError: 'There was a problem generating the settlement. Try again.',
        generateTitle: (x) => `Settlement of route no ${x}`,
        generatorNotFound: 'You don\'t have a template assigned. To be able to generate route settlements, you must contact the Administrator.',
        delete: 'Delete',
        deleteConfirm: (x) => `Are you sure you want to remove the settlement from ${x}? Routes covered by them will be marked as unsettled.`,
        deleteSuccess: 'Monthly settlement was successfully deleted and all routes were marked as unbilled.',
        generatorTourEdit: 'Edit your route',
    },
    {//pl
        apiError: 'Twoja lista tras nie mogła zostać pobrana z powodu problemu z połączeniem. Spróbuj ponownie później.',
        apiError2: 'Twoja lista rozliczeń nie mogła zostać pobrana z powodu problemu z połączeniem. Spróbuj ponownie później.',
        apiError3: 'Szczegóły wybranej trasy nie mogły zostać pobrane z powodu problemu z połączeniem. Spróbuj ponownie później.',
        unaccountedRoutes: 'Lista tras nierozliczonych',
        tour: 'Trasa',
        tours: 'Trasy',
        from: 'Od',
        to: 'Do',
        driveTime: 'Czas jazdy',
        workTime: 'Czas pracy',
        fuel: 'Paliwo',
        before: 'Przed',
        after: 'Po',
        burned: 'Spalono',
        real: 'Realnie',
        boardComputer: 'Komp. pok.',
        refueled: 'Zatankowano',
        fuelUsage: 'Spalanie',
        averageLoadWeight: 'Średnia waga ładunku',
        numberOfLoads: 'Suma ładunków',
        distance: 'Dystans',
        na: '- - -',
        predicted: 'Przewidywane',
        salary: 'Wynagrodzenie',
        rate: 'Stawka',
        perKm: 'na km',
        perHour: 'na godzinę',
        perDay: 'na dzień',
        outgoings: 'Wydatki',
        offDuty: 'Dni przerwy',
        onDuty: 'Dni pracy',
        start: 'Rozpoczęcie trasy',
        stop: 'Zakończenie trasy',
        settle: 'Rozlicz miesiąc',
        createMonthlySettlement: 'Stwórz rozliczenie miesiąca',
        selectRoutes: 'Wybierz trasy które chcesz wspólnie rozliczyć jako jeden miesiąc',
        chasedTours: 'Wybrane trasy',
        currency: 'Waluta',
        amountEnter: 'Podaj swoje wynagrodzenie netto za zaznaczone trasy',
        monthEnter: 'Podaj okres rozliczenia',
        createSettlementSuccess: 'Wybrane trasy zostały rozliczone pomyślnie.',
        monthIncorrectFormat: 'Podano zły format okresu rozliczenia.',
        youHaveToChooseRoutes: 'Musisz wybrać conajmniej jedną trasę do rozliczenia.',
        settlementsHeader: 'Lista rozliczeń miesięcznych',
        month: 'Miesiąc',
        monthlyToursHeader: (x) => `Lista tras z ${x}`,
        viewRouteList: 'Wyświetl listę tras',
        details: 'Pokaż szczegóły',
        close: 'Zamknij',
        showLogs: 'Pokaż czynności',
        showDays: 'Pokaż dni pracy',
        showFinances: 'Pokaż finanse',
        showLoads: 'Pokaż ładunki',
        editHeader: 'Edytuj trasę',
        editStartLegend: 'Rozpoczęcie',
        editStopLegend: 'Zakończenie',
        edit: 'Edytuj',
        tourNumber: 'Numer trasy',
        editSuccess: 'Szczegóły wybranej trasy zostały edytowane pomyślnie.',
        generate: 'Generuj rozliczenie trasy',
        generateError: 'Wystąpił problem z generowaniem rozliczenia. Spróbuj ponownie.',
        generateTitle: (x) => `Rozliczenie trasy nr ${x}`,
        generatorNotFound: 'Nie masz przydzielonego szablonu. Aby móc generować rozliczenia tras musisz skontaktować się z Administratorem.',
        delete: 'Usuń',
        deleteConfirm: (x) => `Czy na pewno chcesz usunąć rozliczenie z ${x}? Trasy które pod nie podlegają będą oznaczone jako nie rozliczone.`,
        deleteSuccess: 'Pomyślnie usunięto rozliczenie miesięczne a wszystkie trasy zostały oznaczone jako nierozliczone.',
        generatorTourEdit: 'Edytuj przebieg trasy',
    },
];