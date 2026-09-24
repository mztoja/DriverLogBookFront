interface Login {
    welcome: string;
    login: string;
    submit: string;
    register: string;
    registerSubmit: string;
    logout: string;
    responseError: string;
    registerPar: string;
    here: string;
    loginPar: string;
    belowReqDesc: string;
    companyData: string;
    registerSuccess: string;
    registerResInvEmail: string;
    registerResInvPassword: string;
    dbConnectionError: string;
    registerResEmailExist: string;
    companyInfo: string;
    registerCompanyNameNotExist: string;
    registerCompanyCityNotExist: string;
    registerCountryNotExist: string;
    profile: string;
    save: string;
    saveApiSuccess: string;
    vehicles: string;
    forgotPasswordQuestion: string;
    forgotPasswordTitle: string;
    forgotPasswordEmailInfo: string;
    forgotPasswordSubmit: string;
    forgotPasswordSent: string;
    resetCodeLabel: string;
    resetCodeSubmit: string;
    resetPasswordInfo: string;
    resetPasswordSubmit: string;
    resetPasswordSuccess: string;
    invalidResetCode: string;
}


export const login: Login[] =
    [{//en
        welcome: `Welcome in Driver's Log Book App.`,
        login: 'Login',
        submit: 'Login',
        register: 'Register your Account',
        registerSubmit: 'Register',
        logout: 'Logout',
        responseError: 'Incorrect login details.',
        registerPar: `If you don't have an account yet, you can register`,
        here: 'here',
        loginPar: 'If you have an account, please go to login page',
        belowReqDesc: 'The data below is used for additional functions, they are not required. You will be able to edit them later.',
        companyData: `Company's data`,
        registerSuccess: 'You have been registered successfully. You can login now.',
        registerResInvEmail: 'You have entered an incorrect e-mail address format.',
        registerResInvPassword: 'You have entered an incorrect password format.',
        dbConnectionError: 'Database connection error. Please try again later.',
        registerResEmailExist: 'The e-mail address you entered already exists. If this is your e-mail - please contact the administrator.',
        companyInfo: 'Enter the address of the first company you currently work for. It will by available only in you private address book in app.',
        registerCompanyNameNotExist: 'Please enter the company name.',
        registerCompanyCityNotExist: 'Please enter the company city.',
        registerCountryNotExist: 'Please select country.',
        profile: 'Profile settings',
        save: 'Save changes',
        saveApiSuccess: 'Profile data has been changed.',
        vehicles: 'Vehicle management',
        forgotPasswordQuestion: 'Forgot your password?',
        forgotPasswordTitle: 'Reset password',
        forgotPasswordEmailInfo: 'Enter your e-mail address. If it is registered in our system, ' +
            'we will send you a 6-digit code to reset your password.',
        forgotPasswordSubmit: 'Send code',
        forgotPasswordSent: 'If this e-mail address is registered, we have sent a code to it.',
        resetCodeLabel: 'Code from e-mail',
        resetCodeSubmit: 'Verify code',
        resetPasswordInfo: 'Enter your new password.',
        resetPasswordSubmit: 'Set new password',
        resetPasswordSuccess: 'Your password has been changed. You can log in now.',
        invalidResetCode: 'The code is incorrect or has expired.',
    },
        {//pl
            welcome: `Witaj w aplikacji "Dziennik Kierowcy".`,
            login: 'Logowanie',
            submit: 'Zaloguj',
            register: 'Zarejestruj nowe konto',
            registerSubmit: 'Zarejestruj',
            logout: 'Wyloguj',
            responseError: 'Podano niepoprawne dane użytkownika.',
            registerPar: 'Jeżeli nie masz u nas jeszcze konta, to możesz się zarejestrować',
            here: 'tutaj',
            loginPar: 'Jeżeli masz już konto, to przejdź do ekranu logowania',
            belowReqDesc: 'Dane poniżej są wykorzystywane do dodatkowych funkcji, jednak nie są wymagane. Będziesz mógł je edytować później.',
            companyData: 'Dane firmy',
            registerSuccess: 'Zostałeś zarejestrowany pomyślnie. Teraz możesz się zalogować.',
            registerResInvEmail: 'Podałeś niepoprawny format adresu e-mail.',
            registerResInvPassword: 'Podałeś niepoprawny format hasła.',
            dbConnectionError: 'Problem z połączeniem z bazą danych. Spróbuj ponownie później.',
            registerResEmailExist: 'Podany adres e-mail już istnieje. Jeżeli masz problem z logowaniem - skontaktuj się z administratorem.',
            companyInfo: 'Podaj dane twojej pierwszej firmy w której teraz pracujesz. Będą one dostępne tylko w twojej książce adresowej.',
            registerCompanyNameNotExist: 'Musisz wpisać nazwę firmy.',
            registerCompanyCityNotExist: 'Musisz wpisać nazwę miejsowości siedziby firmy.',
            registerCountryNotExist: 'Musisz wybrać kraj.',
            profile: 'Ustawienia profilu',
            save: 'Zapisz zmiany',
            saveApiSuccess: 'Dane profilu zostały zmienione.',
            vehicles: 'Zarządzanie pojazdami',
            forgotPasswordQuestion: 'Zapomniałeś hasła?',
            forgotPasswordTitle: 'Resetowanie hasła',
            forgotPasswordEmailInfo: 'Podaj swój adres e-mail. Jeśli jest zarejestrowany w naszym ' +
                'systemie, wyślemy na niego 6-cyfrowy kod do zresetowania hasła.',
            forgotPasswordSubmit: 'Wyślij kod',
            forgotPasswordSent: 'Jeśli ten adres e-mail jest zarejestrowany, wysłaliśmy na niego kod.',
            resetCodeLabel: 'Kod z e-maila',
            resetCodeSubmit: 'Sprawdź kod',
            resetPasswordInfo: 'Podaj nowe hasło.',
            resetPasswordSubmit: 'Ustaw nowe hasło',
            resetPasswordSuccess: 'Hasło zostało zmienione. Możesz się teraz zalogować.',
            invalidResetCode: 'Kod jest nieprawidłowy albo wygasł.',
        }];