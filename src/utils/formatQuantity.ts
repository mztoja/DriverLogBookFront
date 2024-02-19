export const formatQuantity = (quantity: number): string => {
    if (quantity === 0) {
        return '1';
    } else if (Number.isInteger(quantity)) {
        const stringifier = quantity.toString();
        return stringifier.endsWith('.00') ? stringifier.slice(0, -3) : stringifier;
    } else {
        return quantity.toString();
    }
}