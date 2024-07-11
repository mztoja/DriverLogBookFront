import React, {Dispatch, FormEvent, SetStateAction, useRef, useState} from "react";
import {FinanceInterface, userLangEnum, FinanceEditData, LogEditData} from "types";
import {useAlert} from "../../hooks/useAlert";
import {useApi} from "../../hooks/useApi";
import {defaultValues} from "./defaultValues";
import {Modal, ModalContent, StyledBackdrop} from "../common/Modal";
import {DateTimeInput} from "../common/form/DateTimeInput";
import {OdometerInput} from "../common/form/OdometerInput";
import {PlaceInput} from "../common/form/PlaceInput";
import {ActionInput} from "../common/form/ActionInput";
import {TextArea} from "../common/form/TextArea";
import {places} from "../../assets/txt/places";
import {CircularProgress} from "@mui/material";
import {SubmitButton} from "../common/form/SubmitButton";
import {finances} from "../../assets/txt/finances";
import {areFieldsEqual} from "./areFieldsEqual";
import {ExpenseQuantityInput} from "../common/form/finance/ExpenseQuantityInput";
import {UnitPriceInput} from "../common/form/finance/UnitPriceInput";
import {PaymentSelect} from "../common/form/finance/PaymentSelect";
import {AmountInput} from "../common/form/finance/AmountInput";
import {ItemDescriptionInput} from "../common/form/finance/ItemDescriptionInput";
import {OnOffSwitch} from "../common/form/OnOffSwitch";
import {form} from "../../assets/txt/form";
import {ExpanseChangeType, useEditExpenseMath} from "../../hooks/useExpenseMath";
import {apiPaths} from "../../config/api";

interface Props {
    finance: FinanceInterface | null;
    setFinance: Dispatch<SetStateAction<FinanceInterface | null>>;
    lang: userLangEnum;
    setRefresh: Dispatch<SetStateAction<boolean>>;
}

export const FinanceEdit = (props: Props) => {
    const {setAlert} = useAlert();
    const {loading, fetchData} = useApi();
    const [formData, setFormData] = useState<FinanceEditData>(defaultValues(props.finance));
    const [switchValue, setSwitchValue] = useState<'false' | 'true'>('false');

    const updateForm = (key: keyof FinanceEditData, subKey: keyof LogEditData | null, value: string | number): void => {
        if (subKey) {
            setFormData((formData: FinanceEditData) => ({
                ...formData,
                [key]: {
                    ...(formData[key] as any),
                    [subKey]: value,
                }
            }));
        } else {
            setFormData((formData: FinanceEditData) => ({...formData, [key]: value}));
        }
    };

    useEditExpenseMath(
        switchValue,
        formData,
        updateForm,
        useRef<Partial<Record<ExpanseChangeType, string>>>({
            amount: formData.amount,
            foreignAmount: formData.foreignAmount,
            quantity: formData.quantity,
            unitPrice: formData.unitPrice,
            switch: switchValue,
        }),
    );

    const sendForm = (e: FormEvent): void => {
        e.preventDefault();
        if (!props.finance) return;
        // const {unitPrice, ...sendData} = formData;
        const setData = {
            ...formData,
            id: props.finance.id,
            logData: {...formData.logData, id: props.finance.logId},
        };
        const {unitPrice, ...sendData} = setData;
        fetchData<FinanceInterface>(apiPaths.editFinance,
            {
                method: 'PATCH',
                sendData,
            }, {
                setAlert,
                lang: props.lang,
            }).then((res) => {
                if (res.success) {
                    setAlert(finances[props.lang].editSuccess, 'success');
                    props.setFinance(null);
                    props.setRefresh((prev) => !prev);
                }
        });
    }

    const handleClose = () => props.setFinance(null);

    return (
        <Modal
            aria-labelledby="finance-edit"
            open={props.finance !== null}
            onClose={handleClose}
            slots={{backdrop: StyledBackdrop}}
        >
            <ModalContent sx={{width: 400}}>
                <h2 onClick={handleClose}>{finances[props.lang].financeEditHeader}</h2>
                <form onSubmit={sendForm}>
                    <fieldset>
                        <legend>{finances[props.lang].logLegend}</legend>
                        <div><DateTimeInput
                            lang={props.lang}
                            value={formData.logData.date}
                            onChange={e => updateForm('logData', 'date', e)}
                            valueAsDefault
                        />
                        </div>
                        <br/>
                        <div><OdometerInput
                            lang={props.lang}
                            value={formData.logData.odometer}
                            onChange={e => updateForm('logData', 'odometer', e)}
                        />
                        </div>
                        <br/>
                        <div><PlaceInput
                            lang={props.lang}
                            defaultCountry={'PL'}
                            countryValue={formData.logData.country}
                            countryOnChange={e => updateForm('logData', 'country', e)}
                            placeValue={formData.logData.place}
                            placeOnChange={e => updateForm('logData', 'place', e)}
                            placeIdValue={formData.logData.placeId}
                            placeIdOnChange={e => updateForm('logData', 'placeId', e)}
                        />
                        </div>
                        <br/>
                        <div>
                            <ActionInput lang={props.lang} value={formData.logData.action}
                                         onChange={e => updateForm('logData', 'action', e)}/>
                        </div>
                        <br/>
                        <div><TextArea label={places[props.lang].description} value={formData.logData.notes}
                                       onChange={e => updateForm('logData', 'notes', e.target.value)}/></div>
                    </fieldset>
                    <br/><br/>
                    <div>
                        <ItemDescriptionInput
                            lang={props.lang}
                            value={formData.itemDescription}
                            onChange={e => updateForm('itemDescription', null, e)}
                        />
                    </div>
                    <br/>
                    <div>
                        <ExpenseQuantityInput
                            lang={props.lang}
                            value={formData.quantity}
                            onChange={e => updateForm('quantity', null, e)}
                        />&nbsp;
                        <UnitPriceInput
                            lang={props.lang}
                            value={formData.unitPrice}
                            onChange={e => updateForm('unitPrice', null, e)}
                        />&nbsp;
                        <PaymentSelect
                            lang={props.lang}
                            value={formData.payment}
                            onChange={e => updateForm('payment', null, e)}
                            editMode
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
                                    valueAmount={formData.foreignAmount}
                                    valueCurrency={formData.foreignCurrency}
                                    onChangeAmount={e => updateForm('foreignAmount', null, e)}
                                    onChangeCurrency={e => updateForm('foreignCurrency', null, e)}
                                    nameId='foreignAmount'
                                />
                            </div>
                            <br/>
                        </>
                    }
                    <div>
                        <AmountInput
                            lang={props.lang}
                            valueAmount={formData.amount}
                            valueCurrency={formData.currency}
                            onChangeAmount={e => updateForm('amount', null, e)}
                            onChangeCurrency={e => updateForm('currency', null, e)}
                            nameId='homeAmount'
                            currencyDisable
                        />
                    </div>
                    <br/>
                    <center>
                        {loading ?
                            <CircularProgress/> :
                            <SubmitButton
                                text={finances[props.lang].edit}
                                disabled={!props.finance || areFieldsEqual(props.finance, formData)}
                            />
                        }
                    </center>
                </form>
            </ModalContent>
        </Modal>
    );
}