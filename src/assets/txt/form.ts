interface Form {
    email: string;
    password: string;
    passwordHelper: string;
    firstName: string;
    lastName: string;
    lang: string;
    companyName: string;
    companyStreet: string;
    companyCode: string;
    companyCity: string;
    placeType: string;
    placeType0: string;
    placeType1: string;
    placeType2: string;
    placeType3: string;
    placeType4: string;
    placeType5: string;
    placeType6: string;
    placeType7: string;
    placeTypeAll: string;
    favorite: string;
    country: string;
    defaultCustomer: string;
    bidType: string;
    bidType0: string;
    bidType1: string;
    bidType2: string;
    bidType3: string;
    amount: string;
    currency: string;
    fuelConsumptionType: string;
    fuelConType1: string;
    fuelConType2: string;
    search: string;
    date: string;
    truck: string;
    trailer: string;
    vehicle: string;
    vehicleDetailsNotFound: string;
    fuelQuantity: string;
    fuelCombustion: string;
    fuelConTypeHelper1: string;
    fuelConTypeHelper2: string;
    odometer: string;
    place: string;
    switchToPlace: string;
    switchToPlaceId: string;
    driveTime: string;
    driveTime2: string;
    driveTimeHelper: string;
    driveTimeHelper2: string;
    action: string;
    bordersApiProblem: string;
    border: string;
    switchToNewBorder: string;
    switchToBorderList: string;
    yourCountry: string;
    selectTargetCountry: string;
    loadDescription: string;
    loadReference: string;
    loadWeight: string;
    loadQuantity: string;
}


