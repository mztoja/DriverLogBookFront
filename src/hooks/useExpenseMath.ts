import React, {useEffect, useRef} from 'react';
import {FinanceEditData, GeneralFormData, LogEditData} from 'types';

export type ExpanseChangeType = 'amount' | 'switch' | 'foreignAmount' | 'quantity' | 'unitPrice';

/*
 * Przeliczanie ilość / cena jednostkowa / kwota (ten sam algorytm co w aplikacji mobilnej,
 * hooks/useExpenceMath.ts):
 * - wpisana cena jednostkowa -> kwota = cena × ilość
 * - wpisana kwota (aktywna: obca przy płatności w obcej walucie) -> cena = kwota / ilość
 * - zmiana ilości -> przeliczamy to, czego użytkownik NIE wpisał ostatnio (ostatnio cena -> kwota,
 *   ostatnio kwota -> cena). Wcześniej ilość zawsze liczyła kwotę z ceny, więc „kwota z paragonu,
 *   potem litry" mnożyła kwotę przez ilość.
 * Wartości wpisane przez sam hook są zapamiętywane i nie są traktowane jak zmiana użytkownika –
 * inaczej wyliczona kwota przeliczała zwrotnie cenę (np. 6,459 -> 6,46).
 */
type Source = 'unitPrice' | 'amount' | null;

const round2 = (n: number): string => (Math.round((n + Number.EPSILON) * 100) / 100).toString();

const compute = (
    change: 'unitPrice' | 'amount' | 'quantity',
    f: { quantity: string; unitPrice: string; amount: string },
    source: React.MutableRefObject<Source>,
): { key: 'amount' | 'unitPrice'; value: string } | null => {
    const qty = Number(f.quantity);
    const price = Number(f.unitPrice);
    const amount = Number(f.amount);
    if (change === 'unitPrice') {
        source.current = 'unitPrice';
        return price > 0 ? {key: 'amount', value: round2(price * qty)} : null;
    }
    if (change === 'amount') {
        source.current = 'amount';
        return qty > 0 ? {key: 'unitPrice', value: round2(amount / qty)} : null;
    }
    if (qty <= 0) return null;
    if (source.current === 'amount' && amount > 0) return {key: 'unitPrice', value: round2(amount / qty)};
    if (price > 0) return {key: 'amount', value: round2(price * qty)};
    if (amount > 0) return {key: 'unitPrice', value: round2(amount / qty)};
    return null;
};

type Written = Partial<Record<string, string>>;

// Czy zmiana pola to echo wartości wpisanej przez hook (a nie zmiana użytkownika)?
const isOwnWrite = (written: React.MutableRefObject<Written>, key: string, value: string): boolean => {
    if (written.current[key] !== undefined && written.current[key] === value) {
        delete written.current[key];
        return true;
    }
    delete written.current[key];
    return false;
};

