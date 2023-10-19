interface Commons {
    title: string;
    subTitle: string;
    footer: string;
    notFound: string;
    pl: string;
    en: string;
    userBlockedSite: string;
}

export const commons:Commons[] = [{
    title: "LogBook",
    subTitle: "Driver's Log-Book",
    footer: "V3.0.0 powered by Marcin Z",
    notFound: "Content not found or page is not ready yet",
    pl: 'Polish',
    en: 'English',
    userBlockedSite: 'Your account is currently inactive. To activate it, you must contact with the administrator.',
},{
    title: "D.K.",
    subTitle: "Dziennik Kierowcy",
    footer: "V3.0.0 stworzona przez Marcina Z",
    notFound: "Nie znaleziono zawartości lub strona nie jest jeszcze ukończona",
    pl: 'Polski',
    en: 'Angielski',
    userBlockedSite: 'Twoje konto jest obecnie nieaktywne. Aby było aktywowane, musisz skontaktować się z administratorem.',
}];
