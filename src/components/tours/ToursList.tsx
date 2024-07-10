import {TourInterface, userLangEnum} from "types";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {apiPaths} from "../../config/api";
import {useApi} from "../../hooks/useApi";
import {useAlert} from "../../hooks/useAlert";
import {CircularProgress, Fab, Tooltip} from "@mui/material";
import {tours} from "../../assets/txt/tours";
import {formatDate} from "../../utils/formats/formatDate";
import {formatTimeToTime} from "../../utils/formats/formatTimeToTime";
import {formatFuelQuantity} from "../../utils/formats/formatFuelQuantity";
import {formatFuelCombustion} from "../../utils/formats/formatFuelCombustion";
import {formatWeight} from "../../utils/formats/formatWeight";
import {formatOdometer} from "../../utils/formats/formatOdometer";
import {formatAmount} from "../../utils/formats/formatAmount";
import DetailsIcon from "@mui/icons-material/Details";
import AssignmentIcon from '@mui/icons-material/Assignment';
import { ToursCreateSettlement } from "./ToursCreateSettlement";
import {MonthlySettlementTypes} from "../../types/MonthlySettlementTypes";
import InfoIcon from '@mui/icons-material/Info';
import ClearIcon from '@mui/icons-material/Clear';
import {NavLink} from "react-router-dom";
import {DeleteFromLocalStorage, DownloadFromLocalStorage, SaveToLocalStorage} from "../../hooks/LocalStorageHook";
import EditIcon from "@mui/icons-material/Edit";
import {TourEdit} from "./TourEdit";


interface Props {
    lang: userLangEnum;
    monthlySettlement?: MonthlySettlementTypes;
    setMonthlySettlement?: Dispatch<React.SetStateAction<MonthlySettlementTypes | null>>;
    refresh: boolean;
    setRefresh: Dispatch<SetStateAction<boolean>>;
    setSelectedTour: Dispatch<SetStateAction<number | null>>;
}

