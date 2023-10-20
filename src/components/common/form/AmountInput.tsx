import React, {useEffect, useState} from "react";
import {UserLangEnum} from "types";
import InputLabel from "@mui/material/InputLabel";
import {form} from "../../../assets/txt/form";
import {MenuItem, OutlinedInput, Select} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import {currencies} from "../../../data/currencies";
import InputAdornment from "@mui/material/InputAdornment";
import {extractNumberWithDecimal} from "../../../utils/extractNumberWithDecimal";

interface Props {
    lang: UserLangEnum;
    valueAmount: string;
    valueCurrency: string;
    onChangeAmount: (e: any) => void;
    onChangeCurrency: (e: any) => void;
    nameId: string;
}

export const AmountInput = (props: Props) => {

    const [symbol,setSymbol] = useState<string>('€');
    const [amount,setAmount] = useState<string>(props.valueAmount);
    const [valueCurrency, setValueCurrency] = useState<string>(props.valueCurrency || 'EUR');

    useEffect(() => {
        props.onChangeCurrency(valueCurrency);
        // eslint-disable-next-line array-callback-return
        currencies.map(e => {
            if (e.code === valueCurrency){
                setSymbol(e.symbol);
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueCurrency]);

    useEffect(() => {
        setAmount(extractNumberWithDecimal(props.valueAmount));
    }, [props.valueAmount]);

    return (
        <>
            <FormControl>
                <InputLabel className="TextInput__Label">{form[props.lang].amount}</InputLabel>
                <OutlinedInput
                    id={props.nameId}
                    value={amount}
                    inputProps={{className: 'TextInput'}}
                    startAdornment={<InputAdornment position="start"><div className="TextInput">{symbol}</div></InputAdornment>}
                    label={form[props.lang].amount}
                    onChange={props.onChangeAmount}
                    autoComplete='off'
                    size='small'
                />
            </FormControl>
            <FormControl>
                <InputLabel className="TextInput__Label">{form[props.lang].currency}</InputLabel>
                <Select
                    id={props.nameId+'currency'}
                    value={valueCurrency}
                    label={form[props.lang].currency}
                    onChange={(e) => {setValueCurrency(e.target.value);}}
                    required
                    inputProps={{className: 'TextInput'}}
                    size='small'
                >
                    {currencies.map(option => (
                        <MenuItem key={option.code} value={option.code}>{option.code} ({option.symbol})</MenuItem>)
                    )}
                </Select>
            </FormControl>
        </>

    );

}