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
    generatorHint: string;
    generatorSkippedLegs: (n: number) => string;
    genSectionDrivers: string;
    genSectionTour: string;
    genSectionRefs: string;
    genSectionFuel: string;
    genSectionExpenses: string;
    genSectionLegs: string;
    genSectionOther: string;
    genDriver1: string;
    genDriver2: string;
    genRouteNr: string;
    genDestination: string;
    genTruck: string;
    genTrailer: string;
    genDepartureDate: string;
    genDepartureTime: string;
    genReturnDate: string;
    genReturnTime: string;
    genDepartureOdometer: string;
    genReturnOdometer: string;
    genDistance: string;
    genRef: (n: number) => string;
    genFuelBefore: string;
    genFuelAfter: string;
    genFuelConsumption: string;
    genRefueled: string;
    genFuelDate: (n: number) => string;
    genFuelCity: (n: number) => string;
    genFuelOdometer: (n: number) => string;
    genFuelValue: (n: number) => string;
    genExpense: (n: number) => string;
    genStops: string;
    genOther: string;
    genLeg: (n: number) => string;
    genAddLeg: string;
    genEditLeg: string;
    legStartCity: string;
    legStartData: string;
    legStartOdometer: string;
    legBorderDate: string;
    legBorderPlace: string;
    legStopCity: string;
    legStopData: string;
    legStopOdometer: string;
    legDistance: string;
    legCustomer: string;
    truck: string;
    sectionTime: string;
    sectionFuel: string;
    sectionLoads: string;
    sectionSalary: string;
    statsHeader: string;
    statsTotalLabel: string;
    statsYearLabel: string;
    statsNoData: string;
    statsByMonth: string;
    statsApiError: string;
    monthsShort: string[];
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
        generatorHint: 'Everything below goes to the PDF – check and correct the data, then generate the file.',
        generatorSkippedLegs: (n) => `The template has no room for all legs – ${n} did not fit in the PDF. Merge or remove some legs.`,
        genSectionDrivers: 'Drivers',
        genSectionTour: 'Route',
        genSectionRefs: 'Load reference numbers',
        genSectionFuel: 'Fuel',
        genSectionExpenses: 'Expenses',
        genSectionLegs: 'Route legs',
        genSectionOther: 'Other',
        genDriver1: 'Driver 1',
        genDriver2: 'Driver 2',
        genRouteNr: 'Route no.',
        genDestination: 'Destinations',
        genTruck: 'Truck',
        genTrailer: 'Trailer(s)',
        genDepartureDate: 'Departure date',
        genDepartureTime: 'Departure time',
        genReturnDate: 'Return date',
        genReturnTime: 'Return time',
        genDepartureOdometer: 'Odometer at departure',
        genReturnOdometer: 'Odometer at return',
        genDistance: 'Distance',
        genRef: (n) => `Reference no. ${n}`,
        genFuelBefore: 'Fuel before the route',
        genFuelAfter: 'Fuel after the route',
        genFuelConsumption: 'Fuel usage (l/100 km)',
        genRefueled: 'Refueled in total',
        genFuelDate: (n) => `Refueling ${n} – date`,
        genFuelCity: (n) => `Refueling ${n} – place`,
        genFuelOdometer: (n) => `Refueling ${n} – odometer`,
        genFuelValue: (n) => `Refueling ${n} – quantity`,
        genExpense: (n) => `Expense ${n}`,
        genStops: 'Stops',
        genOther: 'Other remarks',
        genLeg: (n) => `Leg ${n}`,
        genAddLeg: 'Add leg',
        genEditLeg: 'Edit leg',
        legStartCity: 'From',
        legStartData: 'Departure (date and time)',
        legStartOdometer: 'Odometer – start',
        legBorderDate: 'Border – date',
        legBorderPlace: 'Border – place',
        legStopCity: 'To',
        legStopData: 'Arrival (date and time)',
        legStopOdometer: 'Odometer – end',
        legDistance: 'Distance',
        legCustomer: 'Load',
        truck: 'Truck',
        sectionTime: 'Time',
        sectionFuel: 'Fuel',
        sectionLoads: 'Loads',
        sectionSalary: 'Earnings',
        statsHeader: 'Statistics',
        statsTotalLabel: 'All-time totals',
        statsYearLabel: 'Year',
        statsNoData: 'No completed tours yet.',
        statsByMonth: 'By month',
        statsApiError: 'Statistics could not be downloaded. Please try again later.',
        monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
        generatorHint: 'Wszystko poniżej trafi do PDF – sprawdź i popraw dane, a potem wygeneruj plik.',
        generatorSkippedLegs: (n) => `Szablon nie mieści wszystkich odcinków – ${n} nie zmieściło się w PDF. Połącz lub usuń część odcinków.`,
        genSectionDrivers: 'Kierowcy',
        genSectionTour: 'Trasa',
        genSectionRefs: 'Numery referencyjne ładunków',
        genSectionFuel: 'Paliwo',
        genSectionExpenses: 'Wydatki',
        genSectionLegs: 'Odcinki trasy',
        genSectionOther: 'Inne',
        genDriver1: 'Kierowca 1',
        genDriver2: 'Kierowca 2',
        genRouteNr: 'Nr trasy',
        genDestination: 'Miejsca docelowe',
        genTruck: 'Ciągnik',
        genTrailer: 'Naczepa(y)',
        genDepartureDate: 'Data wyjazdu',
        genDepartureTime: 'Godzina wyjazdu',
        genReturnDate: 'Data powrotu',
        genReturnTime: 'Godzina powrotu',
        genDepartureOdometer: 'Licznik przy wyjeździe',
        genReturnOdometer: 'Licznik przy powrocie',
        genDistance: 'Dystans',
        genRef: (n) => `Nr referencyjny ${n}`,
        genFuelBefore: 'Paliwo przed trasą',
        genFuelAfter: 'Paliwo po trasie',
        genFuelConsumption: 'Spalanie (l/100 km)',
        genRefueled: 'Zatankowano łącznie',
        genFuelDate: (n) => `Tankowanie ${n} – data`,
        genFuelCity: (n) => `Tankowanie ${n} – miejsce`,
        genFuelOdometer: (n) => `Tankowanie ${n} – licznik`,
        genFuelValue: (n) => `Tankowanie ${n} – ilość`,
        genExpense: (n) => `Wydatek ${n}`,
        genStops: 'Postoje',
        genOther: 'Inne uwagi',
        genLeg: (n) => `Odcinek ${n}`,
        genAddLeg: 'Dodaj odcinek',
        genEditLeg: 'Edytuj odcinek',
        legStartCity: 'Skąd',
        legStartData: 'Wyjazd (data i godzina)',
        legStartOdometer: 'Licznik – start',
        legBorderDate: 'Granica – data',
        legBorderPlace: 'Granica – miejsce',
        legStopCity: 'Dokąd',
        legStopData: 'Przyjazd (data i godzina)',
        legStopOdometer: 'Licznik – koniec',
        legDistance: 'Dystans',
        legCustomer: 'Ładunek',
        truck: 'Ciągnik',
        sectionTime: 'Czas',
        sectionFuel: 'Paliwo',
        sectionLoads: 'Ładunki',
        sectionSalary: 'Wynagrodzenie',
        statsHeader: 'Statystyki',
        statsTotalLabel: 'Podsumowanie ogółem',
        statsYearLabel: 'Rok',
        statsNoData: 'Brak zakończonych tras.',
        statsByMonth: 'Wg miesiąca',
        statsApiError: 'Nie udało się pobrać statystyk. Spróbuj ponownie później.',
        monthsShort: ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'],
    },
];