export const useAddExpenseMath = (
    switchValue: 'false' | 'true',
    formData: GeneralFormData,
    updateFormData: (key: keyof GeneralFormData, value: string) => void,
    prevDep: React.MutableRefObject<Partial<Record<ExpanseChangeType, string>>>,
) => {
    const source = useRef<Source>(null);
    const written = useRef<Written>({});

    useEffect(() => {
        const foreign = switchValue === 'true';
        const amountKey: keyof GeneralFormData = foreign ? 'expenseForeignAmount' : 'expenseAmount';
        const save = (key: keyof GeneralFormData, value: string): void => {
            written.current[key] = value;
            updateFormData(key, value);
        };
        const run = (change: 'unitPrice' | 'amount' | 'quantity'): void => {
            const result = compute(change, {
                quantity: formData.expenseQuantity,
                unitPrice: formData.expenseUnitPrice,
                amount: formData[amountKey],
            }, source);
            if (!result) return;
            const key: keyof GeneralFormData = result.key === 'amount' ? amountKey : 'expenseUnitPrice';
            if (String(formData[key]) !== result.value) save(key, result.value);
        };

        if (prevDep.current.switch !== switchValue) {
            // przełącznik waluty obcej – przenosimy kwotę między polami
            if (foreign) {
                save('expenseForeignAmount', formData.expenseAmount);
                save('expenseAmount', '');
            } else {
                save('expenseAmount', formData.expenseForeignAmount);
                save('expenseForeignAmount', '');
            }
        } else {
            if (prevDep.current.amount !== formData.expenseAmount
                && !isOwnWrite(written, 'expenseAmount', formData.expenseAmount) && !foreign) {
                run('amount');
            }
            if (prevDep.current.foreignAmount !== formData.expenseForeignAmount
                && !isOwnWrite(written, 'expenseForeignAmount', formData.expenseForeignAmount) && foreign) {
                run('amount');
            }
            if (prevDep.current.quantity !== formData.expenseQuantity
                && !isOwnWrite(written, 'expenseQuantity', formData.expenseQuantity)) {
                run('quantity');
            }
            if (prevDep.current.unitPrice !== formData.expenseUnitPrice
                && !isOwnWrite(written, 'expenseUnitPrice', formData.expenseUnitPrice)) {
                run('unitPrice');
            }
        }
        prevDep.current.amount = formData.expenseAmount;
        prevDep.current.foreignAmount = formData.expenseForeignAmount;
        prevDep.current.quantity = formData.expenseQuantity;
        prevDep.current.unitPrice = formData.expenseUnitPrice;
        prevDep.current.switch = switchValue;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        switchValue,
        formData.expenseAmount,
        formData.expenseForeignAmount,
        formData.expenseQuantity,
        formData.expenseUnitPrice,
    ]);
};

export const useEditExpenseMath = (
    switchValue: 'false' | 'true',
    formData: FinanceEditData,
    updateFormData: (key: keyof FinanceEditData, subKey: keyof LogEditData | null, value: string | number) => void,
    prevDep: React.MutableRefObject<Partial<Record<ExpanseChangeType, string>>>,
) => {
    const source = useRef<Source>(null);
    const written = useRef<Written>({});

    useEffect(() => {
        const foreign = switchValue === 'true';
        const amountKey: keyof FinanceEditData = foreign ? 'foreignAmount' : 'amount';
        const save = (key: keyof FinanceEditData, value: string): void => {
            written.current[key] = value;
            updateFormData(key, null, value);
        };
        const run = (change: 'unitPrice' | 'amount' | 'quantity'): void => {
            const result = compute(change, {
                quantity: String(formData.quantity ?? ''),
                unitPrice: String(formData.unitPrice ?? ''),
                amount: String(formData[amountKey] ?? ''),
            }, source);
            if (!result) return;
            const key: keyof FinanceEditData = result.key === 'amount' ? amountKey : 'unitPrice';
            if (String(formData[key]) !== result.value) save(key, result.value);
        };

        if (prevDep.current.switch !== switchValue) {
            if (foreign) {
                save('foreignAmount', String(formData.amount ?? ''));
                save('amount', '');
            } else {
                save('amount', String(formData.foreignAmount ?? ''));
                save('foreignAmount', '');
            }
        } else {
            if (prevDep.current.amount !== formData.amount
                && !isOwnWrite(written, 'amount', String(formData.amount)) && !foreign) {
                run('amount');
            }
            if (prevDep.current.foreignAmount !== formData.foreignAmount
                && !isOwnWrite(written, 'foreignAmount', String(formData.foreignAmount)) && foreign) {
                run('amount');
            }
            if (prevDep.current.quantity !== formData.quantity
                && !isOwnWrite(written, 'quantity', String(formData.quantity))) {
                run('quantity');
            }
            if (prevDep.current.unitPrice !== formData.unitPrice
                && !isOwnWrite(written, 'unitPrice', String(formData.unitPrice))) {
                run('unitPrice');
            }
        }
        prevDep.current.amount = formData.amount;
        prevDep.current.foreignAmount = formData.foreignAmount;
        prevDep.current.quantity = formData.quantity;
        prevDep.current.unitPrice = formData.unitPrice;
        prevDep.current.switch = switchValue;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        switchValue,
        formData.amount,
        formData.foreignAmount,
        formData.quantity,
        formData.unitPrice,
    ]);
};
