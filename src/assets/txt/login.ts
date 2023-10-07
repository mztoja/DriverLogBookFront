interface Login {
    welcome: string;
    login: string;
    submit: string;
    name: string;
    lang: string;
    register: string;
    registerSubmit: string;
    logout: string;
    connectionError: string;
    responseError: string;
    unknownError: string;
    registerPar: string;
    here: string;
}


export const login: Login[] =
    [{
        welcome: `Welcome in Driver's Log Book App.`,
        login: 'Login',
        submit: 'Login',
        name: 'Your Name and Surname',
        lang: 'App Language',
        register: 'Register your Account',
        registerSubmit: 'Register',
        logout: 'Logout',
        connectionError: 'The server is not responding. Please check your connection or try again later.',
        responseError: 'Incorrect login details.',
        unknownError: 'Unknown Error. Please contact Admin.',
        registerPar: `If you don't have an account yet, you can register`,
        here: 'here',
    },
        {
            welcome: `Witaj w aplikacji "Dziennik Kierowcy".`,
            login: 'Logowanie',
            submit: 'Zaloguj',
            name: 'Imię i Nazwisko',
            lang: 'Język aplikacji',
            register: 'Zarejestruj nowe konto',
            registerSubmit: 'Zarejestruj',
            logout: 'Wyloguj',
            connectionError: 'Serwer nie odpowiada. Sprawdź swoje połączenie lub spróbuj ponownie później.',
            responseError: 'Podano niepoprawne dane użytkownika.',
            unknownError: 'Wystąpił nieznany błąd. Skontaktuj się z administratorem.',
            registerPar: 'Jeżeli nie masz u nas jeszcze konta to możesz się zarejestrować',
            here: 'tutaj',
        }];