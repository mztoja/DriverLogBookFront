import {dayCardStateEnum, DayInterface, dayStatusEnum, userLangEnum} from "types";
import {useAlert} from "../../hooks/useAlert";
import {useApi} from "../../hooks/useApi";
import React, {useEffect, useState} from "react";
import {apiPaths} from "../../config/api";
import {DAYS_PER_PAGE, LOGS_PER_PAGE} from "../../config/set";
import {CircularProgress} from "@mui/material";
import {days} from "../../assets/txt/days";
import {formatDate} from "../../utils/formatDate";
import {formatOdometer} from "../../utils/formatOdometer";
import DetailsIcon from "@mui/icons-material/Details";
import {TablePagination} from "../common/TablePagination";
import {formatTime} from "../../utils/formatTime";
import {formatFuelQuantity} from "../../utils/formatFuelQuantity";
import {formatFuelCombustion} from "../../utils/formatFuelCombustion";

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
                            <th>{days[props.lang].lp}<br/>{days[props.lang].tnr}</th>
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
                        {data?.map((day, index) => {
                            return (
                                <React.Fragment key={day.id}>
                                    {expandedRow !== day.id && (
                                        <tr onClick={() => setExpandedRow(day.id)}>
                                            <td>
                                                {(page - 1) * LOGS_PER_PAGE + index + 1}
                                                <br/>
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
                                                2 ⊙ {formatTime(day.driveTime2)}
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
                                            <td>{(day.startData?.notes || day.stopData?.notes) && <DetailsIcon/>}</td>
                                        </tr>
                                    )}
                                    {expandedRow === day.id && (
                                        <tr onClick={() => setExpandedRow(null)}>
                                            <td colSpan={8} className="extended">

                                                {day.status === dayStatusEnum.started &&
                                                    <>
                                                        <strong>{days[props.lang].curDay}</strong>
                                                        <br/><br/>
                                                    </>
                                                }
                                                <strong>{days[props.lang].start}</strong><br/>
                                                ↦ {day.startData && formatOdometer(day.startData.odometer)}<br/>
                                                {day.startData && formatDate(day.startData.date, props.lang)}<br/>
                                                {day.startData?.placeData ?
                                                    (<>{day.startData.placeData.name} - {day.startData.placeData.street}, {day.startData.placeData.country} {day.startData.placeData.code} {day.startData.placeData.city}<br/> </>)
                                                    :
                                                    (<>{day.startData && day.startData.place}<br/></>)
                                                }
                                                {day.startData?.notes &&
                                                    <>
                                                        <DetailsIcon/><br/>
                                                        {day.startData.notes}<br/>
                                                    </>
                                                }
                                                <br/><br/>

                                                {day.status === dayStatusEnum.finished &&
                                                    <>
                                                        <strong>{days[props.lang].stop}</strong><br/>
                                                        ⇥ {day.stopData && formatOdometer(day.stopData.odometer)}<br/>
                                                        {day.stopData && formatDate(day.stopData.date, props.lang)}<br/>
                                                        {day.stopData?.placeData ?
                                                            (<>{day.stopData.placeData.name} - {day.stopData.placeData.street}, {day.stopData.placeData.country} {day.stopData.placeData.code} {day.stopData.placeData.city}<br/></>)
                                                            :
                                                            (<>{day.stopData && day.stopData.place}<br/></>)
                                                        }
                                                        {day.stopData?.notes &&
                                                            <>
                                                                <DetailsIcon/><br/>
                                                                {day.stopData.notes}<br/>
                                                            </>
                                                        }
                                                        <br/>
                                                    </>
                                                }

                                                <strong>1 ⊙</strong> {formatTime(day.driveTime)} <strong>2 ⊙</strong> {formatTime(day.driveTime2)}<br/>
                                                💼 {formatTime(day.workTime)} ⏸ {day.cardState === dayCardStateEnum.notUsed ?
                                                days[props.lang].na
                                                :
                                                formatTime(day.breakTime)}<br/><br/>

                                                {formatFuelCombustion(day.fuelBurned, day.distance)}<br/>
                                                {formatFuelQuantity(day.fuelBurned)}<br/>
                                                {formatOdometer(day.distance)}<br/><br/>

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