export const form: Form[] =
    [{ //en
        email: 'E-mail',
        password: 'Password',
        passwordHelper: 'Password must consist of minimum 8 characters, at least one uppercase letter, one number and one special character.',
        firstName: 'First Name',
        lastName: 'Last Name',
        lang: 'App Language',
        companyName: 'Company Name',
        companyStreet: 'Street',
        companyCode: 'Post Code',
        companyCity: 'Town/City',
        placeType: 'Group',
        placeType0: 'Other',
        placeType1: 'Transport Company (base)',
        placeType2: 'Loading place',
        placeType3: 'Unloading place',
        placeType4: 'Loading&Unloading place',
        placeType5: 'Parking',
        placeType6: 'Workshop/Dealer',
        placeType7: 'Customs',
        placeTypeAll: 'All',
        favorite: 'Favourite',
        country: 'Country',
        defaultCustomer: 'Default Customer',
        bidType: 'type of remuneration',
        bidType0: 'not specified',
        bidType1: 'per day',
        bidType2: 'per km',
        bidType3: 'fixed',
        amount: 'Amount',
        currency: 'Currency',
        fuelConsumptionType: 'Fuel entry format',
        fuelConType1: 'liters (quantity)',
        fuelConType2: 'l/100km (usage)',
        search: 'Search',
        date: 'Date',
        truck: 'Truck reg. plate',
        trailer: 'Trailer reg. plate',
        vehicle: 'Choose loaded vehicle',
        vehicleDetailsNotFound: 'vehicle details not found',
        fuelCombustion: 'Amount of fuel consumed',
        fuelQuantity: 'Fuel level',
        fuelConTypeHelper1: 'W ustawieniach profilu wybrano wpisywanie spalania po ilości paliwa',
        fuelConTypeHelper2: 'W ustawieniach profilu wybrano wpisywanie spalania po średnim spalaniu',
        odometer: 'Odometer',
        place: 'Place',
        switchToPlace: 'Change to manual enter',
        switchToPlaceId: 'Switch to selection from the address list',
        driveTime: 'Drive time',
        driveTime2: '2nd driver drive time',
        driveTimeHelper: 'Type your driving time from tacho throughout the day.',
        driveTimeHelper2: 'You can also enter the co-driver driving time.',
        action: 'Activity',
        bordersApiProblem: 'The list of border crossings cannot be loaded. Please check your connection or try again later.',
        border: 'Border crossing',
        switchToNewBorder: 'Add new border crossing',
        switchToBorderList: 'Switch to border list',
        yourCountry: 'You are now in',
        selectTargetCountry: 'Select the country you want to enter below',
        loadDescription: 'Product description',
        loadReference: 'Loading reference',
        loadWeight: 'Weight of the goods',
        loadQuantity: 'Quantity of the goods',
    },
        {//pl
            email: 'E-mail',
            password: 'Hasło',
            passwordHelper: 'Hasło musi składać się z min. 8 znaków, jednej dużej litery, jednej cyfry i jednego znaku specjalnego.',
            firstName: 'Imię',
            lastName: 'Nazwisko',
            lang: 'Język aplikacji',
            companyName: 'Nazwa firmy',
            companyStreet: 'Ulica',
            companyCode: 'Kod pocztowy',
            companyCity: 'Miejscowość',
            placeType: 'Grupa',
            placeType0: 'Inne',
            placeType1: 'Firma transportowa (baza)',
            placeType2: 'Miejsce załadunku',
            placeType3: 'Miejsce rozładunku',
            placeType4: 'Załadunek i Rozładunek',
            placeType5: 'Parking',
            placeType6: 'Warsztat/Serwis',
            placeType7: 'Urząd/Agencja celna',
            placeTypeAll: 'Wszystkie',
            favorite: 'Ulubione',
            country: 'Kraj',
            defaultCustomer: 'Domyślny zleceniodawca',
            bidType: 'Rodzaj wynagrodzenia',
            bidType0: 'nie wybrano',
            bidType1: 'dniówka',
            bidType2: 'za km',
            bidType3: 'stałe',
            amount: 'Kwota',
            currency: 'Waluta',
            fuelConsumptionType: 'Format wpisywania paliwa',
            fuelConType1: 'litry (ilość)',
            fuelConType2: 'l/100km (spalanie)',
            search: 'Szukaj',
            date: 'Data',
            truck: 'Nr. rej. ciężarówki',
            trailer: 'Nr. rej. naczepy/przyczepy',
            vehicle: 'Wybierz załadowany pojazd',
            vehicleDetailsNotFound: 'nie znaleziono danych pojazdu',
            fuelQuantity: 'Poziom paliwa',
            fuelCombustion: 'Ilość spalonego paliwa',
            fuelConTypeHelper1: 'W ustawieniach profilu wybrano wpisywanie spalania po ilości paliwa',
            fuelConTypeHelper2: 'W ustawieniach profilu wybrano wpisywanie spalania po średnim spalaniu',
            odometer: 'Stan licznika',
            place: 'Miejsce',
            switchToPlace: 'Przełącz na wpis manualny',
            switchToPlaceId: 'Przełącz na wybór z listy adresowej',
            driveTime: 'Czas jazdy',
            driveTime2: 'Czas jazdy 2 kierowcy',
            driveTimeHelper: 'Spisz swój czas jazdy z tachografu z całego dnia.',
            driveTimeHelper2: 'Możesz też wpisać czas jazdy zmiennika celem lepszego zliczania statystyk.',
            action: 'Czynność',
            bordersApiProblem: 'Nie można wczytać listy przejść granicznych. Sprawdź swoje połączenie bądź spróbuj ponownie później.',
            border: 'Przejście graniczne',
            switchToBorderList: 'Przełącz na wybór przejścia',
            switchToNewBorder: 'Dodaj nowe przejście',
            yourCountry: 'Jesteś teraz w',
            selectTargetCountry: 'Wybierz poniżej kraj do którego chcesz wjechać',
            loadDescription: 'Opis towrau',
            loadReference: 'Numer załadunku',
            loadWeight: 'Waga towaru',
            loadQuantity: 'Ilość towaru',
        }];