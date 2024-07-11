import {formatOdometer} from "../../utils/formats/formatOdometer";
import {formatFuelCombustion} from "../../utils/formats/formatFuelCombustion";

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
    unloadingArrivalAction: string;
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
    finishedTour: string;
    finishedTourAction: string;
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
    dayExistRegardRoute: string;
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
    addedExpenseActionSuccess: string;
    noExpenseDescription: string;
    expenseAddAction: string;
    addFuelRefuel: string;
    addDefRefuel: string;
    addService: string;
    addLubrication: string;
    addServiceSuccess: string;
    addServiceAction: string;
    tourStopHelper1: string;
    tourStopHelper2: (distance: number, burnedFuel: number) => string;
    finishTourUnloadedLoadsConfirm: (x: number) => string;
    finishTourUnloadNote: string;
    cannotEditSettledTourData: string;
    notes: string;
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
    loadingAction: 'Loading completed',
    loadingSuccess: 'Loading completed successfully entered.',
    loadingPlace: 'Loading place',
    loadingSender: 'Sender',
    loadingReceiver: 'Receiver',
    loadingSenderSwitchLabel: 'enter the sender in the place of loading',
    unloadingArrival: 'Ariving at unloading',
    unloadingArrivalSuccess: 'The arrival for loading was recorded successfully.',
    unloadingArrivalAction: `Arrival for unloading`,
    unloading: 'Unloading completed',
    unloadingAction: `Unloading completed`,
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
    startedTourAction: 'The tour has started',
    finishedTour: 'Your tour has been finished.',
    finishedTourAction: 'Route completed',
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
    dayExistRegardRoute: 'You cannot finish your route until you finish your current working day.',
    dayNotExist: 'You don\'t have a working day that you could finish.',
    startedDayAction: 'Starting the day',
    startedDayActionCardInsert: '(card insert)',
    startedDayActionCardTakeOut: '(card take out)',
    finishedDayAction: 'End of the day',
    noActiveRoute: 'You don\'t have a route to write this activity.',
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
    addedExpenseActionSuccess: 'The expense has been added successfully.',
    noExpenseDescription: 'You must enter a description of the expense (item).',
    expenseAddAction: 'Expense added:',
    addFuelRefuel: 'Diesel refueling',
    addDefRefuel: 'Def refueling',
    addService: 'AddService / Maintenance',
    addLubrication: '5th Wheel Lubrication',
    addServiceSuccess: 'Vehicle service activity successfully added.',
    addServiceAction: 'Vehicle maintenance/service entry added',
    tourStopHelper1: 'The proposed value was calculated based on on-board computer data. It\'s recommended to measure manually to increase the accuracy of combustion results.',
    tourStopHelper2: (distance, burnedFuel) => `You passed ${formatOdometer(distance)}. Avg. fuel usage: ${formatFuelCombustion(burnedFuel, distance)}`,
    finishTourUnloadedLoadsConfirm: (x) => `You try to finish the route even though you still have ${x} ${x === 1 ? 'unloaded load.' : 'unloaded loads.'} If you finish the route, they will be described in the system as unloaded with a note in the notes that they were marked as such due to the end of the route.`,
    finishTourUnloadNote: 'Marked as unloaded due to end of tour',
    cannotEditSettledTourData: 'You cannot edit data assigned to a route that has already been settled.',
    notes: 'Notes',
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
    loadingAction: 'Zakończenie załadunku',
    loadingSuccess: 'Pomyślnie wpisano zakończenie załadunku.',
    loadingPlace: 'Miejsce załadunku',
    loadingSender: 'Nadawca',
    loadingReceiver: 'Odbiorca',
    loadingSenderSwitchLabel: 'wpisz nadawcę w miejsce załadunku',
    unloadingArrival: 'Dojazd na rozładunek',
    unloadingArrivalSuccess: 'Dojazd na rozładunek został zapisany pomyślnie.',
    unloadingArrivalAction: `Dojazd na rozładunek`,
    unloading: 'Zakończenie rozładunku',
    unloadingAction: `Zakończenie rozładunku`,
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
    startedTourAction: 'Rozpoczęto trasę',
    finishedTour: 'Twoja trasa została zakończona.',
    finishedTourAction: 'Zakończono trasę',
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
    dayExistRegardRoute: 'Nie możesz zakończyć trasy do póki nie zakończysz obecnego dnia pracy.',
    dayNotExist: 'Nie masz rozpoczętego dnia pracy który mógłbyś zakończyć.',
    startedDayAction: 'Rozpoczęcie dnia',
    startedDayActionCardInsert: '(włożenie karty)',
    startedDayActionCardTakeOut: '(wyjęcie karty)',
    finishedDayAction: 'Zakończenie dnia',
    noActiveRoute: 'Nie masz rozpoczętej trasy w której mógłbyś wykonać tą czynność.',
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
    addedExpenseActionSuccess: 'Pomyślnie wpisano wydatek.',
    noExpenseDescription: 'Musisz wpisać opis wydatku (pozycję).',
    expenseAddAction: 'Dodano wydatek',
    addDefRefuel: 'Tankowanie Adblue',
    addFuelRefuel: 'Tankowanie Diesel',
    addLubrication: 'Smarowanie siodła',
    addService: 'Serwis / Obsługa',
    addServiceSuccess: 'Pomyślnie dodano czynność serwisową pojazdu.',
    addServiceAction: 'Dodano wpis obsługi/serwisu pojazdu',
    tourStopHelper1: 'Proponowaną wartość wyliczono na podstawie danych komputera pokładowego. Zaleca się dokonać ręcznego pomiaru celem zwiększenia dokładności wyników spalania.',
    tourStopHelper2: (distance, burnedFuel) => `Przejechałeś ${formatOdometer(distance)}. Spalanie: ${formatFuelCombustion(burnedFuel, distance)}`,
    finishTourUnloadedLoadsConfirm: (x) => `Próbujesz zakończyć trasę pomimo, że masz jeszcze ${x} ${x === 1 ? 'nierozładowany ładunek.' : 'nierozładowane ładunki.'} Jeżeli zakończysz trasę to zostaną one w systemie opisane jako rozładowane z wpisaną w notatkach adnotacją, że zostały tak oznaczone z powodu zakończenia trasy.`,
    finishTourUnloadNote: 'Oznaczony jako rozładowany z powodu zakończenia trasy',
    cannotEditSettledTourData: 'Nie możesz edytować danych przypisanych do rozliczonej już trasy.',
    notes: 'Notatki',
}];
