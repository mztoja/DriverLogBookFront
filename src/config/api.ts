export const apiURL = process.env.REACT_APP_API_URL ?? 'http://localhost:3001/v3';

export const apiPaths = {
    // places
    getPlaces: '/places',
    createPlace: '/places/create',
    // routes
    getActiveRoute: '/tours/getActiveRoute',
    createNewRoute: '/tours/create',
    // users
    register: '/users/register',
    login: '/auth/login',
    get: '/auth/user',
    logout: '/auth/logout',
    markDepart: '/users/markDepart',
    // days
    createNewDay: '/days/create',
    finishDay: '/days/finish',
    getActiveDay: '/days/getActiveDay',
    getLastDay: '/days/getLastDay',
    // logs
    createNewLog: '/logs/create',
    createBorderCross: '/logs/createBorderCross',
    getLogs: '/logs',
    // borders
    getBordersByCountry: '/borders/getByCountry',
}