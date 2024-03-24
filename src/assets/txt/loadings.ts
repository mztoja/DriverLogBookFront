interface Loadings {
    apiError: string;
    tableHeader: string;
    loadNr: string;
    tourNr: string;
    loading: string;
    unloading: string;
    sender: string;
    receiver: string;
    notUnloaded: string;
    na: string;
    vehicle: string;
    refNr: string;
    description: string;
    quantity: string;
    weight: string;
    distance: string;
    edit: string;
    loadingEditHeader: string;
    editSuccess: string;
}

export const loadings: Loadings[] = [
    {//en
        apiError: 'Your loadings list could not be downloaded due to a connection problem. Please try again later.',
        tableHeader: 'Loadings list',
        loadNr: 'Load Nr.',
        tourNr: 'Tour',
        loading: 'Loading',
        unloading: 'Unloading',
        sender: 'Sender',
        receiver: 'Receiver',
        notUnloaded: 'Not unloaded yet',
        na: '- - -',
        vehicle: 'Vehicle',
        refNr: 'Reference nr',
        description: 'Description',
        quantity: 'Quantity',
        distance: 'Distance',
        weight: 'Weight',
        edit: 'Edit',
        loadingEditHeader: 'Loading Edit',
        editSuccess: 'The details of the selected loading have been edited successfully.'
    },
    {//pl
        apiError: 'Twoja lista ładunków nie mogła zostać pobrana z powodu problemu z połączeniem. Spróbuj ponownie później.',
        tableHeader: 'Lista ładunków',
        loadNr: 'Nr. ład.',
        tourNr: 'Trasa',
        loading: 'Załadunek',
        unloading: 'Rozładunek',
        sender: 'Nadawca',
        receiver: 'Odbiorca',
        notUnloaded: 'Jeszcze nie rozładowany',
        na: '- - -',
        vehicle: 'Pojazd',
        refNr: 'Nr. załadunku',
        description: 'Opis ładunku',
        quantity: 'Ilość towaru',
        weight: 'Waga towaru',
        distance: 'Odległość',
        edit: 'Edytuj',
        loadingEditHeader: 'Edytuj ładunek',
        editSuccess: 'Szczegóły wybranego ładunku zostały edytowane pomyślnie.'
    },
];