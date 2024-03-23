import React, {useEffect} from 'react';
import {FinanceEditData, GeneralFormData, LogEditData} from 'types';

export type ExpanseChangeType = 'amount' | 'switch' | 'foreignAmount' | 'quantity' | 'unitPrice';

interface ExpenseAddMathParams {
    foreignAmountSwitch: boolean;
    formData: GeneralFormData;
    updateFormData: (key: keyof GeneralFormData, value: string) => void;
    change: ExpanseChangeType;
}

const expenseAddMath = (params: ExpenseAddMathParams): void => {
    const data = params.formData;
    const save = params.updateFormData;

    const countAmount = () => {
        if (Number(data.expenseUnitPrice) > 0) {
            const amount = Math.round((Number(data.expenseUnitPrice) * Number(data.expenseQuantity) + Number.EPSILON) * 100) / 100;
            save(params.foreignAmountSwitch ? 'expenseForeignAmount' : 'expenseAmount', amount.toString());
        }
    }
    const countUnitPrice = () => {
        if (Number(data.expenseQuantity) > 0) {
            const unitPrice = Math.round((Number(params.foreignAmountSwitch ? data.expenseForeignAmount : data.expenseAmount) / Number(data.expenseQuantity) + Number.EPSILON) * 100) / 100;
            save('expenseUnitPrice', unitPrice.toString());
        }
    }
    switch (params.change) {
        case "amount":
            if (!params.foreignAmountSwitch) countUnitPrice();
            break;
        case "foreignAmount":
            if (params.foreignAmountSwitch) countUnitPrice();
            break;
        case "quantity":
            countAmount();
            break;
        case "unitPrice":
            countAmount();
            break;
        case "switch":
            if (params.foreignAmountSwitch) {
                const amount = data.expenseAmount;
                save('expenseForeignAmount', amount);
                save('expenseAmount', '');
            } else {
                const foreignAmount = data.expenseForeignAmount;
                save('expenseForeignAmount', '');
                save('expenseAmount', foreignAmount);
            }
            break;
    }
}

interface ExpenseEditMathParams {
    foreignAmountSwitch: boolean;
    formData: FinanceEditData,
    updateFormData: (key: keyof FinanceEditData, subKey: keyof LogEditData | null, value: string | number) => void,
    change: ExpanseChangeType;
}

const expenseEditMath = (params: ExpenseEditMathParams): void => {
    const data = params.formData;
    const save = params.updateFormData;

    const countAmount = () => {
        if (Number(data.unitPrice) > 0) {
            const amount = Math.round((Number(data.unitPrice) * Number(data.quantity) + Number.EPSILON) * 100) / 100;
            save(params.foreignAmountSwitch ? 'foreignAmount' : 'amount', null, amount.toString());
        }
    }
    const countUnitPrice = () => {
        if (Number(data.quantity) > 0) {
            const unitPrice = Math.round((Number(params.foreignAmountSwitch ? data.foreignAmount : data.amount) / Number(data.quantity) + Number.EPSILON) * 100) / 100;
            save('unitPrice', null, unitPrice.toString());
        }
    }
    switch (params.change) {
        case "amount":
            if (!params.foreignAmountSwitch) countUnitPrice();
            break;
        case "foreignAmount":
            if (params.foreignAmountSwitch) countUnitPrice();
            break;
        case "quantity":
            countAmount();
            break;
        case "unitPrice":
            countAmount();
            break;
        case "switch":
            if (params.foreignAmountSwitch) {
                const amount = data.amount;
                save('foreignAmount', null, amount);
                save('amount', null, '');
            } else {
                const foreignAmount = data.foreignAmount;
                save('foreignAmount', null, '');
                save('amount', null, foreignAmount);
            }
            break;
    }
}

export const useAddExpenseMath = (
    switchValue: 'false' | 'true',
    formData: GeneralFormData,
    updateFormData: (key: keyof GeneralFormData, value: string) => void,
    prevDep: React.MutableRefObject<Partial<Record<ExpanseChangeType, string>>>,
) => {
    useEffect(() => {
        const expenseMathParams: Omit<ExpenseAddMathParams, 'change'> = {
            foreignAmountSwitch: switchValue === 'true',
            formData,
            updateFormData,
        };
        if (prevDep.current.amount !== formData.expenseAmount) {
            expenseAddMath({...expenseMathParams, change: 'amount'});
        }
        if (prevDep.current.foreignAmount !== formData.expenseForeignAmount) {
            expenseAddMath({...expenseMathParams, change: 'foreignAmount'});
        }
        if (prevDep.current.quantity !== formData.expenseQuantity) {
            expenseAddMath({...expenseMathParams, change: 'quantity'});
        }
        if (prevDep.current.unitPrice !== formData.expenseUnitPrice) {
            expenseAddMath({...expenseMathParams, change: 'unitPrice'});
        }
        if (prevDep.current.switch !== switchValue) {
            expenseAddMath({...expenseMathParams, change: 'switch'});
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
    useEffect(() => {
        const expenseMathParams: Omit<ExpenseEditMathParams, 'change'> = {
            foreignAmountSwitch: switchValue === 'true',
            formData,
            updateFormData,
        };
        if (prevDep.current.amount !== formData.amount) {
            expenseEditMath({...expenseMathParams, change: 'amount'});
        }
        if (prevDep.current.foreignAmount !== formData.foreignAmount) {
            expenseEditMath({...expenseMathParams, change: 'foreignAmount'});
        }
        if (prevDep.current.quantity !== formData.quantity) {
            expenseEditMath({...expenseMathParams, change: 'quantity'});
        }
        if (prevDep.current.unitPrice !== formData.unitPrice) {
            expenseEditMath({...expenseMathParams, change: 'unitPrice'});
        }
        if (prevDep.current.switch !== switchValue) {
            expenseEditMath({...expenseMathParams, change: 'switch'});
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