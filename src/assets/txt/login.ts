interface Login {
    welcome: string;
    login: string;
    email: string;
    password: string;
    submit: string;
    name: string;
    lang: string;
    register: string;
    registerSubmit: string;
    logout: string;
    connectionError: string;
    responseError: string;
    unknownError: string
}


export const login: Login[] =
    [{
        welcome: `Welcome in Driver's Log Book App.`,
        login: 'Login',
        email: 'E-mail',
        password: 'Password',
        submit: 'Login',
        name: 'Your Name and Surname',
        lang: 'App Language',
        register: 'Register your Account',
        registerSubmit: 'Register',
        logout: 'Logout',
        connectionError: 'The server is not responding. Please check your connection or try again later.',
        responseError: 'Incorrect login details.',
        unknownError: 'Unknown Error. Please contact Admin.'
    },
        {
            welcome: `Witaj w aplikacji "Dziennik Kierowcy".`,
            login: 'Logowanie',
            email: 'E-mail',
            password: 'Hasło',
            submit: 'Zaloguj',
            name: 'Imię i Nazwisko',
            lang: 'Język aplikacji',
            register: 'Zarejestruj nowe konto',
            registerSubmit: 'Zarejestruj',
            logout: 'Wyloguj',
            connectionError: 'Serwer nie odpowiada. Sprawdź swoje połączenie lub spróbuj ponownie później.',
            responseError: 'Podano niepoprawne dane użytkownika.',
            unknownError: 'Wystąpił nieznany błąd. Skontaktuj się z administratorem.'
        }];