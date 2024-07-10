import {currencies} from "../../data/currencies";

export const formatAmount = (amount: number, currency: string): string => {
    const symbol = currencies.find(curr => curr.code === currency)?.symbol;
    if (symbol) {
        return amount.toFixed(2) + ' ' + symbol;
    }
    return '- - -';
}