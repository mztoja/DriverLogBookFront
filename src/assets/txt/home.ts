interface Home {
    welcome: string;
    subTitle: string;
    fieldDaysLogs: string;
    fieldFinances: string;
    fieldLoads: string;
    fieldVehicle: string;
    dayStart: string;
    dayStop: string;
    borderCross: string;
    anotherLog: string;
    tourStart: string;
    tourStop: string;
    loadingArrival: string;
    loadingArrivalAction: string;
    loadingArrivalSuccess: string;
    loading: string;
    loadingAction: string;
    loadingSuccess: string;
    loadingPlace: string;
    loadingSender: string;
    loadingReceiver: string;
    loadingSenderSwitchLabel: string;
    unloadingArrival: string;
    unloadingArrivalSuccess: string;
    unloadingArrivalAction: (x: string) => string;
    unloading: string;
    unloadingAction: string;
    unloadingSuccess: string;
    unloadingLoadSelectLabel: string;
    attachTrailer: string;
    attachTrailerAction: string;
    attachTrailerSuccess: string;
    detachTrailer: string;
    detachTrailerAction: string;
    detachTrailerSuccess: string;
    detachTrailerConfirm: (x: number) => string;
    back: string;
    startedTour: string;
    startedTourAction: string;
    truckNoExist: string;
    trailerNoExist: string;
    trailerExist: string;
    noTrailer: string;
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
    anotherActionSuccess: string;
    actionNoExist: string;
    borderCrossAction: string;
    borderCrossSuccess: string;
    countryConflict: string;
    loadingCountryNoExist: string;
    noVehicle: string;
    noWeight: string;
    noDescription: string;
    noLoadChosen: string;
    chosenLoadIsUnloaded: string;
    noLoadReceiver: string;
    addExpense: string;
}

