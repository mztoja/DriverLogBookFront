import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {
    DayInterface,
    FinanceInterface,
    LoadInterface,
    LogInterface,
    LogListResponse,
    logTypeEnum,
    TourInterface,
    TourNumbersInterface,
    userLangEnum
} from "types";
import {useAlert} from "../../hooks/useAlert";
import {useApi} from "../../hooks/useApi";
import {apiPaths} from "../../config/api";
import {FETCH_SEARCH_TIME, LOGS_PER_PAGE} from "../../config/set";
import {logs} from "../../assets/txt/logs";
import {CircularProgress, Fab, Tooltip} from "@mui/material";
import {SearchInput} from "../common/form/SearchInput";
import {formatDate} from "../../utils/formats/formatDate";
import {formatCountry} from "../../utils/formats/formatCountry";
import {formatOdometer} from "../../utils/formats/formatOdometer";
import DetailsIcon from "@mui/icons-material/Details";
import {formatPlace} from "../../utils/formats/formatPlace";
import {formatSimplePlace} from "../../utils/formats/formatSimplePlace";
import {tours} from "../../assets/txt/tours";
import {NavLink} from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import {LogsEdit} from "./LogsEdit";
import {DaysEdit} from "../days/DaysEdit";
import {FinanceEdit} from "../finances/FinanceEdit";
import {LoadingEdit} from "../loadings/LoadingEdit";
import {TourEdit} from "../tours/TourEdit";
import { formatText } from "../../utils/formats/formatText";

interface Props {
    lang: userLangEnum;
    tourId?: number;
    placeId?: number;
    placeName?: string;
    setShowLogList?: Dispatch<SetStateAction<boolean>>;
}

