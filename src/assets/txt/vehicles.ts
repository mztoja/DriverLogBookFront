interface Vehicles {
    type: string;
    truck: string;
    trailer: string;
    addVehicle: string;
    yearOfProduction: string;
    isLoadable: string;
    tankCapacity: string;
    weight: string;
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
    },
    {//pl
        type: 'Pojazd',
        truck: 'Ciężarówka',
        trailer: 'Naczepa/Przyczepa',
        addVehicle: 'Dodaj nowy pojazd',
        yearOfProduction: 'Rok produkcji',
        isLoadable: 'Pojazd ładowalny (np. solówka)',
        tankCapacity: 'Pojemność zbiorników paliwa',
        weight: 'Waga pojazdu (pole G)',
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
    }
];