import {InputPropsTypes} from "../../../../types/InputPropsTypes";
import {useApi} from "../../../../hooks/useApi";
import React, {useEffect, useState} from "react";
import {PaymentInterface} from "types";
import {apiPaths} from "../../../../config/api";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {form} from "../../../../assets/txt/form";
import {CircularProgress, MenuItem, Select, Tooltip} from "@mui/material";
import {Link} from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import {PaymentsSettings} from "./PaymentsSettings";

export const PaymentSelect = (props: InputPropsTypes) => {
    const {loading, fetchDataOld} = useApi();
    const [paymentsList, setPaymentsList] = useState<PaymentInterface[]>([]);
    const [value, setValue] = useState<string>(props.value !== '' ? props.value : form[props.lang].cash);
    const [showPaymentsSettings, setShowPaymentsSettings] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const result = await fetchDataOld(apiPaths.getPaymentMethods, 'GET');
            if ((result && result.responseData) && (!result.responseData.dtc)) {
                setPaymentsList(result.responseData);
                const defaultPayment = result.responseData.find((payment: PaymentInterface) => payment.default === true);
                setValue(defaultPayment ? defaultPayment.method : form[props.lang].cash);
            }
        })();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        props.onChange(value);
        // eslint-disable-next-line
    }, [value]);

    const handleClick = () => {
        setShowPaymentsSettings(true);
    }

    if ((paymentsList.length > 0) || (paymentsList.length === 0 && !loading)) return (
        <FormControl sx={{ minWidth: '100px' }}>
            {showPaymentsSettings &&
                <PaymentsSettings
                    open={showPaymentsSettings}
                    setOpen={setShowPaymentsSettings}
                    paymentsList={paymentsList}
                    setPaymentsList={setPaymentsList}
                    lang={props.lang}
                />
            }
            <InputLabel id="paymentSelect" className="TextInput__Label">
                <Tooltip title={form[props.lang].paymentSetTitle} arrow>
                    <Link to="" className="Link" onClick={handleClick}>
                        <SettingsIcon/>
                    </Link>
                </Tooltip>
                {form[props.lang].paymentSelect}
            </InputLabel>
            <Select
                label={form[props.lang].paymentSelect}
                id="paymentSelect"
                value={paymentsList.length > 0 ? value : form[props.lang].cash}
                onChange={(e) => {
                    //props.onChange(e.target.value);
                    setValue(e.target.value);
                }}
                inputProps={{className: 'TextInput'}}
                size='small'
            >
                <MenuItem value={form[props.lang].cash}>{form[props.lang].cash}</MenuItem>
                {paymentsList.length > 0 &&
                    paymentsList.map(payment => (
                    <MenuItem key={payment.id} value={payment.method}>{payment.method}</MenuItem>))
                }
            </Select>
        </FormControl>
    );

    return <CircularProgress/>;
}