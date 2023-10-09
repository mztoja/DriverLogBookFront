export interface Currency {
    code: string;
    symbol: string;
}

export const currencies: readonly Currency[] = [
    {
        code: 'EUR',
        symbol: '€',
    },
    {
        code: 'PLN',
        symbol: 'zł',
    },
    {
        code: 'CZK',
        symbol: 'Kč',
    },
    {
        code: 'HUF',
        symbol: 'Ft',
    },
    {
        code: 'HRK',
        symbol: 'KN',
    },
    {
        code: 'RON',
        symbol: 'Lei',
    },
    {
        code: 'BGN',
        symbol: 'Lew',
    },
    {
        code: 'MKD',
        symbol: 'Den',
    },
    {
        code: 'NOK',
        symbol: 'krN',
    },
    {
        code: 'SEK',
        symbol: 'krS',
    },
    {
        code: 'DKK',
        symbol: 'krD',
    },
    {
        code: 'CHF',
        symbol: 'fr',
    },
    {
        code: 'GBP',
        symbol: '£',
    },
    {
        code: 'RSD',
        symbol: 'RSD',
    },
];