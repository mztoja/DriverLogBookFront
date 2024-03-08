import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {TourMInterface, TourNumbersInterface, userLangEnum } from "types";
import {apiPaths} from "../../config/api";
import {tours} from "../../assets/txt/tours";
import {CircularProgress, Fab} from "@mui/material";
import {useApi} from "../../hooks/useApi";
import {useAlert} from "../../hooks/useAlert";
import {formatTimeToTime} from "../../utils/formats/formatTimeToTime";
import {formatFuelQuantity} from "../../utils/formats/formatFuelQuantity";
import {formatFuelCombustion} from "../../utils/formats/formatFuelCombustion";
import {formatWeight} from "../../utils/formats/formatWeight";
import {formatOdometer} from "../../utils/formats/formatOdometer";
import {formatAmount} from "../../utils/formats/formatAmount";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {formatShortDate} from "../../utils/formats/formatShortDate";
import {ToursList} from "./ToursList";
import {MonthlySettlementTypes} from "../../types/MonthlySettlementTypes";
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import {DownloadFromLocalStorage, SaveToLocalStorage} from "../../hooks/LocalStorageHook";

interface Props {
    lang: userLangEnum;
    refresh: boolean;
    setRefresh: Dispatch<SetStateAction<boolean>>;
    setSelectedTour: Dispatch<SetStateAction<number | null>>;
}

const defaultYear = ():number => {
    const year = DownloadFromLocalStorage('toursSetYear');
    if (year) {
        return Number(year);
    }
    return new Date().getFullYear();
}

const defaultMonthlySettlement = (): MonthlySettlementTypes | null => {
    const id = Number(DownloadFromLocalStorage('toursSetId'));
    const month = DownloadFromLocalStorage('toursSetMonth');
    if (id && month) {
        return {id, month}
    }
    return null;
}