export const ToursList = (props: Props) => {
    const {setAlert} = useAlert();
    const {loading, fetchDataOld} = useApi();
    const [data, setData] = useState<TourInterface[]>([]);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [expandedRow, setExpandedRow] = useState<number | null>(null);
    const [showSettlementWindow, setShowSettlementWindow] = useState<boolean>(false);
    const [editTourData, setEditTourData] = useState<TourInterface | null>(null);

    const handleMouseEnter = (): void => {
        setIsHovered(true);
    };

    const handleMouseLeave = (): void => {
        setIsHovered(false);
    };

    const handleClose = (): void => {
        DeleteFromLocalStorage('toursSetId');
        DeleteFromLocalStorage('toursSetMonth');
        DeleteFromLocalStorage('toursSetTourDetailsId');
        props.setMonthlySettlement && props.setMonthlySettlement(null);
    }

    const handleDetails = (tourId: number): void => {
        SaveToLocalStorage('toursSetTourDetailsId', tourId.toString());
        props.setSelectedTour(tourId);
    }

    const handleExpand = (tourId: number | null): void => {
        if (!tourId) {
            setExpandedRow(null);
            DeleteFromLocalStorage('toursSetTourDetailsId');
        } else {
            setExpandedRow(tourId);
            SaveToLocalStorage('toursSetTourDetailsId', tourId.toString());
        }
    }

    useEffect(() => {
        (async () => {
            const result = props.monthlySettlement
                ? await fetchDataOld(apiPaths.getRoutes + '/' + props.monthlySettlement.id, 'GET')
                : await fetchDataOld(apiPaths.getRoutes, 'GET');
            if ((result && result.responseData) && (!result.responseData.dtc)) {
                setData(result.responseData);
            } else {
                setAlert(tours[props.lang].apiError, 'error');
            }
        })();
        const selectedTour = DownloadFromLocalStorage('toursSetTourDetailsId');
        if (selectedTour) {
            setExpandedRow(Number(selectedTour));
        }
        // eslint-disable-next-line
    }, [props.refresh, props.monthlySettlement]);

    if (loading) {
        return <CircularProgress/>
    }

    return (
        <>
            <main className="Table">
                <section className="Table__Header">
                    {props.monthlySettlement
                        ?
                        <>
                        {tours[props.lang].monthlyToursHeader(props.monthlySettlement.month)}
                            &nbsp;&nbsp;
                            <Tooltip title={tours[props.lang].close} arrow>
                                <NavLink to='' className='CloseLink' onClick={() => handleClose()}>
                                    <ClearIcon sx={{mr: 1}}/>
                                </NavLink>
                            </Tooltip>
                        </>
                        : tours[props.lang].unaccountedRoutes}
                </section>

                <section className="Table__Body">
                    <table>
                        <thead>
                        <tr>
                            <th>
                                {tours[props.lang].tour}
                            </th>
                            <th>
                                {tours[props.lang].from}
                                <br/><br/>
                                {tours[props.lang].to}
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
                                <u>{tours[props.lang].fuel}:</u>
                                <br/>
                                {tours[props.lang].before}
                                <br/><br/>
                                {tours[props.lang].after}
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
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {editTourData && <TourEdit
                            tour={editTourData}
                            setTour={setEditTourData}
                            lang={props.lang}
                            setRefresh={props.setRefresh}
                        />}
                        {showSettlementWindow && <ToursCreateSettlement
                            lang={props.lang}
                            tourList={data}
                            setRefresh={props.setRefresh}
                            setAlert={setAlert}
                            show={showSettlementWindow}
                            setShow={setShowSettlementWindow}
                        />}
                        {data?.map((tour) => {
                            return (
                                <React.Fragment key={tour.id}>
                                    {expandedRow !== tour.id && (
                                        <tr onClick={() => handleExpand(tour.id)}>
                                            <td>
                                                {tour.tourNr}
                                            </td>
                                            <td>
                                                {tour.startLogData
                                                    ? formatDate(tour.startLogData.date, props.lang)
                                                    : tours[props.lang].na
                                                }
                                                <br/><br/>
                                                {tour.stopLogData
                                                    ? formatDate(tour.stopLogData.date, props.lang)
                                                    : tours[props.lang].na
                                                }
                                            </td>
                                            <td>
                                                {formatTimeToTime(tour.driveTime)}
                                                <br/><br/>
                                                {formatTimeToTime(tour.workTime)}
                                            </td>
                                            <td>
                                                {tour.daysOnDuty}
                                                <br/><br/>
                                                {tour.daysOffDuty}
                                            </td>
                                            <td>
                                                {formatFuelQuantity(tour.fuelStateBefore, 'integer')}
                                                <br/><br/>
                                                {formatFuelQuantity(tour.fuelStateAfter, 'integer')}
                                            </td>
                                            <td>
                                                {formatFuelQuantity(tour.burnedFuelComp, 'integer')}
                                                <br/><br/>
                                                {formatFuelQuantity(tour.burnedFuelReal, 'integer')}
                                            </td>
                                            <td>
                                                {formatFuelQuantity(tour.totalRefuel, 'twoDecimals')}
                                                <br/><br/>
                                                {formatFuelCombustion(Number(tour.burnedFuelReal), tour.distance)}
                                            </td>
                                            <td>
                                                {formatWeight(tour.avgWeight)}
                                                <br/>
                                                ({tour.numberOfLoads})
                                            </td>
                                            <td>
                                                {formatOdometer(tour.distance)}
                                            </td>
                                            <td>
                                                {formatAmount(Number(tour.expectedSalary), tour.currency)}
                                                <br/><br/>
                                                {formatAmount(Number(tour.salary), tour.currency)}
                                            </td>
                                            <td>
                                                {tour.salary > 0
                                                    ? formatAmount(Number(tour.salary) / Number(tour.distance), tour.currency)
                                                    : tours[props.lang].na
                                                } / {tour.salary > 0
                                                ? formatAmount(Number(tour.salary) / (Number(tour.workTime.split(":")[0]) + (Number(tour.workTime.split(":")[1]) / 60)), tour.currency)
                                                : tours[props.lang].na
                                            }
                                                <br/><br/>
                                                {tour.salary > 0
                                                    ? formatAmount(Number(tour.salary) / (Number(tour.daysOnDuty) + Number(tour.daysOffDuty)), tour.currency)
                                                    : tours[props.lang].na
                                                }
                                            </td>
                                            <td>
                                                {formatAmount(Number(tour.outgoings), tour.currency)}
                                            </td>
                                            <td>{(tour.startLogData?.notes || tour.stopLogData?.notes) &&
                                                <DetailsIcon/>}</td>
                                        </tr>
                                    )}
                                    {expandedRow === tour.id && (
                                        <>
                                            <tr
                                                onClick={() => handleExpand(null)}
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}
                                                className={isHovered ? 'highlighted' : ''}
                                            >
                                                <td>
                                                    {tour.tourNr}
                                                </td>
                                                <td>
                                                    {tour.startLogData
                                                        ? formatDate(tour.startLogData.date, props.lang)
                                                        : tours[props.lang].na
                                                    }
                                                    <br/><br/>
                                                    {tour.stopLogData
                                                        ? formatDate(tour.stopLogData.date, props.lang)
                                                        : tours[props.lang].na
                                                    }
                                                </td>
                                                <td>
                                                    {formatTimeToTime(tour.driveTime)}
                                                    <br/><br/>
                                                    {formatTimeToTime(tour.workTime)}
                                                </td>
                                                <td>
                                                    {tour.daysOnDuty}
                                                    <br/><br/>
                                                    {tour.daysOffDuty}
                                                </td>
                                                <td>
                                                    {formatFuelQuantity(tour.fuelStateBefore, 'integer')}
                                                    <br/><br/>
                                                    {formatFuelQuantity(tour.fuelStateAfter, 'integer')}
                                                </td>
                                                <td>
                                                    {formatFuelQuantity(tour.burnedFuelComp, 'integer')}
                                                    <br/><br/>
                                                    {formatFuelQuantity(tour.burnedFuelReal, 'integer')}
                                                </td>
                                                <td>
                                                    {formatFuelQuantity(tour.totalRefuel, 'twoDecimals')}
                                                    <br/><br/>
                                                    {formatFuelCombustion(Number(tour.burnedFuelReal), tour.distance)}
                                                </td>
                                                <td>
                                                    {formatWeight(tour.avgWeight)}
                                                    <br/>
                                                    ({tour.numberOfLoads})
                                                </td>
                                                <td>
                                                    {formatOdometer(tour.distance)}
                                                </td>
                                                <td>
                                                    {formatAmount(Number(tour.expectedSalary), tour.currency)}
                                                    <br/><br/>
                                                    {formatAmount(Number(tour.salary), tour.currency)}
                                                </td>
                                                <td>
                                                    {tour.salary > 0
                                                        ? formatAmount(Number(tour.salary) / Number(tour.distance), tour.currency)
                                                        : tours[props.lang].na
                                                    } / {tour.salary > 0
                                                    ? formatAmount(Number(tour.salary) / (Number(tour.workTime.split(":")[0]) + (Number(tour.workTime.split(":")[1]) / 60)), tour.currency)
                                                    : tours[props.lang].na
                                                }
                                                    <br/><br/>
                                                    {tour.salary > 0
                                                        ? formatAmount(Number(tour.salary) / (Number(tour.daysOnDuty) + Number(tour.daysOffDuty)), tour.currency)
                                                        : tours[props.lang].na
                                                    }
                                                </td>
                                                <td>
                                                    {formatAmount(Number(tour.outgoings), tour.currency)}
                                                </td>
                                                <td></td>
                                            </tr>
                                            <tr></tr>
                                            <tr
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}
                                                className={isHovered ? 'highlighted' : ''}
                                            >
                                                <td colSpan={13} className="extended">
                                                    {(tour.startLogData?.notes || tour.stopLogData?.notes) &&
                                                        <DetailsIcon/>}
                                                    <br/>
                                                    {tour.startLogData?.notes &&
                                                        <>
                                                            {tours[props.lang].start}: {tour.startLogData.notes}
                                                            <br/>
                                                        </>
                                                    }
                                                    {tour.stopLogData?.notes &&
                                                        <>
                                                            {tours[props.lang].stop}: {tour.stopLogData.notes}
                                                            <br/>
                                                        </>
                                                    }
                                                    <br/><br/>
                                                    <Fab variant="extended" size="small" color="primary" onClick={() => handleDetails(tour.id)}>
                                                        <InfoIcon sx={{mr: 1}}/>
                                                        {tours[props.lang].details}
                                                    </Fab>
                                                    <br/><br/>
                                                    <div>
                                                        <Fab
                                                            variant="extended"
                                                            size="small"
                                                            color="primary"
                                                            onClick={() => setEditTourData(tour)}
                                                        >
                                                            <EditIcon sx={{mr: 1}}/>
                                                            {tours[props.lang].edit}
                                                        </Fab>
                                                    </div><br/>
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
            {!props.monthlySettlement &&
                <div>
                    <br/>
                    <Fab variant="extended" size="small" color="primary" onClick={() => setShowSettlementWindow(true)}>
                        <AssignmentIcon sx={{mr: 1}}/>
                        {tours[props.lang].settle}
                    </Fab>
                </div>
            }
        </>
    );
}