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
    country: string;
    defaultCustomer: string;
    bidType: string;
    bidType0: string;
    bidType1: string;
    bidType2: string;
    bidType3: string;
    amount: string;
    currency: string;
    fuelConsumptionType:string;
    fuelConType1: string;
    fuelConType2: string;
    search: string;
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
        }];