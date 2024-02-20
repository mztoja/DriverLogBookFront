import {dayCardStateEnum, DayInterface, TourNumbersInterface, userLangEnum} from "types";
import {useAlert} from "../../hooks/useAlert";
import {useApi} from "../../hooks/useApi";
import React, {useEffect, useRef, useState} from "react";
import {apiPaths} from "../../config/api";
import {DAYS_PER_PAGE} from "../../config/set";
import {CircularProgress} from "@mui/material";
import {days} from "../../assets/txt/days";
import {formatDate} from "../../utils/formatDate";
import {formatOdometer} from "../../utils/formatOdometer";
import DetailsIcon from "@mui/icons-material/Details";
import {TablePagination} from "../common/TablePagination";
import {formatTime} from "../../utils/formatTime";
import {formatFuelQuantity} from "../../utils/formatFuelQuantity";
import {formatFuelCombustion} from "../../utils/formatFuelCombustion";
import {formatSimplePlace} from "../../utils/formatSimplePlace";

interface Props {
    lang: userLangEnum;
}

export const DaysList = (props: Props) => {

    const {setAlert} = useAlert();
    const {loading, fetchData} = useApi();

    const [data, setData] = useState<DayInterface[] | null>(null);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [expandedRow, setExpandedRow] = useState<number | null>(null);
    const [tourNrs, setTourNrs] = useState<TourNumbersInterface[] | null>(null);
    const prevTourId = useRef<number>(0);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    useEffect(() => {
        (async () => {
            const result = await fetchData(apiPaths.getDays + '/' + page + '/' + DAYS_PER_PAGE, 'GET');
            if ((result && result.responseData) && (!result.responseData.dtc)) {
                setData(result.responseData.items);
                setTotalItems(Number(result.responseData.totalItems));
            } else {
                setAlert(days[props.lang].apiError, 'error');
            }
        })();
        // eslint-disable-next-line
    }, [page]);

    useEffect(() => {
        if (data) {
            const uniqueTourIds: number[] = data.reduce((uniqueTourIds: number[], day: DayInterface) => {
                if (!uniqueTourIds.includes(day.tourId)) {
                    uniqueTourIds.push(day.tourId);
                }
                return uniqueTourIds;
            }, []);
            (async () => {
                const result = await fetchData(apiPaths.getRouteNumbers, 'POST', {tourIds: uniqueTourIds});
                if ((result && result.responseData) && (!result.responseData.dtc)) {
                    setTourNrs(result.responseData);
                }
            })();
        }
        // eslint-disable-next-line
    }, [data]);

    if (loading) {
        return <CircularProgress/>
    }

    return (
        <>
            <main className="Table">
                <section className="Table__Header">
                    {days[props.lang].tableHeader}
                </section>
                <section className="Table__Body">
                    <table>
                        <thead>
                        <tr>
                            <th>{days[props.lang].tnr}</th>
                            <th>{days[props.lang].start}<br/>{days[props.lang].stop}</th>
                            <th>{days[props.lang].odometer}</th>
                            <th>{days[props.lang].driveTime}</th>
                            <th>{days[props.lang].workTime}<br/>{days[props.lang].breakTime}</th>
                            <th>{days[props.lang].fuel}</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data?.map((day, index) => {
                                const tourNr = tourNrs?.find(tour => tour.tourId === day.tourId)?.tourNr;
                                const division = prevTourId.current !== day.tourId;
                                prevTourId.current = day.tourId;
                                return (
                                    <React.Fragment key={day.id}>
                                        {division && index !== 0 &&
                                            <tr className='tableParting'>
                                                <td colSpan={8}></td>
                                            </tr>
                                        }
                                        {expandedRow !== day.id && (
                                            <tr onClick={() => setExpandedRow(day.id)}>
                                                <td>
                                                    {/*<strong>{(page - 1) * LOGS_PER_PAGE + index + 1}</strong>*/}
                                                    {/*<br/>*/}
                                                    {tourNr ? tourNr : ''}
                                                </td>
                                                <td>
                                                    {day.startData && formatDate(day.startData.date, props.lang)}
                                                    <br/>
                                                    {day.stopData ? formatDate(day.stopData.date, props.lang) : days[props.lang].na}
                                                </td>
                                                <td>
                                                    ↦ {day.startData && formatOdometer(day.startData.odometer)}
                                                    <br/>
                                                    ⇥ {day.stopData ? formatOdometer(day.stopData.odometer) : days[props.lang].na}
                                                </td>
                                                <td>
                                                    1 ⊙ {formatTime(day.driveTime)}
                                                    <br/>
                                                    2
                                                    ⊙ {day.doubleCrew ? formatTime(day.driveTime2) : days[props.lang].na}
                                                </td>
                                                <td>
                                                    💼 {formatTime(day.workTime)}
                                                    <br/>
                                                    {day.cardState === dayCardStateEnum.notUsed ?
                                                        days[props.lang].na
                                                        :
                                                        <>⏸ {formatTime(day.breakTime)}</>
                                                    }
                                                </td>
                                                <td>
                                                    {formatFuelCombustion(day.fuelBurned, day.distance)}
                                                    <br/>
                                                    {formatFuelQuantity(day.fuelBurned)}
                                                </td>
                                                <td>
                                                    {formatOdometer(day.distance)}
                                                </td>
                                                <td>{(day.startData?.notes || day.stopData?.notes) &&
                                                    <DetailsIcon/>}</td>
                                            </tr>
                                        )}
                                        {expandedRow === day.id && (
                                            <>
                                                <tr
                                                    onClick={() => setExpandedRow(null)}
                                                    onMouseEnter={handleMouseEnter}
                                                    onMouseLeave={handleMouseLeave}
                                                    className={isHovered ? 'highlighted' : ''}
                                                >
                                                    <td>
                                                        {/*<strong>{(page - 1) * LOGS_PER_PAGE + index + 1}</strong>*/}
                                                        {/*<br/>*/}
                                                        {tourNr ? tourNr : ''}
                                                    </td>
                                                    <td>
                                                        {day.startData &&
                                                            <>
                                                                {formatDate(day.startData.date, props.lang)}
                                                                <br/>
                                                                {formatSimplePlace(day.startData.place, day.startData.placeData)} {day.startData.country}
                                                            </>
                                                        }
                                                        <br/>
                                                        {day.stopData ?
                                                            <>
                                                                {formatDate(day.stopData.date, props.lang)}
                                                                <br/>
                                                                {formatSimplePlace(day.stopData.place, day.stopData.placeData)} {day.stopData.country}
                                                            </> : days[props.lang].na}
                                                    </td>
                                                    <td>
                                                        ↦ {day.startData && formatOdometer(day.startData.odometer)}
                                                        <br/>
                                                        ⇥ {day.stopData ? formatOdometer(day.stopData.odometer) : days[props.lang].na}
                                                    </td>
                                                    <td>
                                                        1 ⊙ {formatTime(day.driveTime)}
                                                        <br/>
                                                        2
                                                        ⊙ {day.doubleCrew ? formatTime(day.driveTime2) : days[props.lang].na}
                                                    </td>
                                                    <td>
                                                        💼 {formatTime(day.workTime)}
                                                        <br/>
                                                        {day.cardState === dayCardStateEnum.notUsed ?
                                                            days[props.lang].na
                                                            :
                                                            <>⏸ {formatTime(day.breakTime)}</>
                                                        }
                                                    </td>
                                                    <td>
                                                        {formatFuelCombustion(day.fuelBurned, day.distance)}
                                                        <br/>
                                                        {formatFuelQuantity(day.fuelBurned)}
                                                    </td>
                                                    <td>
                                                        {formatOdometer(day.distance)}
                                                    </td>
                                                    <td></td>
                                                </tr>
                                                <tr></tr>
                                                <tr
                                                    onMouseEnter={handleMouseEnter}
                                                    onMouseLeave={handleMouseLeave}
                                                    className={isHovered ? 'highlighted' : ''}
                                                >
                                                    <td colSpan={8} className="extended">
                                                        {day.startData?.notes &&
                                                            <>
                                                                <br/>
                                                                <DetailsIcon/><br/>
                                                                {days[props.lang].start}: {day.startData.notes}<br/>
                                                            </>
                                                        }
                                                        {day.stopData?.notes &&
                                                            <>
                                                                <br/>
                                                                <DetailsIcon/><br/>
                                                                {days[props.lang].stop}: {day.stopData.notes}<br/>
                                                            </>
                                                        }
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
            <TablePagination totalItems={totalItems} page={page} rowsPerPage={DAYS_PER_PAGE} setPage={setPage}/>
        </>
    );
}