export const LogsList = (props: Props) => {

    const {setAlert} = useAlert();
    const {loading, fetchData} = useApi();

    const [data, setData] = useState<LogInterface[] | null>(null);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [filterSearch, setFilterSearch] = useState<string>('');
    const [fetchDelay, setFetchDelay] = useState<number>(0);
    const [expandedRow, setExpandedRow] = useState<number | null>(null);
    const [tourNrs, setTourNrs] = useState<TourNumbersInterface[] | null>(null);
    const prevTourId = useRef<number>(0);
    const [isHovered, setIsHovered] = useState(false);
    const [editLogData, setEditLogData] = useState<LogInterface | null>(null);
    const [editDayData, setEditDayData] = useState<DayInterface | null>(null);
    const [editFinanceData, setEditFinanceData] = useState<FinanceInterface | null>(null);
    const [editLoadingData, setEditLoadingData] = useState<LoadInterface | null>(null);
    const [editTourData, setEditTourData] = useState<TourInterface | null>(null);
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
        props.setShowLogList && props.setShowLogList(false);
    }

    const handleEditButton = (log: LogInterface | null) => {
        if (!log) {
            setEditLogData(null);
        } else {
            switch (log.type) {
                case logTypeEnum.days:
                    fetchData<DayInterface>(`${apiPaths.getDayByLogId}/${log.id}`).then((res) => {
                        if (res.responseData) {
                            setEditDayData(res.responseData);
                        }
                    });
                    break;
                case logTypeEnum.refuelAdblue:
                case logTypeEnum.refuelDiesel:
                case logTypeEnum.generalExpense:
                    fetchData<FinanceInterface>(`${apiPaths.getFinanceByLogId}/${log.id}`).then((res) => {
                        if (res.responseData) {
                            setEditFinanceData(res.responseData);
                        }
                    });
                    break;
                case logTypeEnum.finishLoading:
                case logTypeEnum.finishUnloading:
                    fetchData<LoadInterface>(`${apiPaths.getLoadingByLogId}/${log.id}`).then((res) => {
                       if (res.responseData) {
                           setEditLoadingData(res.responseData);
                       }
                    });
                    break;
                case logTypeEnum.tours:
                    fetchData<TourInterface>(`${apiPaths.getRouteByLogId}/${log.id}`).then((res) => {
                        if (res.responseData) {
                            setEditTourData(res.responseData);
                        }
                    });
                    break;
                default:
                    setEditLogData(log);
                    break;
            }
        }
    }

    useEffect(() => {
        if (fetchDelay > 0) {
            const delayTimeout = setTimeout(() => {
                // zmiana filtra – wracamy na początek listy i ładujemy od nowa
                setPage(1);
                setData(null);
                setFetchDelay(fetchDelay + 1);
            }, FETCH_SEARCH_TIME);

            return () => {
                clearTimeout(delayTimeout);
            };
        }
        // eslint-disable-next-line
    }, [filterSearch]);

    useEffect(() => {
        if (props.tourId) {
            fetchData<LogInterface[]>(`${apiPaths.getLogsByTourId}/${props.tourId}`).then((res) => {
                if (res.responseData) {
                    setData(res.responseData);
                    setTotalItems(0);
                } else {
                    setAlert(logs[props.lang].apiError, 'error');
                }
            });
        } else {
            const search = filterSearch === '' ? '' : '/' + filterSearch;
            const reqPage = page;
            if (reqPage > 1) setLoadingMore(true);
            const base = props.placeId
                ? `${apiPaths.getLogsByPlaceId}/${props.placeId}`
                : apiPaths.getLogs;
            fetchData<LogListResponse>(`${base}/${reqPage}/${LOGS_PER_PAGE + search}`).then((res) => {
                if (res.responseData) {
                    const items = res.responseData.items;
                    setData(prev => (reqPage === 1 || !prev) ? items : [...prev, ...items]);
                    setTotalItems(Number(res.responseData.totalItems));
                } else {
                    setAlert(logs[props.lang].apiError, 'error');
                }
                setLoadingMore(false);
                loadingMoreRef.current = false;
            });
            setFetchDelay(1);
        }
        // eslint-disable-next-line
    }, [page, fetchDelay, props.tourId, refresh]);

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
            const uniqueTourIds: number[] = data.reduce((uniqueTourIds: number[], log: LogInterface) => {
                if (!uniqueTourIds.includes(log.tourId)) {
                    uniqueTourIds.push(log.tourId);
                }
                return uniqueTourIds;
            }, []);
            fetchData<TourNumbersInterface[]>(apiPaths.getRouteNumbers, {
                method: 'POST',
                sendData: {tourIds: uniqueTourIds}
            }).then((res) => {
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
                            {logs[props.lang].tableHeader}
                            &nbsp;&nbsp;
                            <Tooltip title={tours[props.lang].close} arrow>
                                <NavLink to='' className='CloseLink' onClick={() => handleClose()}>
                                    <ClearIcon sx={{mr: 1}}/>
                                </NavLink>
                            </Tooltip>
                        </>
                        :
                        <div className="Table__HeaderRow">
                            <span className="Table__Title">
                                {props.placeId
                                    ? <>
                                        {logs[props.lang].placeLogsHeader(props.placeName ?? '')}
                                        &nbsp;&nbsp;
                                        <Tooltip title={tours[props.lang].close} arrow>
                                            <NavLink to='/logs' className='CloseLink'>
                                                <ClearIcon sx={{mr: 1}}/>
                                            </NavLink>
                                        </Tooltip>
                                    </>
                                    : logs[props.lang].tableHeader}
                            </span>
                            <div className="Table__HeaderSearch">
                                <SearchInput lang={props.lang} value={filterSearch}
                                             onChange={e => setFilterSearch(e)}/>
                            </div>
                        </div>
                    }
                </section>
                <section className="Table__Body" onScroll={handleBodyScroll}>
                    <table>
                        <thead>
                        <tr>
                            <th>{logs[props.lang].thTourNr}</th>
                            <th>{logs[props.lang].thDate}</th>
                            <th>{logs[props.lang].thLog}</th>
                            <th>{logs[props.lang].thCountry}</th>
                            <th>{logs[props.lang].thPlace}</th>
                            <th>{logs[props.lang].thOdometer}</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {editLogData && <LogsEdit
                            lang={props.lang}
                            log={editLogData}
                            setLog={setEditLogData}
                            setRefresh={setRefresh}
                        />}
                        {editDayData && <DaysEdit
                            day={editDayData}
                            setDay={setEditDayData}
                            lang={props.lang}
                            setRefresh={setRefresh}
                        />}
                        {editFinanceData && <FinanceEdit
                            finance={editFinanceData}
                            setFinance={setEditFinanceData}
                            lang={props.lang}
                            setRefresh={setRefresh}
                        />}
                        {editLoadingData && <LoadingEdit
                            load={editLoadingData}
                            setLoad={setEditLoadingData}
                            lang={props.lang}
                            setRefresh={setRefresh}
                        />}
                        {editTourData && <TourEdit
                            tour={editTourData}
                            setTour={setEditTourData}
                            lang={props.lang}
                            setRefresh={setRefresh}
                        />}
                        {data?.map((log, index) => {
                            const tourNr = Array.isArray(tourNrs) ? (tourNrs.find(tour => tour.tourId === log.tourId)?.tourNr ?? '') : '';
                            const division = prevTourId.current !== log.tourId;
                            prevTourId.current = log.tourId;
                            return (
                                <React.Fragment key={log.id}>
                                    {division && index !== 0 &&
                                        <tr className='tableParting'>
                                            <td colSpan={7}></td>
                                        </tr>
                                    }
                                    {expandedRow !== log.id && (
                                        <tr onClick={() => setExpandedRow(log.id)}>
                                            <td>
                                                {/*<strong>{(page - 1) * LOGS_PER_PAGE + index + 1}</strong>*/}
                                                {tourNr}
                                            </td>
                                            <td>{formatDate(log.date, props.lang)}</td>
                                            <td>{log.action}</td>
                                            <td>{formatCountry(log.country, props.lang)}</td>
                                            <td>{formatSimplePlace(log.place, log.placeData)}</td>
                                            <td>{formatOdometer(log.odometer)}</td>
                                            <td>{log.notes !== null && <DetailsIcon/>}</td>
                                        </tr>
                                    )}
                                    {expandedRow === log.id && (
                                        <>
                                            <tr
                                                onClick={() => setExpandedRow(null)}
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}
                                                className={isHovered ? 'highlighted' : ''}
                                            >
                                                <td>
                                                    {/*<strong>{(page - 1) * LOGS_PER_PAGE + index + 1}</strong>*/}
                                                    {tourNr}
                                                </td>
                                                <td>{formatDate(log.date, props.lang)}</td>
                                                <td>{log.action}</td>
                                                <td>{formatCountry(log.country, props.lang)}</td>
                                                <td>{formatPlace(log.place, log.placeData, props.lang)}</td>
                                                <td>{formatOdometer(log.odometer)}</td>
                                                <td></td>
                                            </tr>
                                            <tr></tr>
                                            <tr
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}
                                                className={isHovered ? 'highlighted' : ''}
                                            >
                                                <td colSpan={7} className="extended">
                                                    {log.notes !== null && (
                                                        <div>
                                                            <br/><DetailsIcon/><br/>
                                                            <div dangerouslySetInnerHTML={{ __html: formatText(log.notes) }} />
                                                        </div>)}
                                                    <br/>
                                                    <div>
                                                        <Fab
                                                            variant="extended"
                                                            size="small"
                                                            color="primary"
                                                            onClick={() => handleEditButton(log)}
                                                        >
                                                            <EditIcon sx={{mr: 1}}/>
                                                            {logs[props.lang].edit}
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