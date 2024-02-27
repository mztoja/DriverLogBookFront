import React, {Dispatch, SetStateAction, useState} from "react";
import {TourInterface, TourSettleFormInterface, tourStatusEnum, userLangEnum } from "types";
import {SetAlertType} from "../../context/AlertContext";
import {Modal, ModalContent, StyledBackdrop} from "../common/Modal";
import {tours} from "../../assets/txt/tours";
import {formatDate} from "../../utils/formatDate";
import {formatOdometer} from "../../utils/formatOdometer";
import {getFirstDayOfPreviousMonth} from "../../utils/getFirstDayOfPerviousMonth";
import {AmountInput} from "../common/form/finance/AmountInput";
import {DateInput} from "../common/form/DateInput";
import {CircularProgress, Fab} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import {apiPaths} from "../../config/api";
import {handleApiResult} from "../../utils/handleApiResult";
import {useApi} from "../../hooks/useApi";

interface Props {
    lang: userLangEnum;
    setRefresh: Dispatch<SetStateAction<boolean>>;
    tourList: TourInterface[];
    setAlert: (text: string, type: SetAlertType) => void;
    show: boolean
    setShow: Dispatch<SetStateAction<boolean>>;
}

export const ToursCreateSettlement = (props: Props) => {
    const defaultValues: TourSettleFormInterface = {
        toursId: [],
        amount: '0',
        month: getFirstDayOfPreviousMonth(),
        currency: '',
    };
    const [settlementForm, setSettlementForm] = useState<TourSettleFormInterface>(defaultValues);
    const {loading, fetchData} = useApi();

    const updateForm = (key: keyof TourSettleFormInterface, value: any):void => {
        setSettlementForm((editForm: TourSettleFormInterface) => ({
            ...editForm,
            [key]: value,
        }));
    };

    const handleClick = (id:string, currency: string):void => {
        if (settlementForm.toursId.includes(id.toString())) {
            updateForm('toursId', settlementForm.toursId.filter(tourId => tourId !== id.toString()));
        } else {
            if (settlementForm.toursId.length > 0 && currency !== settlementForm.currency) {
                updateForm('toursId', [id.toString()]);
            } else {
                updateForm('toursId', [...settlementForm.toursId, id.toString()]);
            }
            updateForm('currency', currency);
        }
    }

    const sendForm = async ():Promise<void> => {
        const result = await fetchData(apiPaths.createSettlement, 'POST', settlementForm);
        handleApiResult(result, props.lang, props.setAlert, () => {
            props.setAlert(tours[props.lang].createSettlementSuccess, 'success');
            props.setRefresh(prev => !prev);
        });
        props.setShow(false);
    }

    return (
        <>
            <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={props.show}
                onClose={() => props.setShow(false)}
                slots={{backdrop: StyledBackdrop}}
            >
                <ModalContent sx={{width: 1000}}>
                    <center><h2>{tours[props.lang].createMonthlySettlement}</h2></center>
                    {tours[props.lang].selectRoutes}:<br/>
                    <table>
                        <thead>
                        <tr>
                            <th>
                                {tours[props.lang].tour}
                            </th>
                            <th>
                                {tours[props.lang].from}
                                <br/>
                                {tours[props.lang].to}
                            </th>
                            <th>
                                {tours[props.lang].distance}
                            </th>
                            <th>
                                {tours[props.lang].currency}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.tourList.map((tour,index) => {
                            if (tour.status === tourStatusEnum.finished) {
                                return (
                                    <tr
                                        key={index}
                                        className={settlementForm.toursId.includes(tour.id.toString()) ? 'highlighted' : ''}
                                        onClick={() => handleClick(tour.id.toString(), tour.currency)}
                                    >
                                        <td>
                                            {tour.tourNr}
                                        </td>
                                        <td>
                                            {tour.startLogData
                                                ? formatDate(tour.startLogData.date, props.lang)
                                                : tours[props.lang].na
                                            }<br/>
                                            {tour.stopLogData
                                                ? formatDate(tour.stopLogData.date, props.lang)
                                                : tours[props.lang].na
                                            }
                                        </td>
                                        <td>
                                            {formatOdometer(tour.distance)}
                                        </td>
                                        <td>
                                            {tour.currency}
                                        </td>
                                    </tr>
                                );
                            }
                            return <tr key={index}></tr>;
                        })}
                        </tbody>
                    </table>
                    <br/>
                    {settlementForm.toursId.length > 0 &&
                        <>
                            {tours[props.lang].chasedTours}: {settlementForm.toursId.map(id => {
                            const find = props.tourList.find(tour => tour.id === Number(id));
                            if (find) {
                                return find.tourNr.toString();
                            }
                            return '';
                        }).join(' ')}
                        </>
                    }
                    <br/><br/>
                    <center>
                        {tours[props.lang].amountEnter}:<br/><br/>
                        <AmountInput
                            key={settlementForm.currency}
                            lang={props.lang}
                            valueAmount={settlementForm.amount}
                            valueCurrency={settlementForm.currency}
                            onChangeAmount={e => updateForm('amount', e)}
                            onChangeCurrency={e => updateForm('currency', e)}
                            nameId='amount'
                            currencyDisable
                        />
                        <br/><br/>
                        {tours[props.lang].monthEnter}:<br/><br/>
                        <DateInput
                            label={tours[props.lang].monthEnter}
                            lang={props.lang}
                            value={settlementForm.month}
                            onChange={e => updateForm('month', e)}
                            onlyMonth
                        />
                        <br/><br/>
                        {loading
                            ? <CircularProgress/>
                            : <Fab variant="extended" size="small" color="primary" onClick={() => sendForm()}>
                                <AssignmentIcon sx={{mr: 1}}/>
                                {tours[props.lang].settle}</Fab>
                        }
                    </center>
                </ModalContent>
            </Modal>
        </>
    );
}