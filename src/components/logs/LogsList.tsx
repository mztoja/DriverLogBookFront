import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {DayInterface, LogInterface, LogListResponse, logTypeEnum, TourNumbersInterface, userLangEnum} from "types";
import {useAlert} from "../../hooks/useAlert";
import {useApi} from "../../hooks/useApi";
import {apiPaths} from "../../config/api";
import {FETCH_SEARCH_TIME, LOGS_PER_PAGE} from "../../config/set";
import {logs} from "../../assets/txt/logs";
import {CircularProgress, Fab, Tooltip} from "@mui/material";
import {SearchInput} from "../common/form/SearchInput";
import {TablePagination} from "../common/TablePagination";
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

interface Props {
    lang: userLangEnum;
    tourId?: number;
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
    const [refresh, setRefresh] = useState<boolean>(false);

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
                default:
                    setEditLogData(log);
                    break;
            }
        }
    }

    useEffect(() => {
        if (fetchDelay > 0) {
            const delayTimeout = setTimeout(() => {
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
            // (async () => {
            //     const result = await fetchDataOld(apiPaths.getLogsByTourId + '/' + props.tourId, 'GET');
            //     if ((result && result.responseData) && (!result.responseData.dtc)) {
            //         setData(result.responseData);
            //         setTotalItems(0);
            //     } else {
            //         setAlert(logs[props.lang].apiError, 'error');
            //     }
            // })();
            fetchData<LogInterface[]>(`${apiPaths.getLogsByTourId}/${props.tourId}`).then((res) =>{
               if (res.responseData) {
                   setData(res.responseData);
                   setTotalItems(0);
               } else {
                   setAlert(logs[props.lang].apiError, 'error');
               }
            });
        } else {
            // (async () => {
            //     const search = filterSearch === '' ? '' : '/' + filterSearch;
            //     const result = await fetchDataOld(apiPaths.getLogs + '/' + page + '/' + LOGS_PER_PAGE + search, 'GET');
            //     if ((result && result.responseData) && (!result.responseData.dtc)) {
            //         setData(result.responseData.items);
            //         setTotalItems(Number(result.responseData.totalItems));
            //     } else {
            //         setAlert(logs[props.lang].apiError, 'error');
            //     }
            // })();
            const search = filterSearch === '' ? '' : '/' + filterSearch;
            fetchData<LogListResponse>(`${apiPaths.getLogs}/${page}/${LOGS_PER_PAGE+search}`).then((res) =>{
                if (res.responseData) {
                    setData(res.responseData.items);
                    setTotalItems(Number(res.responseData.totalItems));
                } else {
                    setAlert(logs[props.lang].apiError, 'error');
                }
            });
            setFetchDelay(1);
        }
        // eslint-disable-next-line
    }, [page, fetchDelay, props.tourId, refresh]);

    useEffect(() => {
        if (data) {
            const uniqueTourIds: number[] = data.reduce((uniqueTourIds: number[], log: LogInterface) => {
                if (!uniqueTourIds.includes(log.tourId)) {
                    uniqueTourIds.push(log.tourId);
                }
                return uniqueTourIds;
            }, []);
            // (async () => {
            //     const result = await fetchDataOld(apiPaths.getRouteNumbers, 'POST', {tourIds: uniqueTourIds});
            //     if ((result && result.responseData) && (!result.responseData.dtc)) {
            //         setTourNrs(result.responseData);
            //     }
            // })();
            fetchData<TourNumbersInterface[]>(apiPaths.getRouteNumbers, {method: 'POST',sendData: {tourIds: uniqueTourIds}}).then((res) => {
                if (res.responseData) {
                    setTourNrs(res.responseData);
                }
            });
        }
        // eslint-disable-next-line
    }, [data]);

    if (loading) {
        return <CircularProgress/>
    }

    return (
        <>
            {!props.tourId &&
                <div className="Table__Filter">
                    <div className="DivInline">
                        <SearchInput lang={props.lang} value={filterSearch}
                                     onChange={e => setFilterSearch(e)}/>
                    </div>
                </div>
            }
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
                        : logs[props.lang].tableHeader
                    }
                </section>
                <section className="Table__Body">
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
                        {data?.map((log, index) => {
                            const tourNr = tourNrs?.find(tour => tour.tourId === log.tourId)?.tourNr ?? '';
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
                                                            {log.notes}
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
                </section>
            </main>
            {!props.tourId &&
                <TablePagination totalItems={totalItems} page={page} rowsPerPage={LOGS_PER_PAGE} setPage={setPage}/>}
        </>
    );
}