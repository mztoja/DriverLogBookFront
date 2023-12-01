export const apiURL = process.env.REACT_APP_API_URL ?? 'http://localhost:3001/v3';

export const apiPaths = {
    // places
    getPlaces: '/places',
    createPlace: '/places/create',
    getCompanyList: '/places/companyList',
    // routes
    getActiveRoute: '/tours/getActiveRoute',
    createNewRoute: '/tours/create',
    // users
    register: '/users/register',
    login: '/auth/login',
    get: '/auth/user',
    logout: '/auth/logout',
    markDepart: '/users/markDepart',
    userUpdate: '/users/userUpdate',
    // days
    createNewDay: '/days/create',
    finishDay: '/days/finish',
    getActiveDay: '/days/getActiveDay',
    getLastDay: '/days/getLastDay',
    getDays: '/days',
    // logs
    createNewLog: '/logs/create',
    createBorderCross: '/logs/createBorderCross',
    getLogs: '/logs',
    attachTrailer: '/logs/attachTrailer',
    detachTrailer: '/logs/detachTrailer',
    loadingArrival: '/logs/loadingArrival',
    unloadingArrival: '/logs/unloadingArrival',
    // borders
    getBordersByCountry: '/borders/getByCountry',
    // vehicles
    getVehicleByRegistration: '/vehicles/findByRegistration',
    // loadings
    createLoad: '/loads/create',
    getNotUnloadedLoads: '/loads/getNotUnloadedLoads',
    getUnloadingPlace: '/loads/getUnloadingPlace',
    getLoadDetails: '/loads/getLoadDetails',
}