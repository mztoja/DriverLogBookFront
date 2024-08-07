import { REACT_APP_API_URL } from './set';

export const apiURL = REACT_APP_API_URL;

export const apiPaths = {
    // places
    getPlaces: '/places/get',
    getPlace: '/places/getOne',
    createPlace: '/places/create',
    getCompanyList: '/places/companyList',
    editPlace: '/places/edit',
    // routes
    getActiveRoute: '/tours/getActiveRoute',
    getPreviousRoute: '/tours/getPreviousRoute',
    createNewRoute: '/tours/create',
    finishRoute: '/tours/finish',
    getRouteNumbers: '/tours/getRouteNumbers',
    getRoutes: '/tours',
    createSettlement: '/tours/createSettlement',
    getRouteSettlements: '/tours/getSettlements',
    getRouteById: '/tours/getRouteById',
    getRouteByLogId: '/tours/getRouteByLogId',
    countDistanceOfActiveRoute: '/tours/countDistanceOfActiveRoute',
    editTour: '/tours/edit',
    editSimpleTour: '/tours/simpleEdit',
    generateSettlementRoute: '/tours/generator',
    deleteMonthlySettlement: '/tours/deleteMonthlySettlement',
    // users
    register: '/users/register',
    login: '/auth/login',
    get: '/auth/user',
    logout: '/auth/logout',
    markDepart: '/users/markDepart',
    userUpdate: '/users/userUpdate',
    editNotes: '/users/editNotes',
    // days
    createNewDay: '/days/create',
    finishDay: '/days/finish',
    getActiveDay: '/days/getActiveDay',
    getLastDay: '/days/getLastDay',
    getYourLastDay: '/days/getYourLastDay',
    getDays: '/days/get',
    getDayByLogId: '/days/getDayByLogId',
    getDaysByTourId: '/days/getByTourId',
    getBurnedFuelByTour: '/days/burnedFuelByTour',
    countDistanceOfActiveDay: '/days/countDistanceOfActiveRoute',
    editDay: '/days/edit',
    editSimpleDay: '/days/simpleEdit',
    // logs
    createNewLog: '/logs/create',
    createBorderCross: '/logs/createBorderCross',
    getLogs: '/logs/get',
    getLogById: '/logs/getById',
    getLogsByTourId: '/logs/getByTourId',
    getLastLog: '/logs/getLastLog',
    attachTrailer: '/logs/attachTrailer',
    detachTrailer: '/logs/detachTrailer',
    loadingArrival: '/logs/loadingArrival',
    unloadingArrival: '/logs/unloadingArrival',
    editLog: '/logs/edit',
    // borders
    getBordersByCountry: '/borders/getByCountry',
    // vehicles
    getVehicleByRegistration: '/vehicles/findByRegistration',
    createVehicle: '/vehicles/create',
    getTrailersList: '/vehicles/trailers',
    getTrucksList: '/vehicles/trucks',
    editTrailer: '/vehicles/trailer/edit',
    editTruck: '/vehicles/truck/edit',
    getVehicleRegById: '/vehicles/getRegistrationById',
    // services
    createService: '/services/create',
    getServiceByVehicleId: '/services/getByVehicleId',
    editService: '/services/edit',
    // loadings
    createLoad: '/loads/create',
    unloadingLoad: '/loads/unload',
    getNotUnloadedLoads: '/loads/getNotUnloadedLoads',
    getUnloadingPlace: '/loads/getUnloadingPlace',
    getLoadDetails: '/loads/getLoadDetails',
    getLoadings: '/loads/get',
    getLoadingsByTourId: '/loads/getByTourId',
    getNotUnloadedLoadsMass: '/loads/getNotUnloadedLoadsMass',
    getLoadingByLogId: '/loads/getByLogId',
    editLoad: '/loads/edit',
    editSimpleLoad: '/loads/simpleEdit',
    // finances
    getPaymentMethods: '/payments',
    addPaymentMethod: '/payments/add',
    deletePaymentMethod: '/payments/delete',
    selectPaymentMethod: '/payments/select',
    createExpense: '/finances/create',
    getRefuelValueByTour: '/finances/getRefuelValueByTour',
    getFinances: '/finances/get',
    getFinancesByTourId: '/finances/getByTourId',
    getFinanceByLogId: '/finances/getByLogId',
    editFinance: '/finances/edit',
}