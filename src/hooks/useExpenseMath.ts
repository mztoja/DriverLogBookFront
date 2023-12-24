import React, {useEffect} from 'react';
import {GeneralFormData} from 'types';

export type ExpanseChangeType = 'amount' | 'switch' | 'foreignAmount' | 'quantity' | 'unitPrice';

interface ExpenseMathParams {
    foreignAmountSwitch: boolean;
    formData: GeneralFormData;
    updateFormData: (key: keyof GeneralFormData, value: string) => void;
    change: ExpanseChangeType;
}

const expenseMath = (params: ExpenseMathParams): void => {
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

export const useExpenseMath = (
    switchValue: 'false' | 'true',
    formData: GeneralFormData,
    updateFormData: (key: keyof GeneralFormData, value: string) => void,
    prevDep: React.MutableRefObject<Partial<Record<ExpanseChangeType, string>>>,
) => {
    useEffect(() => {
        const expenseMathParams: Omit<ExpenseMathParams, 'change'> = {
            foreignAmountSwitch: switchValue === 'true',
            formData,
            updateFormData,
        };
        if (prevDep.current.amount !== formData.expenseAmount) {
            expenseMath({...expenseMathParams, change: 'amount'});
        }
        if (prevDep.current.foreignAmount !== formData.expenseForeignAmount) {
            expenseMath({...expenseMathParams, change: 'foreignAmount'});
        }
        if (prevDep.current.quantity !== formData.expenseQuantity) {
            expenseMath({...expenseMathParams, change: 'quantity'});
        }
        if (prevDep.current.unitPrice !== formData.expenseUnitPrice) {
            expenseMath({...expenseMathParams, change: 'unitPrice'});
        }
        if (prevDep.current.switch !== switchValue) {
            expenseMath({...expenseMathParams, change: 'switch'});
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