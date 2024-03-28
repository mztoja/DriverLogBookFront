interface Vehicles {
    type: string;
    truck: string;
    trailer: string;
    addVehicle: string;
    yearOfProduction: string;
    isLoadable: string;
    tankCapacity: string;
    weight: string;
    weightDisp: string;
    techRev: string;
    insurance: string;
    tacho: string;
    nextService: string;
    notes: string;
    addVehicleRegEmpty: string;
    addVehicleWeightEmpty: string;
    vehicleRegExist: string;
    model: string;
    addSuccess: string;
    apiTrailersError: string;
    apiTrucksError: string;
    trucksTableHeader: string;
    trailersTableHeader: string;
    thLp: string;
    registrationPlate: string;
    collapse: string;
    edit: string;
    editSuccessInfo: string;
    editServiceHeader: string;
    editLogLegend: string;
    editServiceSuccess: string;
    yes: string;
    no: string;
    serviceType: string;
    serviceMaintenance: string;
    serviceService: string;
    serviceAll: string;
    serviceMaintenanceHelper: string;
    serviceServiceHelper: string;
    chooseServicedVehicle: string;
    noServiceEntry: string;
    showServices: string;
    serviceHeader: (x: string) => string;
    serviceDate: string;
    servicePlace: string;
    serviceAction: string;
    serviceOdometer: string;
    close: string;
}

export const vehicles: Vehicles[] = [
    {//en
        type: 'Vehicle',
        trailer: 'Trailer',
        truck: 'Truck',
        addVehicle: 'Add New Vehicle',
        yearOfProduction: 'Year of Production',
        isLoadable: 'Loadable Truck',
        tankCapacity: 'Tank capacity',
        weight: 'Vehicle weight',
        weightDisp: 'Weight',
        insurance: 'Insurance validity',
        techRev: 'Next Technical Review',
        nextService: 'Next service at',
        tacho: 'Next Tachograph Inspection',
        notes: 'Additional information',
        addVehicleRegEmpty: `You must enter your vehicle's registration number.`,
        addVehicleWeightEmpty: `You must enter the vehicle's curb weight.`,
        vehicleRegExist: 'You already have a vehicle with this registration number.',
        model: 'Brand/model',
        addSuccess: 'A new vehicle has been added.',
        apiTrailersError: 'The trailers list could not be downloaded due to a network problem or the login session has expired.',
        apiTrucksError: 'The trucks list could not be downloaded due to a network problem or the login session has expired.',
        trucksTableHeader: 'Trucks List',
        trailersTableHeader: 'Trailers List',
        thLp: 'No.',
        registrationPlate: 'Registration plate',
        collapse: 'Collapse',
        edit: 'Edit',
        editSuccessInfo: 'The vehicle has been successfully edited.',
        editLogLegend: 'Activity',
        editServiceHeader: 'Edit entry',
        editServiceSuccess: 'The details of the selected entrance have been edited successfully.',
        yes: 'Yes',
        no: 'No',
        serviceType: 'Type of Service',
        serviceMaintenance: 'Maintenance',
        serviceService: 'Service',
        serviceAll: 'All',
        serviceMaintenanceHelper: 'e.g. replacing a light bulb, adding fluid or oil',
        serviceServiceHelper: 'e.g. replacing tires, oil, major repairs',
        chooseServicedVehicle: 'The vehicle for service/service has not been selected.',
        noServiceEntry: 'No operation/service activity has been entered.',
        showServices: 'Maintenance / services list',
        serviceHeader: (x) => `Vehicle: ${x} service list`,
        serviceAction: 'Service activity',
        serviceDate: 'Date',
        servicePlace: 'Place',
        serviceOdometer: 'Mileage',
        close: 'Close',
    },
    {//pl
        type: 'Pojazd',
        truck: 'Ciężarówka',
        trailer: 'Naczepa/Przyczepa',
        addVehicle: 'Dodaj nowy pojazd',
        yearOfProduction: 'Rok produkcji',
        isLoadable: 'Pojazd ładowalny',
        tankCapacity: 'Pojemność zbiorników paliwa',
        weight: 'Waga pojazdu (pole G)',
        weightDisp: 'Waga pojazdu',
        tacho: 'Legalizacja tachografu',
        nextService: 'Następna obsługa serwisowa',
        techRev: 'Przegląd techniczny',
        insurance: 'Ubezpieczenie OC',
        notes: 'Dodatkowe informacje',
        addVehicleWeightEmpty: 'Musisz podać masę własną dodawanego pojazdu.',
        addVehicleRegEmpty: 'Musisz podać numer rejestracyjny pojazdu.',
        vehicleRegExist: 'Masz już pojazd o tym numerze rejestracyjnym.',
        model: 'Marka/model',
        addSuccess: 'Dodano nowy pojazd.',
        apiTrailersError: 'Lista naczep/przyczep nie mogła zostać pobrana z powodu problemu z siecią lub sesja logowania wygasła.',
        apiTrucksError: 'Lista ciężarówek nie mogła zostać pobrana z powodu problemu z siecią lub sesja logowania wygasła.',
        trucksTableHeader: 'Lista ciężarówek',
        trailersTableHeader: 'Lista naczep/przyczep',
        thLp: 'Lp.',
        registrationPlate: 'Nr. Rejestracyjny',
        collapse: 'Zwiń',
        edit: 'Edytuj',
        editSuccessInfo: 'Pojazd został pomyślnie edytowany.',
        editLogLegend: 'Czynność',
        editServiceHeader: 'Edytuj wpis',
        editServiceSuccess: 'Szczegóły wybranej pozycji zostały edytowane pomyślnie.',
        yes: 'Tak',
        no: 'Nie',
        serviceType: 'Rodzaj serwisu',
        serviceMaintenance: 'Obsługa',
        serviceService: 'Serwis',
        serviceAll: 'Wszystko',
        serviceMaintenanceHelper: 'np. wymiana żarówki, dolanie płynu lub oleju, etc.',
        serviceServiceHelper: 'np. wymiana opon, oleju, poważniejsze naprawy',
        chooseServicedVehicle: 'Nie wybrano pojazdu którego ma dotyczyć obsługa/serwis.',
        noServiceEntry: 'Nie wpisano żadnej czynności obsługi/serwisu.',
        showServices: 'Lista obsługi / serwisów',
        serviceHeader: (x) => `Lista serwisów pojazdu ${x}`,
        servicePlace: 'Miejsce',
        serviceDate: 'Data',
        serviceAction: 'Czynność serwisowa',
        serviceOdometer: 'Przebieg',
        close: 'Zamknij',
    }
];