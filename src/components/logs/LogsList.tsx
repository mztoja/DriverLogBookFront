import React, {useEffect, useRef, useState} from "react";
import {LogInterface, TourNumbersInterface, userLangEnum} from "types";
import {useAlert} from "../../hooks/useAlert";
import {useApi} from "../../hooks/useApi";
import {apiPaths} from "../../config/api";
import {FETCH_SEARCH_TIME, LOGS_PER_PAGE} from "../../config/set";
import {logs} from "../../assets/txt/logs";
import {CircularProgress} from "@mui/material";
import {SearchInput} from "../common/form/SearchInput";
import {TablePagination} from "../common/TablePagination";
import {formatDate} from "../../utils/formatDate";
import {formatCountry} from "../../utils/formatCountry";
import {formatOdometer} from "../../utils/formatOdometer";
import DetailsIcon from "@mui/icons-material/Details";
import {formatPlace} from "../../utils/formatPlace";
import {formatSimplePlace} from "../../utils/formatSimplePlace";

interface Props {
    lang: userLangEnum;
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

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

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
        (async () => {
            const search = filterSearch === '' ? '' : '/' + filterSearch;
            const result = await fetchData(apiPaths.getLogs + '/' + page + '/' + LOGS_PER_PAGE + search, 'GET');
            if ((result && result.responseData) && (!result.responseData.dtc)) {
                setData(result.responseData.items);
                setTotalItems(Number(result.responseData.totalItems));
            } else {
                setAlert(logs[props.lang].apiError, 'error');
            }
        })();
        setFetchDelay(1);
        // eslint-disable-next-line
    }, [page, fetchDelay]);

    useEffect(() => {
        if (data) {
            const uniqueTourIds: number[] = data.reduce((uniqueTourIds: number[], log: LogInterface) => {
                if (!uniqueTourIds.includes(log.tourId)) {
                    uniqueTourIds.push(log.tourId);
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
                    {logs[props.lang].tableHeader}
                </section>
                <section className="Table__Filter">
                    <div className="DivInline">
                        <SearchInput lang={props.lang} value={filterSearch}
                                     onChange={e => setFilterSearch(e.target.value)}/>
                    </div>
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
                                                <td>{formatPlace(log.place, log.placeData,props.lang)}</td>
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
            <TablePagination totalItems={totalItems} page={page} rowsPerPage={LOGS_PER_PAGE} setPage={setPage}/>
        </>
    );
}