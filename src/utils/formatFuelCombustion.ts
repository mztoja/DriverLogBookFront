export const formatFuelCombustion = (fuel: number, distance: number): string => {
const fuelCombustion = fuel * 100 / distance;
if (isNaN(fuelCombustion) || !isFinite(fuelCombustion)) {
    return '- - -';
}
return '∅ '+fuelCombustion.toFixed(1);
}