interface Places {
    addPlace: string;
    submit: string;
    isFavoriteSwitchLabel: string;
    navigateSwitchLabel: string;
    description: string;
    lat: string;
    lon: string;
    addSuccess: string;
    placeNameNotExist: string;
    placeCityNotExist: string;
    countryNotExist: string;
    tableHeader: string;
    thLp: string;
    thType: string;
    thCountry: string;
    thCity: string;
    thNameStreet: string;
    apiError: string;
    markedPlace: string;
    markedPlaceError: string;
}


export const places: Places[] =
    [{//en
        addPlace: `Add new place`,
        submit: 'Add',
        isFavoriteSwitchLabel: 'add to favorite',
        navigateSwitchLabel: 'mark as destonation',
        description: 'Description/Notes',
        lat: 'GPS latitude',
        lon: 'GPS longitude',
        addSuccess: 'Place added successfully.',
        placeNameNotExist: 'Please enter name of the place.',
        placeCityNotExist: 'Please enter city of the place.',
        countryNotExist: 'Please select country.',
        tableHeader: 'Address List',
        thLp: 'No.',
        thType: 'Group',
        thCity: 'City',
        thCountry:'Country',
        thNameStreet:'Name - street',
        apiError: 'The list could not be loaded due to a network problem. Please check your connection or try again later.',
        markedPlace: 'Marked as destination point:',
        markedPlaceError: 'Something went wrong with the place marking :( Check your connection or try again later.',

    },
        {//pl
            addPlace: `Dodaj nowy adres`,
            submit: 'Dodaj',
            isFavoriteSwitchLabel: 'dodaj do ulubionych',
            navigateSwitchLabel: 'oznacz jako cel',
            description: 'Opis/Notatki',
            lat: 'GPS szerokość geo.',
            lon: 'GPS długość geo.',
            addSuccess: 'Miejsce dodano pomyślnie.',
            placeNameNotExist: 'Nie podano nazwy dodawanego miejsca.',
            placeCityNotExist: 'Nie podano miejscowości.',
            countryNotExist: 'Nie podano kraju.',
            tableHeader: 'Lista adresowa',
            thLp: 'Lp.',
            thType: 'Grupa',
            thCity: 'Miejscowość',
            thCountry:'Państwo',
            thNameStreet:'Nazwa - ulica',
            apiError: 'Lista nie może zostać wczytana przez problem z siecią. Sprawdź swoje połączenie lub spróbuj ponownie później.',
            markedPlace: 'Oznaczono jako miejsce docelowe:',
            markedPlaceError: 'Coś poszło nie tak z oznaczeniem miejsca :( Problem z połączeniem.',
        }];