export const ToursSettlementList = (props: Props) => {
    const {loading, fetchDataOld} = useApi();
    const {setAlert} = useAlert();
    const [data, setData] = useState<TourMInterface[]>([]);
    const [year, setYear] = useState<number>(defaultYear());
    const [tourNrs, setTourNrs] = useState<TourNumbersInterface[]>([]);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [expandedRow, setExpandedRow] = useState<number | null>(null);
    const [monthlySettlement, setMonthlySettlement] = useState<MonthlySettlementTypes | null>(defaultMonthlySettlement());
    const tourListRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleShowTourList = (id: number, monthValue: string) => {
        const month = formatShortDate(monthValue).slice(3);
        setMonthlySettlement({id, month});
        SaveToLocalStorage('toursSetId', id.toString());
        SaveToLocalStorage('toursSetMonth', month);
        tourListRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const changeYear = (value: number): void => {
        const newYear = year + value;
        setYear(newYear);
        SaveToLocalStorage('toursSetYear', newYear.toString());
    }

    useEffect(() => {
        (async () => {
            const result = await fetchDataOld(apiPaths.getRouteSettlements + '/' + year, 'GET');
            if ((result && result.responseData) && (!result.responseData.dtc)) {
                setData(result.responseData);
            } else {
                setAlert(tours[props.lang].apiError2, 'error');
            }
        })();
        // eslint-disable-next-line
    }, [props.refresh, year]);

    useEffect(() => {
        if (data) {
            const uniqueTourIds: number[] = Array.from(data.reduce((uniqueTourIds: Set<number>, settlement: TourMInterface) => {
                settlement.toursId.forEach(id => {
                    uniqueTourIds.add(id);
                });
                return uniqueTourIds;
            }, new Set<number>()));
            (async () => {
                const result = await fetchDataOld(apiPaths.getRouteNumbers, 'POST', {tourIds: uniqueTourIds});
                if ((result && result.responseData) && (!result.responseData.dtc)) {
                    setTourNrs(result.responseData);
                }
            })();
        }
        // eslint-disable-next-line
    }, [data]);

    const toursListComponent = React.useMemo(() => {
        if (monthlySettlement) {
            return (
                <ToursList
                    lang={props.lang}
                    refresh={props.refresh}
                    setRefresh={props.setRefresh}
                    monthlySettlement={{ id: monthlySettlement.id, month: monthlySettlement.month }}
                    setMonthlySettlement={setMonthlySettlement}
                    setSelectedTour={props.setSelectedTour}
                />
            );
        }
        // eslint-disable-next-line
    }, [monthlySettlement, props.lang, props.refresh, props.setRefresh]);

    if (loading) {
        return <CircularProgress/>
    }

    return (
        <>
            <main className="Table">
                <section className="Table__Header">
                    {tours[props.lang].settlementsHeader}<br/>
                    <button onClick={() => changeYear(-1)}>
                        <NavigateBeforeIcon/>
                    </button>
                    &nbsp;{year}&nbsp;
                    <button onClick={() => changeYear(+1)}>
                        <NavigateNextIcon/>
                    </button>
                </section>
                <section className="Table__Body">
                    <table>
                        <thead>
                        <tr>
                            <th>
                                {tours[props.lang].month}
                            </th>
                            <th>
                                {tours[props.lang].tours}
                            </th>
                            <th>
                                {tours[props.lang].driveTime}
                                <br/><br/>
                                {tours[props.lang].workTime}
                            </th>
                            <th>
                                {tours[props.lang].onDuty}
                                <br/><br/>
                                {tours[props.lang].offDuty}
                            </th>
                            <th>
                                <u>{tours[props.lang].burned}:</u>
                                <br/>
                                {tours[props.lang].boardComputer}
                                <br/><br/>
                                {tours[props.lang].real}
                            </th>
                            <th>
                                {tours[props.lang].refueled}
                                <br/><br/>
                                {tours[props.lang].fuelUsage}
                            </th>
                            <th>
                                {tours[props.lang].averageLoadWeight}
                                <br/>
                                ({tours[props.lang].numberOfLoads})
                            </th>
                            <th>
                                {tours[props.lang].distance}
                            </th>
                            <th>
                                <u>{tours[props.lang].salary}:</u>
                                <br/>
                                {tours[props.lang].predicted}
                                <br/><br/>
                                {tours[props.lang].real}
                            </th>
                            <th>
                                <u>{tours[props.lang].rate}:</u>
                                <br/>
                                {tours[props.lang].perKm} / {tours[props.lang].perHour}
                                <br/><br/>
                                {tours[props.lang].perDay}
                            </th>
                            <th>
                                {tours[props.lang].outgoings}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {data?.map((settlement) => {
                            return (
                                <React.Fragment key={settlement.id}>
                                    {expandedRow !== settlement.id && (
                                        <tr
                                            onClick={() => setExpandedRow(settlement.id)}
                                            className={settlement.id === monthlySettlement?.id ? 'highlighted' : ''}
                                        >
                                            <td>
                                                {formatShortDate(settlement.month).slice(3)}
                                            </td>
                                            <td>
                                                {settlement.toursId.map(id => {
                                                    const find = tourNrs.find(tour => tour.tourId === id);
                                                    if (find) {
                                                        return find.tourNr.toString();
                                                    }
                                                    return '';
                                                }).join(' ')}
                                            </td>
                                            <td>
                                                {formatTimeToTime(settlement.driveTime)}
                                                <br/><br/>
                                                {formatTimeToTime(settlement.workTime)}
                                            </td>
                                            <td>
                                                {settlement.daysOnDuty}
                                                <br/><br/>
                                                {settlement.daysOffDuty}
                                            </td>
                                            <td>
                                                {formatFuelQuantity(settlement.burnedFuelComp, 'integer')}
                                                <br/><br/>
                                                {formatFuelQuantity(settlement.burnedFuelReal, 'integer')}
                                            </td>
                                            <td>
                                                {formatFuelQuantity(settlement.totalRefuel, 'twoDecimals')}
                                                <br/><br/>
                                                {formatFuelCombustion(Number(settlement.burnedFuelReal), settlement.distance)}
                                            </td>
                                            <td>
                                                {formatWeight(settlement.avgWeight)}
                                                <br/>
                                                ({settlement.numberOfLoads})
                                            </td>
                                            <td>
                                                {formatOdometer(settlement.distance)}
                                            </td>
                                            <td>
                                                {formatAmount(Number(settlement.expectedSalary), settlement.currency)}
                                                <br/><br/>
                                                {formatAmount(Number(settlement.salary), settlement.currency)}
                                            </td>
                                            <td>
                                                {settlement.salary > 0
                                                    ? formatAmount(Number(settlement.salary) / Number(settlement.distance), settlement.currency)
                                                    : tours[props.lang].na
                                                } / {settlement.salary > 0
                                                ? formatAmount(Number(settlement.salary) / (Number(settlement.workTime.split(":")[0]) + (Number(settlement.workTime.split(":")[1]) / 60)), settlement.currency)
                                                : tours[props.lang].na
                                            }
                                                <br/><br/>
                                                {settlement.salary > 0
                                                    ? formatAmount(Number(settlement.salary) / (Number(settlement.daysOnDuty) + Number(settlement.daysOffDuty)), settlement.currency)
                                                    : tours[props.lang].na
                                                }
                                            </td>
                                            <td>
                                                {formatAmount(Number(settlement.outgoings), settlement.currency)}
                                            </td>
                                        </tr>
                                    )}
                                    {expandedRow === settlement.id && (
                                        <>
                                            <tr
                                                onClick={() => setExpandedRow(null)}
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}
                                                className={isHovered || settlement.id === monthlySettlement?.id ? 'highlighted' : ''}
                                            >
                                                <td>
                                                    {formatShortDate(settlement.month).slice(3)}
                                                </td>
                                                <td>
                                                    {settlement.toursId.map(id => {
                                                        const find = tourNrs.find(tour => tour.tourId === id);
                                                        if (find) {
                                                            return find.tourNr.toString();
                                                        }
                                                        return '';
                                                    }).join(' ')}
                                                </td>
                                                <td>
                                                    {formatTimeToTime(settlement.driveTime)}
                                                    <br/><br/>
                                                    {formatTimeToTime(settlement.workTime)}
                                                </td>
                                                <td>
                                                    {settlement.daysOnDuty}
                                                    <br/><br/>
                                                    {settlement.daysOffDuty}
                                                </td>
                                                <td>
                                                    {formatFuelQuantity(settlement.burnedFuelComp, 'integer')}
                                                    <br/><br/>
                                                    {formatFuelQuantity(settlement.burnedFuelReal, 'integer')}
                                                </td>
                                                <td>
                                                    {formatFuelQuantity(settlement.totalRefuel, 'twoDecimals')}
                                                    <br/><br/>
                                                    {formatFuelCombustion(Number(settlement.burnedFuelReal), settlement.distance)}
                                                </td>
                                                <td>
                                                    {formatWeight(settlement.avgWeight)}
                                                    <br/>
                                                    ({settlement.numberOfLoads})
                                                </td>
                                                <td>
                                                    {formatOdometer(settlement.distance)}
                                                </td>
                                                <td>
                                                    {formatAmount(Number(settlement.expectedSalary), settlement.currency)}
                                                    <br/><br/>
                                                    {formatAmount(Number(settlement.salary), settlement.currency)}
                                                </td>
                                                <td>
                                                    {settlement.salary > 0
                                                        ? formatAmount(Number(settlement.salary) / Number(settlement.distance), settlement.currency)
                                                        : tours[props.lang].na
                                                    } / {settlement.salary > 0
                                                    ? formatAmount(Number(settlement.salary) / (Number(settlement.workTime.split(":")[0]) + (Number(settlement.workTime.split(":")[1]) / 60)), settlement.currency)
                                                    : tours[props.lang].na
                                                }
                                                    <br/><br/>
                                                    {settlement.salary > 0
                                                        ? formatAmount(Number(settlement.salary) / (Number(settlement.daysOnDuty) + Number(settlement.daysOffDuty)), settlement.currency)
                                                        : tours[props.lang].na
                                                    }
                                                </td>
                                                <td>
                                                    {formatAmount(Number(settlement.outgoings), settlement.currency)}
                                                </td>
                                            </tr>
                                            <tr></tr>
                                            <tr
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}
                                                className={isHovered || settlement.id === monthlySettlement?.id ? 'highlighted' : ''}
                                            >
                                                <td colSpan={11} className="extended">
                                                    <Fab variant="extended" size="small" color="primary" onClick={() => handleShowTourList(settlement.id, settlement.month)}>
                                                        <FormatListNumberedIcon sx={{mr: 1}}/>
                                                        {tours[props.lang].viewRouteList}
                                                    </Fab>
                                                </td>
                                            </tr>
                                        </>
                                    )}
                                </React.Fragment>
                            );
                        })}
                        </tbody>
                    </table>
                </section>
            </main>
            <br/>
            <div ref={tourListRef}>{toursListComponent}</div>
        </>
    );
}