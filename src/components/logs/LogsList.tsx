import React, {useEffect, useState} from "react";
import {LogInterface, userLangEnum} from "types";
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
            const result = await fetchData(apiPaths.getLogs + '/' + page + '/' + LOGS_PER_PAGE + search, {
                headers: {Accept: 'application/json'},
                credentials: "include",
            });
            if ((result && result.data) && (!result.data.dtc)) {
                setData(result.data.items);
                setTotalItems(Number(result.data.totalItems));
            } else {
                setAlert(logs[props.lang].apiError, 'error');
            }
        })();
        setFetchDelay(1);
        // eslint-disable-next-line
    }, [page, fetchDelay]);

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
                            <th>{logs[props.lang].thLp}</th>
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
                            return (
                                <React.Fragment key={log.id}>
                                    {expandedRow !== log.id && (
                                        <tr onClick={() => setExpandedRow(log.id)}>
                                            <td>{(page - 1) * LOGS_PER_PAGE + index + 1}</td>
                                            <td>{formatDate(log.date, props.lang)}</td>
                                            <td>{log.action}</td>
                                            <td>{formatCountry(log.country, props.lang)}</td>
                                            <td>{formatPlace(log.place, log.placeData)}</td>
                                            <td>{formatOdometer(log.odometer)}</td>
                                            <td>{log.notes !== null && <DetailsIcon/>}</td>
                                        </tr>
                                    )}
                                    {expandedRow === log.id && (
                                        <tr onClick={() => setExpandedRow(null)}>
                                            <td colSpan={7} className="extended">
                                                <div>{formatDate(log.date, props.lang)}</div>
                                                <div>{log.action}</div>
                                                {log.placeId === 0 && (<div>{log.place}</div>)}
                                                {log.placeId !== 0 && (
                                                    <>
                                                        <div>{log.placeData?.name}</div>
                                                        <div>{log.placeData?.street}</div>
                                                        <div>{log.placeData?.code} - {log.placeData?.city} ({formatCountry(log.country, props.lang)})</div>
                                                    </>
                                                )}
                                                {log.notes !== null && (
                                                    <div>
                                                        <br/><DetailsIcon/><br/>
                                                        {log.notes}
                                                    </div>)}
                                            </td>
                                        </tr>
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