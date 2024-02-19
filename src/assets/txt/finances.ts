interface Finances {
    apiError: string;
    tableHeader: string;
    tNr: string;
    date: string;
    description: string;
    quantity: string;
    unitPrice: string;
    amount: string;
    localAmount: string;
    payment: string;
    na: string;
    notes: string;
}

export const finances: Finances[] = [
    {//en
        apiError: `Your finances list could not be downloaded due to a connection problem. Please try again later.`,
        tableHeader: 'Finances list',
        tNr: 'Tour',
        date: 'Date',
        description: 'Item description',
        amount: 'Amount',
        localAmount: 'Local amount',
        payment: 'Payment',
        quantity: 'Quantity',
        unitPrice: 'u/p',
        na: '- - -',
        notes: 'Notes',
    },
    {//pl
        apiError: 'Twoja lista finansów nie mogła zostać pobrana z powodu problemu z połączeniem. Spróbuj ponownie później.',
        tableHeader: 'Lista finansów',
        tNr: 'Trasa',
        date: 'Data',
        description: 'Pozycja (opis wydatku)',
        amount: 'Kwota',
        localAmount: 'Kwota (lok.)',
        payment: 'Płatność',
        quantity: 'Ilość',
        unitPrice: 'c/j',
        na: '- - -',
        notes: 'Notatki',
    },
];