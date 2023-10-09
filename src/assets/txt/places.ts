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
        }];