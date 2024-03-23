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
    edit: string;
    financeEditHeader: string;
    logLegend: string;
    editSuccess: string;
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
        edit: 'Edit',
        financeEditHeader: 'Finance Edit',
        logLegend: 'Finance log',
        editSuccess: 'The details of the selected finance have been edited successfully.',
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
        edit: 'Edytuj',
        financeEditHeader: 'Edytuj wydatek',
        logLegend: 'Czynność wydatku',
        editSuccess: 'Szczegóły wybranego wydatku zostały edytowane pomyślnie.',
    },
];