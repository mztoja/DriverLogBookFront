import {dayCardStateEnum, DayInterface, TourNumbersInterface, userLangEnum, DayListResponse} from "types";
import {useAlert} from "../../hooks/useAlert";
import {useApi} from "../../hooks/useApi";
import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {apiPaths} from "../../config/api";
import {DAYS_PER_PAGE} from "../../config/set";
import {CircularProgress, Tooltip} from "@mui/material";
import {ActionButton} from "../common/ActionButton";
import {days} from "../../assets/txt/days";
import {formatDate} from "../../utils/formats/formatDate";
import {formatOdometer} from "../../utils/formats/formatOdometer";
import DetailsIcon from "@mui/icons-material/Details";
import {formatTimeToTime} from "../../utils/formats/formatTimeToTime";
import {formatFuelQuantity} from "../../utils/formats/formatFuelQuantity";
import {formatFuelCombustion} from "../../utils/formats/formatFuelCombustion";
import {formatSimplePlace} from "../../utils/formats/formatSimplePlace";
import {tours} from "../../assets/txt/tours";
import {NavLink} from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import {DaysEdit} from "./DaysEdit";
import { formatText } from "../../utils/formats/formatText";

interface Props {
    lang: userLangEnum;
    tourId?: number;
    setShowDayList?: Dispatch<SetStateAction<boolean>>;
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
    const [editDayData, setEditDayData] = useState<DayInterface | null>(null);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const loadingMoreRef = useRef<boolean>(false);

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
            fetchData<DayInterface[]>(`${apiPaths.getDaysByTourId}/${props.tourId}`).then((res) => {
                if (res.responseData) {
                    setData(res.responseData);
                    setTotalItems(0);
                } else {
                    setAlert(days[props.lang].apiError, 'error');
                }
            });
        } else {
            const reqPage = page;
            if (reqPage > 1) setLoadingMore(true);
            fetchData<DayListResponse>(`${apiPaths.getDays}/${reqPage}/${DAYS_PER_PAGE}`).then((res) => {
                if (res.responseData) {
                    const items = res.responseData.items;
                    setData(prev => (reqPage === 1 || !prev) ? items : [...prev, ...items]);
                    setTotalItems(Number(res.responseData.totalItems));
                } else {
                    setAlert(days[props.lang].apiError, 'error');
                }
                setLoadingMore(false);
                loadingMoreRef.current = false;
            });
        }
        // eslint-disable-next-line
    }, [page, refresh]);

    // doładowywanie kolejnych porcji po dojechaniu do końca listy
    const handleBodyScroll = (e: React.UIEvent<HTMLElement>): void => {
        if (props.tourId || loadingMoreRef.current || !data) return;
        if (data.length >= totalItems) return;
        const el = e.currentTarget;
        if (el.scrollHeight - el.scrollTop - el.clientHeight < 200) {
            loadingMoreRef.current = true;
            setLoadingMore(true);
            setPage(p => p + 1);
        }
    };

    useEffect(() => {
        if (data) {
            const uniqueTourIds: number[] = data.reduce((uniqueTourIds: number[], day: DayInterface) => {
                if (!uniqueTourIds.includes(day.tourId)) {
                    uniqueTourIds.push(day.tourId);
                }
                return uniqueTourIds;
            }, []);
            fetchData<TourNumbersInterface[]>(apiPaths.getRouteNumbers, {method: 'POST', sendData: {tourIds: uniqueTourIds}}).then((res) => {
                if (res.responseData) {
                    setTourNrs(res.responseData);
                }
            });
        }
        // eslint-disable-next-line
    }, [data]);

    if (loading && !data) {
        return <CircularProgress/>
    }

    const tableContent = (
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
                <section className="Table__Body" onScroll={handleBodyScroll}>
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
                                                            {days[props.lang].start}: <div dangerouslySetInnerHTML={{ __html: formatText(day.startData.notes) }} /><br />
                                                            </>
                                                        }
                                                        {day.stopData?.notes &&
                                                            <>
                                                                <br/>
                                                                <DetailsIcon/><br/>
                                                            {days[props.lang].stop}: <div dangerouslySetInnerHTML={{ __html: formatText(day.stopData.notes) }} /><br />
                                                            </>
                                                        }
                                                        <br/>
                                                            <div>
                                                                <ActionButton
                                                                    icon={<EditIcon/>}
                                                                    onClick={() => setEditDayData(day)}
                                                                >
                                                                    {days[props.lang].edit}
                                                                </ActionButton>
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
                    {!props.tourId && loadingMore &&
                        <div className="TableView__more"><CircularProgress size={24}/></div>}
                    {!props.tourId && !loadingMore && data && totalItems > 0 && data.length >= totalItems &&
                        <div className="TableView__more TableView__more--end">— {totalItems} —</div>}
                </section>
            </main>
    );

    if (props.tourId) {
        return tableContent;
    }

    return (
        <div className="TableView">
            {tableContent}
        </div>
    );
}