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
    placeNameTooLong: string;
    placeStreetTooLong: string;
    placeCodeTooLong: string;
    placeCityTooLong: string;
    tableHeader: string;
    thLp: string;
    thType: string;
    thCountry: string;
    thCity: string;
    thNameStreet: string;
    apiError: string;
    markedPlace: string;
    markedPlaceError: string;
    collapse: string;
    edit: string;
    showActivities: string;
    editSuccessInfo: string;
    googleMapsLabel: string;
    directions: string;
    gps: string;
    mapTab: string;
    mapHiddenPlaces: (n: number) => string;
    mapGeocodeConfirm: string;
    mapGeocodeProgress: (done: number, total: number) => string;
    mapGeocodeResult: (geocoded: number, failed: number) => string;
    mapPartialPlaces: (n: number) => string;
    mapGeocodePartialConfirm: string;
    mapPartialMarkerNote: string;
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
        placeNameTooLong: 'Company name is too long (max 30 characters).',
        placeStreetTooLong: 'The street is too long (max 50 characters).',
        placeCodeTooLong: 'The post code is too long (max 10 characters).',
        placeCityTooLong: 'The town/city is too long (max 30 characters).',
        tableHeader: 'Address List',
        thLp: 'No.',
        thType: 'Group',
        thCity: 'City',
        thCountry:'Country',
        thNameStreet:'Name - street',
        apiError: 'The place list could not be loaded due to a network problem or login session timeout.',
        markedPlace: 'Marked as destination point:',
        markedPlaceError: 'Something went wrong with the place marking :( Check your connection or try again later.',
        collapse: 'Collapse',
        edit: 'Edit',
        showActivities: 'Activities of this place',
        editSuccessInfo: 'The chosen place has been successfully edited.',
        googleMapsLabel: 'Open in Google Maps',
        directions: 'Directions',
        gps: 'GPS',
        mapTab: 'Map',
        mapHiddenPlaces: (n) => `${n} place${n === 1 ? '' : 's'} not shown on the map (no coordinates)`,
        mapGeocodeConfirm: 'Do you want to automatically look up GPS coordinates for these addresses? This may take a while.',
        mapGeocodeProgress: (done, total) => `Located ${done} of ${total} addresses...`,
        mapGeocodeResult: (geocoded, failed) => `Coordinates found for ${geocoded} place${geocoded === 1 ? '' : 's'}.${failed > 0 ? ` ${failed} could not be located.` : ''}`,
        mapPartialPlaces: (n) => `${n} place${n === 1 ? '' : 's'} ${n === 1 ? 'has' : 'have'} incomplete GPS coordinates (only one of the two is set)`,
        mapGeocodePartialConfirm: 'Do you want to automatically fill in the missing coordinate for these addresses? The coordinate already set will not be changed.',
        mapPartialMarkerNote: '(incomplete coordinates)',
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
            placeNameTooLong: 'Nazwa firmy jest za długa (maks. 30 znaków).',
            placeStreetTooLong: 'Ulica jest za długa (maks. 50 znaków).',
            placeCodeTooLong: 'Kod pocztowy jest za długi (maks. 10 znaków).',
            placeCityTooLong: 'Miejscowość jest za długa (maks. 30 znaków).',
            tableHeader: 'Lista adresowa',
            thLp: 'Lp.',
            thType: 'Grupa',
            thCity: 'Miejscowość',
            thCountry:'Państwo',
            thNameStreet:'Nazwa - ulica',
            apiError: 'Lista miejsc nie może zostać wczytana przez problem z siecią lub sesja logowania wygasła.',
            markedPlace: 'Oznaczono jako miejsce docelowe:',
            markedPlaceError: 'Coś poszło nie tak z oznaczeniem miejsca :( Problem z połączeniem.',
            collapse: 'Zwiń',
            edit: 'Edytuj',
            showActivities: 'Czynności tego miejsca',
            editSuccessInfo: 'Wybrane miejsce zostało edytowane pomyślnie.',
            googleMapsLabel: 'Otwórz w Google Maps',
            directions: 'Adres',
            gps: 'GPS',
            mapTab: 'Mapa',
            mapHiddenPlaces: (n) => `${n} ${n === 1 ? 'miejsce nie jest wyświetlane' : 'miejsc nie jest wyświetlanych'} na mapie (brak współrzędnych)`,
            mapGeocodeConfirm: 'Czy chcesz automatycznie wyszukać współrzędne GPS tych adresów? Może to chwilę potrwać.',
            mapGeocodeProgress: (done, total) => `Uzupełniono ${done} z ${total} adresów...`,
            mapGeocodeResult: (geocoded, failed) => `Znaleziono współrzędne dla ${geocoded} ${geocoded === 1 ? 'miejsca' : 'miejsc'}.${failed > 0 ? ` Nie udało się zlokalizować ${failed} ${failed === 1 ? 'miejsca' : 'miejsc'}.` : ''}`,
            mapPartialPlaces: (n) => `${n} ${n === 1 ? 'miejsce ma' : 'miejsc ma'} niepełne współrzędne GPS (podana tylko jedna z dwóch)`,
            mapGeocodePartialConfirm: 'Czy chcesz automatycznie uzupełnić brakującą współrzędną tych adresów? Współrzędna już podana nie zostanie zmieniona.',
            mapPartialMarkerNote: '(niepełne współrzędne)',
        }];