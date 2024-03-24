import {dayCardStateEnum, DayInterface, TourNumbersInterface, userLangEnum} from "types";
import {useAlert} from "../../hooks/useAlert";
import {useApi} from "../../hooks/useApi";
import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {apiPaths} from "../../config/api";
import {DAYS_PER_PAGE} from "../../config/set";
import {CircularProgress, Fab, Tooltip} from "@mui/material";
import {days} from "../../assets/txt/days";
import {formatDate} from "../../utils/formats/formatDate";
import {formatOdometer} from "../../utils/formats/formatOdometer";
import DetailsIcon from "@mui/icons-material/Details";
import {TablePagination} from "../common/TablePagination";
import {formatTimeToTime} from "../../utils/formats/formatTimeToTime";
import {formatFuelQuantity} from "../../utils/formats/formatFuelQuantity";
import {formatFuelCombustion} from "../../utils/formats/formatFuelCombustion";
import {formatSimplePlace} from "../../utils/formats/formatSimplePlace";
import {tours} from "../../assets/txt/tours";
import {NavLink} from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import {DaysEdit} from "./DaysEdit";

interface Props {
    lang: userLangEnum;
    tourId?: number;
    setShowDayList?: Dispatch<SetStateAction<boolean>>;
}

export const DaysList = (props: Props) => {

    const {setAlert} = useAlert();
    const {loading, fetchDataOld} = useApi();
    const [data, setData] = useState<DayInterface[] | null>(null);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [expandedRow, setExpandedRow] = useState<number | null>(null);
    const [tourNrs, setTourNrs] = useState<TourNumbersInterface[] | null>(null);
    const prevTourId = useRef<number>(0);
    const [isHovered, setIsHovered] = useState(false);
    const [editDayData, setEditDayData] = useState<DayInterface | null>(null);
    const [refresh, setRefresh] = useState<boolean>(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleClose = () => {
        props.setShowDayList && props.setShowDayList(false);
    }

    useEffect(() => {
        if (props.tourId) {
            (async () => {
                const result = await fetchDataOld(apiPaths.getDaysByTourId + '/' + props.tourId, 'GET');
                if ((result && result.responseData) && (!result.responseData.dtc)) {
                    setData(result.responseData);
                    setTotalItems(0);
                } else {
                    setAlert(days[props.lang].apiError, 'error');
                }
            })();
        } else {
            (async () => {
                const result = await fetchDataOld(apiPaths.getDays + '/' + page + '/' + DAYS_PER_PAGE, 'GET');
                if ((result && result.responseData) && (!result.responseData.dtc)) {
                    setData(result.responseData.items);
                    setTotalItems(Number(result.responseData.totalItems));
                } else {
                    setAlert(days[props.lang].apiError, 'error');
                }
            })();
        }
        // eslint-disable-next-line
    }, [page, refresh]);

    useEffect(() => {
        if (data) {
            const uniqueTourIds: number[] = data.reduce((uniqueTourIds: number[], day: DayInterface) => {
                if (!uniqueTourIds.includes(day.tourId)) {
                    uniqueTourIds.push(day.tourId);
                }
                return uniqueTourIds;
            }, []);
            (async () => {
                const result = await fetchDataOld(apiPaths.getRouteNumbers, 'POST', {tourIds: uniqueTourIds});
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
                    {props.tourId
                        ?
                        <>
                            {days[props.lang].tableHeader}
                            &nbsp;&nbsp;
                            <Tooltip title={tours[props.lang].close} arrow>
                                <NavLink to='' className='CloseLink' onClick={() => handleClose()}>
                                    <ClearIcon sx={{mr: 1}}/>
                                </NavLink>
                            </Tooltip>
                        </>
                        :days[props.lang].tableHeader
                    }
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
                        {editDayData && <DaysEdit
                            day={editDayData}
                            setDay={setEditDayData}
                            lang={props.lang}
                            setRefresh={setRefresh}
                        />}
                        {
                            data?.map((day, index) => {
                                const tourNr = Array.isArray(tourNrs) ? (tourNrs.find(tour => tour.tourId === day.tourId)?.tourNr ?? '') : '';
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
                                                    1 ⊙ {formatTimeToTime(day.driveTime)}
                                                    <br/>
                                                    2
                                                    ⊙ {day.doubleCrew ? formatTimeToTime(day.driveTime2) : days[props.lang].na}
                                                </td>
                                                <td>
                                                    💼 {formatTimeToTime(day.workTime)}
                                                    <br/>
                                                    {day.cardState === dayCardStateEnum.notUsed ?
                                                        days[props.lang].na
                                                        :
                                                        <>⏸ {formatTimeToTime(day.breakTime)}</>
                                                    }
                                                </td>
                                                <td>
                                                    {formatFuelCombustion(day.fuelBurned, day.distance)}
                                                    <br/>
                                                    {formatFuelQuantity(day.fuelBurned, 'oneDecimal')}
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
                                                        1 ⊙ {formatTimeToTime(day.driveTime)}
                                                        <br/>
                                                        2
                                                        ⊙ {day.doubleCrew ? formatTimeToTime(day.driveTime2) : days[props.lang].na}
                                                    </td>
                                                    <td>
                                                        💼 {formatTimeToTime(day.workTime)}
                                                        <br/>
                                                        {day.cardState === dayCardStateEnum.notUsed ?
                                                            days[props.lang].na
                                                            :
                                                            <>⏸ {formatTimeToTime(day.breakTime)}</>
                                                        }
                                                    </td>
                                                    <td>
                                                        {formatFuelCombustion(day.fuelBurned, day.distance)}
                                                        <br/>
                                                        {formatFuelQuantity(day.fuelBurned, 'oneDecimal')}
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
                                                        <br/>
                                                            <div>
                                                                <Fab
                                                                    variant="extended"
                                                                    size="small"
                                                                    color="primary"
                                                                    onClick={() => setEditDayData(day)}
                                                                >
                                                                    <EditIcon sx={{mr: 1}}/>
                                                                    {days[props.lang].edit}
                                                                </Fab>
                                                            </div>
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
            {!props.tourId && <TablePagination totalItems={totalItems} page={page} rowsPerPage={DAYS_PER_PAGE} setPage={setPage}/>}
        </>
    );
}