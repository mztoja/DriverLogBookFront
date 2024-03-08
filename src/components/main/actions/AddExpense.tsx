import {ActionsPropsTypes} from "../../../types/ActionsPropsTypes";
import {AddExpenseData, ExpenseEnum} from "types";
import {useApi} from "../../../hooks/useApi";
import {useAlert} from "../../../hooks/useAlert";
import React, {FormEvent, useEffect, useRef, useState} from "react";
import {apiPaths} from "../../../config/api";
import {home} from "../../../assets/txt/home";
import {CircularProgress} from "@mui/material";
import {Link} from "react-router-dom";
import {DateTimeInput} from "../../common/form/DateTimeInput";
import {OdometerInput} from "../../common/form/OdometerInput";
import {PlaceInput} from "../../common/form/PlaceInput";
import {TextArea} from "../../common/form/TextArea";
import {places} from "../../../assets/txt/places";
import {SubmitButton} from "../../common/form/SubmitButton";
import {PaymentSelect} from "../../common/form/finance/PaymentSelect";
import {ExpenseQuantityInput} from "../../common/form/finance/ExpenseQuantityInput";
import {UnitPriceInput} from "../../common/form/finance/UnitPriceInput";
import {AmountInput} from "../../common/form/finance/AmountInput";
import {OnOffSwitch} from "../../common/form/OnOffSwitch";
import {form} from "../../../assets/txt/form";
import {ExpanseChangeType} from "../../../hooks/useExpenseMath";
import {useExpenseMath} from "../../../hooks/useExpenseMath";
import {ItemDescriptionInput} from "../../common/form/finance/ItemDescriptionInput";
import {countries} from "../../../data/countries";

interface Props extends ActionsPropsTypes {
    expenseType: ExpenseEnum;
}

