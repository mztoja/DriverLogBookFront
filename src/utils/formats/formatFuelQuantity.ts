export const formatFuelQuantity = (fuel: any, option: 'integer' | 'oneDecimal' | 'twoDecimals'): string => {
    const quantity = parseFloat(fuel);
    if (!isNaN(quantity)) {
        switch (option) {
            case 'integer':
                return quantity.toFixed(0) + ' L';
            case 'oneDecimal':
                return quantity.toFixed(1) + ' L';
            case 'twoDecimals':
                return quantity.toFixed(2) + ' L';
            default:
                return quantity.toFixed(0) + ' L';
        }
    } else {
        return '--- L';
    }
}