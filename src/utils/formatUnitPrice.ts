export const formatUnitPrice = (quantity: number, price: number): string => {
    if (quantity === 0) {
        return '0.00';
    } else {
        const unitPrice = price / quantity;
        return unitPrice.toFixed(2);
    }
}