interface Commons {
    title: string;
    subTitle: string;
    footer: string;
    notFound: string;
    pl: string;
    en: string;
    userBlockedSite: string;
    apiUnknownError: string;
    apiConnectionError: string;
    apiUnauthorized: string;
    windowConfirmTitle: string;
    windowConfirmAgree: string;
    windowConfirmCancel: string;
}

export const commons:Commons[] = [{
    title: "LogBook",
    subTitle: "Driver's Log-Book",
    footer: "v 3.0.0",
    notFound: "Content not found or page is not ready yet",
    pl: 'Polish',
    en: 'English',
    userBlockedSite: 'Your account is currently inactive. To activate it, you must contact with the administrator.',
    apiUnknownError: 'An unknown error occurred (invalid server response). Please try again later or contact with the administrator.',
    apiConnectionError: 'The server is not responding. Please check your connection or try again later.',
    apiUnauthorized: 'Your login session has probably expired. Please log in again and try again.',
    windowConfirmCancel: 'Cancel',
    windowConfirmAgree: 'Confirm',
    windowConfirmTitle: 'Warning!',
},{
    title: "D.K.",
    subTitle: "Dziennik Kierowcy",
    footer: "v 3.0.0",
    notFound: "Nie znaleziono zawartości lub strona nie jest jeszcze ukończona",
    pl: 'Polski',
    en: 'Angielski',
    userBlockedSite: 'Twoje konto jest obecnie nieaktywne. Aby było aktywowane, musisz skontaktować się z administratorem.',
    apiUnknownError: 'Wystąpił nieznany błąd (niepoprawna odpowiedź serwera). Spróbuj ponownie później lub skontaktuj się z administratorem.',
    apiConnectionError: 'Serwer nie odpowiada. Sprawdź swoje połączenie lub spróbuj ponownie później.',
    apiUnauthorized: 'Twoja sesja logowania wygasła. Zaloguj się raz jeszcze i spróbuj ponownie.',
    windowConfirmCancel: 'Anuluj',
    windowConfirmAgree: 'Zatwierdź',
    windowConfirmTitle: 'Ostrzeżenie!',
}];