export const home:Home[] = [{
    //en
    welcome: 'Select action from the list below',
    subTitle: `Driver's Log-Book`,
    fieldDaysLogs: 'Days/Logs',
    fieldFinances: 'Finances',
    fieldLoads: 'Loads',
    fieldVehicle: 'Vehicle / service',
    dayStart: 'Start your day',
    dayStop: 'Finish your day',
    borderCross: 'Border Crossing',
    anotherLog: 'Add another log',
    tourStart: 'Start your tour',
    tourStop: 'Finish your tour',
    loadingArrival: 'Arrival for loading',
    loadingArrivalAction: 'Arrival for loading',
    loadingArrivalSuccess: 'The arrival for loading was recorded successfully.',
    loading: 'Loading completed',
    loadingAction: 'Completion of loading no.',
    loadingSuccess: 'Loading completed successfully entered.',
    loadingPlace: 'Loading place',
    loadingSender: 'Sender',
    loadingReceiver: 'Receiver',
    loadingSenderSwitchLabel: 'enter the sender in the place of loading',
    unloadingArrival: 'Ariving at unloading',
    unloadingArrivalSuccess: 'The arrival for loading was recorded successfully.',
    unloadingArrivalAction: (x) => `Arrival for unloading load nr. ${x}`,
    unloading: 'Unloading completed',
    unloadingAction: `Completion of unloading the load no. .value.`,
    unloadingSuccess: 'Unloading completed successfully entered.',
    unloadingLoadSelectLabel: 'enter the receiver in the place of unloading',
    attachTrailer: 'Attach Trailer',
    attachTrailerAction: 'Trailer attached',
    attachTrailerSuccess: 'The trailer has been connected successfully',
    detachTrailer: 'Detach Trailer',
    detachTrailerAction: 'Trailer detached',
    detachTrailerSuccess: 'The trailer has been disconnected successfully',
    detachTrailerConfirm: (x) => `You are trying to unhook the trailer even though you still have ${x === 1 ? 'unloaded load.' : 'unloaded loads.'} If you detach the trailer now, they will be entered as unloaded in the current place with a note that the trailer was detached.`,
    back: 'Back',
    startedTour: 'Your tour has started.',
    startedTourAction: 'Route no. has started',
    truckNoExist: 'Please enter truck number.',
    trailerNoExist: 'Please enter trailer number.',
    placeNoExist: 'Please choose or enter place activity.',
    trailerExist: 'You have already entered the connected trailer',
    noTrailer: 'You don\'t have a trailer attached that you could unhook.',
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
    actionNoExist: 'Please top up the activity field.',
    anotherActionSuccess: 'The activity has been added successfully.',
    borderCrossAction: 'Border crossing',
    borderCrossSuccess: 'Border crossing entered successfully.',
    countryConflict: 'The country entered is the same as the one you are currently in. You must provide the country you are entering.',
    loadingCountryNoExist: 'Please select loading place country.',
    noVehicle: 'You must select a loaded vehicle',
    noWeight: 'You must enter the weight of the load.',
    noDescription: 'You must enter the description of the load.',
    noLoadChosen: 'Please choose the load.',
    chosenLoadIsUnloaded: 'The selected load is already unloaded.',
    noLoadReceiver: 'You cannot enter a receiver as unloading place because the selected load does not have any receiver.',
    addExpense: 'Add expense',
},{//pl
    welcome: 'Wybierz czynność z listy poniżej',
    subTitle: 'Dziennik Kierowcy',
    fieldDaysLogs: 'Dni/Czynności',
    fieldFinances: 'Finanse',
    fieldLoads: 'Ładunki',
    fieldVehicle: 'Pojazd / serwis',
    dayStart: 'Rozpoczęcie dnia',
    dayStop: 'Zakończenie dnia',
    borderCross: 'Przekroczenie granicy',
    anotherLog: 'Dodaj inną czynność',
    tourStart: 'Rozpocznij trasę',
    tourStop: 'Zakończ trasę',
    loadingArrival: 'Dojazd na załadunek',
    loadingArrivalAction: 'Dojazd na załadunek',
    loadingArrivalSuccess: 'Dojazd na załadunek został zapisany pomyślnie.',
    loading: 'Zakończenie załadunku',
    loadingAction: 'Zakończenie załadunku nr.',
    loadingSuccess: 'Pomyślnie wpisano zakończenie załadunku.',
    loadingPlace: 'Miejsce załadunku',
    loadingSender: 'Nadawca',
    loadingReceiver: 'Odbiorca',
    loadingSenderSwitchLabel: 'wpisz nadawcę w miejsce załadunku',
    unloadingArrival: 'Dojazd na rozładunek',
    unloadingArrivalSuccess: 'Dojazd na rozładunek został zapisany pomyślnie.',
    unloadingArrivalAction: (x) => `Dojazd na rozładunek ładunktu nr. ${x}`,
    unloading: 'Zakończenie rozładunku',
    unloadingAction: `Zakończenie rozładunku (ładunek nr. .value.)`,
    unloadingSuccess: 'Pomyślnie wpisano zakończenie rozładunku.',
    unloadingLoadSelectLabel: 'wpisz odbiorcę w miejsce rozładunku',
    attachTrailer: 'Podepnij naczepę',
    attachTrailerAction: 'Podpięto naczepę',
    attachTrailerSuccess: 'Naczepa została podpięta pomyślnie.',
    detachTrailer: 'Odepnij naczepę',
    detachTrailerAction: 'Odpięto naczepę',
    detachTrailerSuccess: 'Naczepa została odpięta pomyślnie.',
    detachTrailerConfirm: (x) => `Próbujesz odczepić naczepę mimo, że masz ciągle ${x} ${x === 1 ? 'nierozładowany ładunek.' : 'nierozładowane ładunki.'} Jeżeli odczepisz teraz naczepę to zostaną one wpisane jako rozładowane w obecnym miejscu z adnotacją, że była odczepiona naczepa.`,
    back: 'Powrót',
    startedTour: 'Twoja trasa została rozpoczęta.',
    startedTourAction: 'Trasa nr. została rozpoczęta',
    truckNoExist: 'Podaj nr. rej. ciągnika.',
    trailerNoExist: 'Podaj nr. rej. naczepy.',
    trailerExist: 'Masz już wpisaną podpiętą przyczepę.',
    noTrailer: 'Nie masz żadnej podpiętej naczepy do odpięcia.',
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
    actionNoExist: 'Uzupełnij czynność którą chcesz wpisać.',
    anotherActionSuccess: 'Wpisana czynność została dodana pomyślnie.',
    borderCrossAction: 'Przekroczenie granicy',
    borderCrossSuccess: 'Pomyślnie wpisano przekroczenie granicy.',
    countryConflict: 'Podany kraj jest taki sam jak ten w którym się obecnie znajdujesz. Musisz podać kraj do którego wjeżdzasz.',
    loadingCountryNoExist: 'Wybierz kraj miejsca załadunku.',
    noVehicle: 'Musisz wybrać załadowany pojazd.',
    noWeight: 'Musisz podać masę ładunku.',
    noDescription: 'Musisz podać opis towaru.',
    noLoadChosen: 'Nie wybrano ładunku',
    chosenLoadIsUnloaded: 'Wybrany ładunek jest już rozładowany.',
    noLoadReceiver: 'Nie można wpisać odbiorcy gdyż wybrany ładunek go nie posiada.',
    addExpense: 'Dodaj wydatek',
}];