export const AddExpense = (props: Props) => {
    const [switchValue, setSwitchValue] = useState<'false' | 'true'>('false');
    const {loading, fetchData} = useApi();
    const {setAlert} = useAlert();
    const [foreignCurrency, setForeignCurrency] = useState<string>('');

    useEffect(() => {
        const find = countries.find((country) => country.code === props.userData.country);
        if (find) {
            setForeignCurrency(find.currency);
            if (find.currency !== props.userData.currency) setSwitchValue('true');
        }
        // eslint-disable-next-line
    }, []);

    useExpenseMath(
        switchValue,
        props.formData,
        props.updateFormData,
        useRef<Partial<Record<ExpanseChangeType, string>>>({
            amount: props.formData.expenseAmount,
            foreignAmount: props.formData.expenseForeignAmount,
            quantity: props.formData.expenseQuantity,
            unitPrice: props.formData.expenseUnitPrice,
            switch: switchValue,
        }),
    );

    const sendAddExpense = async (e: FormEvent) => {
        e.preventDefault();
        const itemDescription =
            props.expenseType === ExpenseEnum.fuel
                ? home[props.lang].addFuelRefuel
                : props.expenseType === ExpenseEnum.def
                    ? home[props.lang].addDefRefuel
                    : props.formData.expenseItemDescription;
        const sendData: AddExpenseData = {
            date: props.formData.date,
            country: props.formData.country,
            place: props.formData.place,
            placeId: props.formData.placeId,
            odometer: props.formData.odometer,
            notes: props.formData.notes,
            action: home[props.lang].expenseAddAction + ': ' + itemDescription,
            payment: props.formData.payment,
            expenseItemDescription: itemDescription,
            expenseQuantity: props.formData.expenseQuantity !== ''
                ? props.formData.expenseQuantity
                : '0',
            expenseUnitPrice: props.formData.expenseUnitPrice !== ''
                ? props.formData.expenseUnitPrice
                : '0',
            expenseCurrency: props.formData.expenseCurrency,
            expenseAmount: props.formData.expenseAmount !== ''
                ? props.formData.expenseAmount
                : '0',
            expenseForeignCurrency: props.formData.expenseForeignCurrency,
            expenseForeignAmount: props.formData.expenseForeignAmount !== ''
                ? props.formData.expenseForeignAmount
                : '0',
            expenseType: props.expenseType,
        }
        fetchData(apiPaths.createExpense, {method: 'POST', sendData}, {setAlert, lang: props.lang})
            .then((res) => {
                if (res.success) {
                    setAlert(home[props.lang].addedExpenseActionSuccess, 'success');
                    props.setActivityForm(null);
                    props.setRefresh((prev => !prev));
                    props.updateFormData('expenseItemDescription', '');
                    props.updateFormData('expenseQuantity', '1');
                    props.updateFormData('expenseAmount', '');
                    props.updateFormData('expenseUnitPrice', '');
                    props.updateFormData('expenseForeignAmount', '');
                }
            });
    }

    return (
        <fieldset>
            <Link to="" className="Link" onClick={() => props.setActivityForm(null)}>{home[props.lang].back}</Link><br/><br/>
            <legend>
                {props.expenseType === ExpenseEnum.standard && home[props.lang].addExpense}
                {props.expenseType === ExpenseEnum.fuel && home[props.lang].addFuelRefuel}
                {props.expenseType === ExpenseEnum.def && home[props.lang].addDefRefuel}
            </legend>
            <form onSubmit={sendAddExpense}>
                <div><DateTimeInput
                    lang={props.lang}
                    value={props.formData.date}
                    onChange={e => props.updateFormData('date', e)}
                />
                </div>
                <br/>
                <div><OdometerInput
                    lang={props.lang}
                    value={props.formData.odometer}
                    onChange={e => props.updateFormData('odometer', e)}
                />
                </div>
                <br/>
                <div><PlaceInput
                    lang={props.lang}
                    defaultCountry={props.userData.country}
                    countryValue={props.formData.country}
                    countryOnChange={e => props.updateFormData('country', e)}
                    placeValue={props.formData.place}
                    placeOnChange={e => props.updateFormData('place', e)}
                    placeIdValue={props.formData.placeId}
                    placeIdOnChange={e => props.updateFormData('placeId', e)}
                />
                </div>
                <br/>
                <div>
                    <ItemDescriptionInput
                        lang={props.lang}
                        value={
                            props.expenseType === ExpenseEnum.fuel
                                ? home[props.lang].addFuelRefuel
                                : props.expenseType === ExpenseEnum.def
                                    ? home[props.lang].addDefRefuel
                                    : props.formData.expenseItemDescription
                        }
                        onChange={e => props.updateFormData('expenseItemDescription', e)}
                        disabled={props.expenseType !== ExpenseEnum.standard}
                    />
                </div>
                <br/>
                <div>
                    <ExpenseQuantityInput
                        lang={props.lang}
                        value={props.formData.expenseQuantity}
                        onChange={e => props.updateFormData('expenseQuantity', e)}
                    />&nbsp;
                    <UnitPriceInput
                        lang={props.lang}
                        value={props.formData.expenseUnitPrice}
                        onChange={e => props.updateFormData('expenseUnitPrice', e)}
                    />&nbsp;
                    <PaymentSelect
                        lang={props.lang}
                        value={props.formData.payment}
                        onChange={e => props.updateFormData('payment', e)}
                    />
                </div>
                <br/>
                <div>
                    <OnOffSwitch
                        label={form[props.lang].expenseForeignCurrency}
                        value={switchValue}
                        onChange={e => setSwitchValue(e)}
                    />
                </div>
                <br/>
                {switchValue === 'true' &&
                    <>
                        <div>
                            <AmountInput
                                lang={props.lang}
                                valueAmount={props.formData.expenseForeignAmount}
                                valueCurrency={
                                    props.formData.expenseForeignCurrency !== ''
                                        ? props.formData.expenseForeignCurrency
                                        : foreignCurrency}
                                onChangeAmount={e => props.updateFormData('expenseForeignAmount', e)}
                                onChangeCurrency={e => props.updateFormData('expenseForeignCurrency', e)}
                                nameId='foreignAmount'
                            />
                        </div>
                        <br/>
                    </>
                }

                <div>
                    <AmountInput
                        lang={props.lang}
                        valueAmount={props.formData.expenseAmount}
                        valueCurrency={props.userData.currency}
                        onChangeAmount={e => props.updateFormData('expenseAmount', e)}
                        onChangeCurrency={e => props.updateFormData('expenseCurrency', e)}
                        nameId='homeAmount'
                        currencyDisable
                    />
                </div>
                <br/>
                <div><TextArea label={places[props.lang].description} value={props.formData.notes}
                               onChange={e => props.updateFormData('notes', e.target.value)}/></div>
                <br/>
                {loading ?
                    <CircularProgress/> :
                    <SubmitButton
                        text={props.expenseType === ExpenseEnum.fuel ? home[props.lang].addFuelRefuel : props.expenseType === ExpenseEnum.def ? home[props.lang].addDefRefuel : home[props.lang].addExpense}/>
                }
            </form>
            <br/>
            <Link to="" className="Link" onClick={() => props.setActivityForm(null)}>{home[props.lang].back}</Link>
        </fieldset>
    );
}