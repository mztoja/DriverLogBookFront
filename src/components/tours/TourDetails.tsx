import {TourInterface, userLangEnum} from "types";
import React, {useEffect, useRef, useState} from "react";
import {apiPaths} from "../../config/api";
import {tours} from "../../assets/txt/tours";
import {useAlert} from "../../hooks/useAlert";
import {useApi} from "../../hooks/useApi";
import {CircularProgress, Fab} from "@mui/material";
import {formatDate} from "../../utils/formatDate";
import {formatTime} from "../../utils/formatTime";
import {formatFuelQuantity} from "../../utils/formatFuelQuantity";
import {formatFuelCombustion} from "../../utils/formatFuelCombustion";
import {formatWeight} from "../../utils/formatWeight";
import {formatOdometer} from "../../utils/formatOdometer";
import {formatAmount} from "../../utils/formatAmount";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import ListIcon from '@mui/icons-material/List';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {LogsList} from "../logs/LogsList";
import {DaysList} from "../days/DaysList";
import {FinancesList} from "../finances/FinancesList";
import {LoadingsList} from "../loadings/LoadingsList";

interface Props {
    lang: userLangEnum;
    tourId: number | null;
}

export const TourDetails = (props: Props) => {
    const {setAlert} = useAlert();
    const {loading, fetchData} = useApi();
    const [data, setData] = useState<TourInterface | null>(null);
    const [showLogList, setShowLogList] = useState<boolean>(false);
    const [showDayList, setShowDayList] = useState<boolean>(false);
    const [showFinanceList, setShowFinanceList] = useState<boolean>(false);
    const [showLoadList, setShowLoadList] = useState<boolean>(false);
    const logListRef = useRef<HTMLDivElement>(null);
    const dayListRef = useRef<HTMLDivElement>(null);
    const financeListRef = useRef<HTMLDivElement>(null);
    const loadListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (props.tourId) {
            (async () => {
                const result = await fetchData(apiPaths.getRouteById + '/' + props.tourId, 'GET');
                if ((result && result.responseData) && (!result.responseData.dtc)) {
                    setData(result.responseData);
                } else {
                    setAlert(tours[props.lang].apiError3, 'error');
                }
            })();
        } else {
            setData(null);
        }
        window.scrollTo({top: 0, behavior: 'smooth'});
        // eslint-disable-next-line
    }, [props.tourId]);

    const handleLogListButton = () => {
        setShowLogList(true);
        logListRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    const handleDayListButton = () => {
        setShowDayList(true);
        dayListRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    const handleFinanceListButton = () => {
        setShowFinanceList(true);
        financeListRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    const handleLoadListButton = () => {
        setShowLoadList(true);
        loadListRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    if (loading || !data) {
        return <CircularProgress/>
    }

    return (
        <>
            <fieldset>
                <legend>{tours[props.lang].tour} {data.tourNr}</legend>
                <table>
                    <tbody>
                    <tr>
                        <td>{tours[props.lang].from}:</td>
                        <td>
                            {data.startLogData
                                ? formatDate(data.startLogData.date, props.lang)
                                : tours[props.lang].na
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>{tours[props.lang].to}:</td>
                        <td>
                            {data.stopLogData
                                ? formatDate(data.stopLogData.date, props.lang)
                                : tours[props.lang].na
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>{tours[props.lang].driveTime}:</td>
                        <td>{formatTime(data.driveTime)}</td>
                    </tr>
                    <tr>
                        <td>{tours[props.lang].workTime}:</td>
                        <td>{formatTime(data.workTime)}</td>
                    </tr>
                    <tr>
                        <td>{tours[props.lang].onDuty} / {tours[props.lang].offDuty}:</td>
                        <td>{data.daysOnDuty} / {data.daysOffDuty} ({Number(data.daysOnDuty) + Number(data.daysOffDuty)})</td>
                    </tr>
                    <tr>
                        <td>{tours[props.lang].fuel} {tours[props.lang].before}:</td>
                        <td>{formatFuelQuantity(data.fuelStateBefore, 'integer')}</td>
                    </tr>
                    <tr>
                        <td>{tours[props.lang].fuel} {tours[props.lang].after}:</td>
                        <td>{formatFuelQuantity(data.fuelStateAfter, 'integer')}</td>
                    </tr>
                    <tr>
                        <td>{tours[props.lang].burned} ({tours[props.lang].boardComputer}):</td>
                        <td>{formatFuelQuantity(data.burnedFuelComp, 'integer')}</td>
                    </tr>
                    <tr>
                        <td>{tours[props.lang].burned} ({tours[props.lang].real}):</td>
                        <td>{formatFuelQuantity(data.burnedFuelReal, 'integer')}</td>
                    </tr>
                    <tr>
                        <td>{tours[props.lang].refueled}:</td>
                        <td>{formatFuelQuantity(data.totalRefuel, 'twoDecimals')}</td>
                    </tr>
                    <tr>
                        <td>{tours[props.lang].fuelUsage}:</td>
                        <td>
                            {formatFuelCombustion(Number(data.fuelStateBefore) + Number(data.totalRefuel) - Number(data.fuelStateAfter), data.distance)}
                        </td>
                    </tr>
                    <tr>
                        <td>{tours[props.lang].averageLoadWeight}:</td>
                        <td>{formatWeight(data.avgWeight)}</td>
                    </tr>
                    <tr>
                        <td>{tours[props.lang].numberOfLoads}:</td>
                        <td>{data.numberOfLoads}</td>
                    </tr>
                    <tr>
                        <td>{tours[props.lang].distance}:</td>
                        <td>{formatOdometer(data.distance)}</td>
                    </tr>
                    <tr>
                        <td>{tours[props.lang].salary} ({tours[props.lang].predicted}):</td>
                        <td>{formatAmount(Number(data.expectedSalary), data.currency)}</td>
                    </tr>
                    <tr>
                        <td>{tours[props.lang].salary} ({tours[props.lang].real})</td>
                        <td>{formatAmount(Number(data.salary), data.currency)}</td>
                    </tr>
                    <tr>
                        <td>{tours[props.lang].rate} ({tours[props.lang].perKm}):</td>
                        <td>
                            {data.salary > 0
                                ? formatAmount(Number(data.salary) / Number(data.distance), data.currency)
                                : tours[props.lang].na
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>{tours[props.lang].rate} ({tours[props.lang].perHour}):</td>
                        <td>
                            {data.salary > 0
                                ? formatAmount(Number(data.salary) / (Number(data.workTime.split(":")[0]) + (Number(data.workTime.split(":")[1]) / 60)), data.currency)
                                : tours[props.lang].na
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>{tours[props.lang].rate} ({tours[props.lang].perDay}):</td>
                        <td>
                            {data.salary > 0
                                ? formatAmount(Number(data.salary) / (Number(data.daysOnDuty) + Number(data.daysOffDuty)), data.currency)
                                : tours[props.lang].na
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>{tours[props.lang].outgoings}:</td>
                        <td>{formatAmount(Number(data.outgoings), data.currency)}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <center>
                                <br/>
                            <Fab variant="extended" size="small" color="primary" onClick={() => handleLogListButton()}>
                                <ListIcon sx={{mr: 1}}/>
                                {tours[props.lang].showLogs}
                            </Fab><br/><br/>
                            <Fab variant="extended" size="small" color="primary" onClick={() => handleDayListButton()}>
                                <FormatListNumberedIcon sx={{mr: 1}}/>
                                {tours[props.lang].showDays}
                            </Fab><br/><br/>
                            <Fab variant="extended" size="small" color="primary" onClick={() => handleFinanceListButton()}>
                                <PaymentIcon sx={{mr: 1}}/>
                                {tours[props.lang].showFinances}
                            </Fab><br/><br/>
                            <Fab variant="extended" size="small" color="primary" onClick={() => handleLoadListButton()}>
                                <LocalShippingIcon sx={{mr: 1}}/>
                                {tours[props.lang].showLoads}
                            </Fab><br/><br/>
                            </center>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </fieldset>
            <div className='DivClear'/>
            <br/>
            <div ref={logListRef}>
                {props.tourId && showLogList && <LogsList lang={props.lang} tourId={props.tourId} setShowLogList={setShowLogList}/>}
            </div>
            <br/>
            <div ref={dayListRef}>
                {props.tourId && showDayList && <DaysList lang={props.lang} tourId={props.tourId} setShowDayList={setShowDayList}/>}
            </div>
            <br/>
            <div ref={financeListRef}>
                {props.tourId && showFinanceList && <FinancesList lang={props.lang} tourId={props.tourId} setShowFinancesList={setShowFinanceList}/>}
            </div>
            <br/>
            <div ref={loadListRef}>
                {props.tourId && showLoadList && <LoadingsList lang={props.lang} tourId={props.tourId} setShowLoadingsList={setShowLoadList}/>}
            </div>
            <br/>
        </>
    );
}