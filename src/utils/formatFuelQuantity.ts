export const formatFuelQuantity = (fuel: any): string => {
    const quantity = parseFloat(fuel);
    if (!isNaN(quantity)) {
        return quantity.toFixed(1) + ' L';
    } else {
        return '--- L';
    }
}