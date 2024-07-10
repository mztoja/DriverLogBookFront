import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {
    DayInterface,
    LogInterface,
    PlaceInterface,
    TourInterface,
    UserInterface,
    userLangEnum,
    VehicleInterface,
    vehicleTypeEnum
} from "types";
import {DivClear} from "../../common/DivClear";
import './InfoBar.css';
import {info} from "../../../assets/txt/info";
import {formatOdometer} from "../../../utils/formats/formatOdometer";
import {formatSimplePlace} from "../../../utils/formats/formatSimplePlace";
import {formatDateToTime} from "../../../utils/formats/formatDateToTime";
import {formatFuelQuantity} from "../../../utils/formats/formatFuelQuantity";
import {apiPaths} from "../../../config/api";
import {useApi} from "../../../hooks/useApi";
import {vehicles} from "../../../assets/txt/vehicles";
import {formatWeight} from "../../../utils/formats/formatWeight";
import {formatShortDate} from "../../../utils/formats/formatShortDate";
import {TruckEdit} from "../../vehicles/TruckEdit";
import {useAlert} from "../../../hooks/useAlert";
import {TrailerEdit} from "../../vehicles/TrailerEdit";
import {Link, NavLink} from "react-router-dom";
import {AddVehicle} from "../../vehicles/AddVehicle";
import ClearIcon from "@mui/icons-material/Clear";
import {Tooltip} from "@mui/material";

interface Props {
    lang: userLangEnum;
    tourData: TourInterface | null;
    dayData: DayInterface | null;
    lastLogData: LogInterface | null;
    userData: UserInterface;
    setUserData: Dispatch<SetStateAction<UserInterface | null>>
    refresh: boolean;
    setRefresh: Dispatch<SetStateAction<boolean>>;
}

export const InfoBar = (props: Props) => {
    const txt = info[props.lang];
    const {fetchData} = useApi();
    const {setAlert} = useAlert();
    const {tourData, dayData, lastLogData} = props;

    const [currentTime, setCurrentTime] = useState<Date>(new Date());
    const [stopDate, setStopDate] = useState<Date | null>(null);
    const [tourDuration, setTourDuration] = useState<string>("");
    const [breakDuration, setBreakDuration] = useState<string>("");

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 2000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (!dayData) {
            fetchData<DayInterface>(apiPaths.getYourLastDay).then((res) => {
                if (res.responseData && res.responseData.stopData) {
                    setStopDate(new Date(res.responseData.stopData.date));
                }
            });
        }
        // eslint-disable-next-line
    }, [dayData]);

    useEffect(() => {
        if (tourData && tourData.startLogData) {
            const now = currentTime;
            const startDate = new Date(tourData.startLogData.date);
            const diff = Math.abs(now.getTime() - startDate.getTime());

            const hours = Math.floor(diff / 3600000);
            const minutes = Math.floor((diff % 3600000) / 60000);

            if (hours < 24) {
                setTourDuration(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
            } else {
                const days = Math.floor(hours / 24);
                const remainingHours = hours % 24;
                if (days === 1) {
                    setTourDuration(`${remainingHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${info[props.lang].and} ${days} ${info[props.lang].day}`);
                } else {
                    setTourDuration(`${remainingHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${info[props.lang].and} ${days} ${info[props.lang].days}`);
                }
            }
        }

        if (stopDate) {
            const diff = Math.abs(currentTime.getTime() - stopDate.getTime());
            const hours = Math.floor(diff / 3600000);
            const minutes = Math.floor((diff % 3600000) / 60000);
            const endTime = (addHours: number) => {
                const newDate = new Date(stopDate);
                newDate.setHours(stopDate.getUTCHours() + addHours);
                return (`${newDate.getUTCHours().toString()}:${newDate.getUTCMinutes().toString().padStart(2, '0')}`);
            }
            const timeLeft = (addHours: number) => {
                const newDate = new Date(stopDate);
                newDate.setHours(stopDate.getUTCHours() + addHours);
                newDate.setMinutes(newDate.getUTCMinutes() + 1);
                const diff = Math.abs(newDate.getTime() - currentTime.getTime());
                return (`${Math.floor(diff / 3600000).toString()}:${Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0')}`);
            }
            let description = '';
            if (hours >= 11) {
                description = txt.breakOver;
            }
            if (hours < 11) {

                description = `${txt.break11HourEnd} ${endTime(11)} (${txt.breakIn} ${timeLeft(11)})`;
            }
            if (hours < 9) {
                description = `${txt.break9HourEnd} ${endTime(9)} (${txt.breakIn} ${timeLeft(9)})`;
            }
            setBreakDuration(`
            ${txt.breakLasts}: ${hours.toString()}:${minutes.toString().padStart(2, '0')}
            |
            ${description}
            `);
        }
        // eslint-disable-next-line
    }, [currentTime, tourData, props.lang, stopDate]);


    const [truckData, setTruckData] = useState<VehicleInterface | null>(null);
    const [trailerData, setTrailerData] = useState<VehicleInterface | null>(null);
    const [destinationData, setDestinationData] = useState<PlaceInterface | null>(null);
    const [showTruckDetails, setShowTruckDetails] = useState<boolean>(false);
    const [showTrailerDetails, setShowTrailerDetails] = useState<boolean>(false);
    const [chosenTruckToEdit, setChosenTruckToEdit] = useState<VehicleInterface | null>(null);
    const [chosenTrailerToEdit, setChosenTrailerToEdit] = useState<VehicleInterface | null>(null);
    const [showAddVehicle, setShowAddVehicle] = useState<boolean>(false);
    const [addVehicleData, setAddVehicleData] = useState<{ type: vehicleTypeEnum; registration: string }>(
        {type: vehicleTypeEnum.trailer, registration: ''});
    const [goodsWeight, setGoodsWeight] = useState<number | null>(null);
    const [totalWeight, setTotalWeight] = useState<number>(0);

    useEffect(() => {
        if (tourData) {

            fetchData<VehicleInterface>(`${apiPaths.getVehicleByRegistration}/${tourData.truck}`, {
                setData: setTruckData,
            }).then();

            if (tourData.trailer) {
                fetchData<VehicleInterface>(`${apiPaths.getVehicleByRegistration}/${tourData.trailer}`, {
                    setData: setTrailerData,
                }).then();
            }

            fetchData<number>(apiPaths.getNotUnloadedLoadsMass, {
                setData: setGoodsWeight,
            }).then();

            if (props.userData.markedDepart !== 0) {
                fetchData<PlaceInterface>(`${apiPaths.getPlace}/${props.userData.markedDepart}`, {
                    setData: setDestinationData,
                }).then();
            } else {
                setDestinationData(null);
            }

        }
        // eslint-disable-next-line
    }, [props.refresh, props.userData.markedDepart]);

    useEffect(() => {
        let weight: number = 0;
        if (truckData) {
            weight = weight + truckData.weight;
        }
        if (trailerData) {
            weight = weight + trailerData.weight;
        }
        if (goodsWeight) {
            weight = weight + goodsWeight;
        }
        setTotalWeight(weight);
        // eslint-disable-next-line
    }, [truckData, trailerData, goodsWeight, props.refresh]);

    const handleShowDetails = (type: vehicleTypeEnum): void => {
        if (type === vehicleTypeEnum.truck) {
            setShowTruckDetails((prev) => !prev);
        } else if (type === vehicleTypeEnum.trailer) {
            setShowTrailerDetails((prev) => !prev);
        }
    }

    const handleAddVehicle = (type: vehicleTypeEnum, registration: string | undefined | null): void => {
        setAddVehicleData({type, registration: registration ? registration : ''});
        setShowAddVehicle(true);
    }

    const clearDestinationData = (): void => {
        fetchData(apiPaths.markDepart, {
            method: 'PATCH',
            sendData: {placeId: 0},
        }).then((res) => {
            if (res.success) {
                setAlert(txt.deleteSuccess, 'success');
                props.setUserData({...props.userData, markedDepart: 0});
            }
        })
    }

    return (
        <div id="InfoBar">
            {showAddVehicle && <AddVehicle userData={props.userData} setRefresh={props.setRefresh} show={showAddVehicle}
                                           setShow={setShowAddVehicle} vehicleType={addVehicleData.type}
                                           registrationNr={addVehicleData.registration}/>}
            <div className="InfoBar_Left">
                {txt.routeNo} {tourData?.tourNr}
                &nbsp;|&nbsp;
                {txt.distance}: {formatOdometer(tourData ? tourData.distance : 0)}
                &nbsp;|&nbsp;
                {tourData && tourData.startLogData &&
                    <>
                        {txt.lasts}: {tourDuration}
                    </>
                }
                <br/>
                {dayData
                    ?
                    <>
                        {dayData.startData &&
                            <>
                                {txt.youStartedDayAt} {formatDateToTime(dayData.startData.date)}
                                &nbsp;
                                {txt.in} {formatSimplePlace(dayData.startData.place, dayData.startData.placeData)}<br/>
                            </>
                        }
                        {txt.traveledToday}: {formatOdometer(dayData.distance)}
                        {dayData.startData &&
                            <>
                                &nbsp;|&nbsp;
                                {txt.workingTimeUntil}:
                                {dayData.doubleCrew
                                    ?
                                    <>
                                        &nbsp;
                                        {formatDateToTime(dayData.startData.date, 21)}
                                    </>
                                    :
                                    <>
                                        &nbsp;
                                        {formatDateToTime(dayData.startData.date, 13)}
                                        &nbsp;
                                        ({formatDateToTime(dayData.startData.date, 15)})
                                    </>
                                }
                            </>
                        }
                    </>
                    :
                    <>
                        {txt.noActiveDay}<br/>
                        {breakDuration}
                    </>
                }
                {destinationData &&
                    <>
                        <br/>
                        <span>
                        {txt.destination}: {destinationData.name}, {destinationData.street}, {destinationData.country}-{destinationData.code} {destinationData.city} (GPS: {destinationData.lat}, {destinationData.lon})
                        </span>
                        &nbsp;
                        <span
                            className="InfoBar_Button"
                            onClick={() => clearDestinationData()}
                        >
                        {txt.delete}
                    </span>
                    </>
                }
            </div>
            <div className="InfoBar_Right">
                {txt.truck}:
                &nbsp;
                {truckData
                    ?
                    <>
                        <span className="InfoBar_Button"
                              onClick={() => handleShowDetails(vehicleTypeEnum.truck)}>{tourData?.truck}</span>
                    </>
                    :
                    <>
                        <span className="InfoBar_Button"
                              onClick={() => handleAddVehicle(vehicleTypeEnum.truck, tourData?.truck)}>{tourData?.truck}</span>
                    </>
                }
                {tourData?.trailer &&
                    <>
                        &nbsp;|&nbsp;
                        {txt.trailer}:
                        &nbsp;
                        {trailerData
                            ?
                            <>
                                <span className="InfoBar_Button"
                                      onClick={() => handleShowDetails(vehicleTypeEnum.trailer)}>{tourData?.trailer}</span>
                            </>
                            :
                            <>
                                <span className="InfoBar_Button"
                                      onClick={() => handleAddVehicle(vehicleTypeEnum.trailer, tourData?.trailer)}>{tourData?.trailer}</span>
                            </>
                        }
                    </>
                }
                <br/>
                {(!truckData || (props.tourData?.trailer && !trailerData))
                    ?
                    <>
                        {txt.noDataInfo}
                    </>
                    :
                    <>
                        {txt.actualMass}: {formatWeight(totalWeight)} ({goodsWeight !== null ? formatWeight(goodsWeight) : txt.empty})
                    </>
                }
                <br/>

                {truckData && truckData.fuel !== null && truckData.fuel > 0 && tourData && (
                    <>
                        {txt.fuel}: <meter min={0} max={truckData.fuel ? truckData.fuel : 0}
                                           value={Number(tourData.fuelStateBefore) + Number(tourData.totalRefuel) - Number(tourData.burnedFuelComp)}></meter> {formatFuelQuantity(Number(tourData.fuelStateBefore) + Number(tourData.totalRefuel) - Number(tourData.burnedFuelComp), 'integer')}
                    </>
                )}
            </div>
            <DivClear/>
            {showTruckDetails && truckData &&
                <>
                    <fieldset>
                        <legend>
                            {vehicles[props.lang].truck}: {truckData.registrationNr}
                            <Tooltip title={info[props.lang].close} arrow>
                                <NavLink to='' className='CloseLink'
                                         onClick={() => handleShowDetails(vehicleTypeEnum.truck)}>
                                    <ClearIcon sx={{mr: 1}}/>
                                </NavLink>
                            </Tooltip>
                        </legend>
                        {chosenTruckToEdit && <TruckEdit
                            lang={props.lang}
                            vehicle={chosenTruckToEdit}
                            setRefresh={props.setRefresh}
                            setVehicle={setChosenTruckToEdit}
                            setAlert={setAlert}
                        />}
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    {vehicles[props.lang].model}:
                                </td>
                                <td>
                                    {truckData.model}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {vehicles[props.lang].isLoadable}:
                                </td>
                                <td>
                                    {truckData.isLoadable ? vehicles[props.lang].yes : vehicles[props.lang].no}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {vehicles[props.lang].tankCapacity}:
                                </td>
                                <td>
                                    {formatFuelQuantity(truckData.fuel, 'integer')}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {vehicles[props.lang].yearOfProduction}:
                                </td>
                                <td>
                                    {truckData.year === 0 ? '---' : truckData.year}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {vehicles[props.lang].weightDisp}:
                                </td>
                                <td>
                                    {formatWeight(truckData.weight)}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {vehicles[props.lang].techRev}:
                                </td>
                                <td>
                                <span
                                    className={new Date(truckData.techRev) < new Date() ? 'expired' : ''}
                                >
                                    {formatShortDate(truckData.techRev ? truckData.techRev : '')}
                                </span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {vehicles[props.lang].insurance}:
                                </td>
                                <td>
                                <span
                                    className={new Date(truckData.insurance) < new Date() ? 'expired' : ''}
                                >
                                    {formatShortDate(truckData.insurance ? truckData.insurance : '')}
                                </span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {vehicles[props.lang].tacho}:
                                </td>
                                <td>
                                <span
                                    className={truckData.tacho && new Date(truckData.tacho) < new Date() ? 'expired' : ''}
                                >
                                    {formatShortDate(truckData.tacho ? truckData.tacho : '')}
                                </span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {vehicles[props.lang].nextService}:
                                </td>
                                <td>
                                <span
                                    className={truckData.service && lastLogData && truckData.service > lastLogData.odometer
                                        ? ''
                                        : 'expired'}
                                >
                                    {formatOdometer(truckData.service ? truckData.service : 0)}
                                </span>
                                </td>
                            </tr>
                            {truckData.notes &&
                                <tr>
                                    <td colSpan={2}>
                                        {vehicles[props.lang].notes}:<br/><br/>
                                        <center>{truckData.notes}</center>
                                    </td>
                                </tr>
                            }
                            </tbody>
                        </table>
                        <span
                            className="InfoBar_Button"
                            onClick={() => setChosenTruckToEdit(truckData)}
                        >
                        {txt.edit}
                    </span>
                        <br/>
                        <Link to={`/vehicles/${truckData.id}`} className="InfoBar_Button">
                            {txt.showVehicleDetails}
                        </Link>
                    </fieldset>
                    <br/>
                </>
            }
            {showTrailerDetails && trailerData &&
                <>
                    <br/>
                    <fieldset>
                        <legend>
                            {vehicles[props.lang].trailer}: {trailerData.registrationNr}
                            <Tooltip title={info[props.lang].close} arrow>
                                <NavLink to='' className='CloseLink'
                                         onClick={() => handleShowDetails(vehicleTypeEnum.trailer)}>
                                    <ClearIcon sx={{mr: 1}}/>
                                </NavLink>
                            </Tooltip>
                        </legend>
                        {chosenTrailerToEdit && <TrailerEdit
                            lang={props.lang}
                            vehicle={chosenTrailerToEdit}
                            setRefresh={props.setRefresh}
                            setVehicle={setChosenTrailerToEdit}
                            setAlert={setAlert}
                        />}
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    {vehicles[props.lang].model}:
                                </td>
                                <td>
                                    {trailerData.model}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {vehicles[props.lang].yearOfProduction}:
                                </td>
                                <td>
                                    {trailerData.year === 0 ? '---' : trailerData.year}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {vehicles[props.lang].weightDisp}:
                                </td>
                                <td>
                                    {formatWeight(trailerData.weight)}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {vehicles[props.lang].techRev}:
                                </td>
                                <td>
                                <span
                                    className={new Date(trailerData.techRev) < new Date() ? 'expired' : ''}
                                >
                                    {formatShortDate(trailerData.techRev ? trailerData.techRev : '')}
                                </span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {vehicles[props.lang].insurance}:
                                </td>
                                <td>
                                <span
                                    className={new Date(trailerData.insurance) < new Date() ? 'expired' : ''}
                                >
                                    {formatShortDate(trailerData.insurance ? trailerData.insurance : '')}
                                </span>
                                </td>
                            </tr>
                            {trailerData.notes &&
                                <tr>
                                    <td colSpan={2}>
                                        {vehicles[props.lang].notes}:<br/><br/>
                                        <center>{trailerData.notes}</center>
                                    </td>
                                </tr>
                            }
                            </tbody>
                        </table>
                        <span
                            className="InfoBar_Button"
                            onClick={() => setChosenTrailerToEdit(trailerData)}
                        >
                        {txt.edit}
                    </span><br/>
                        <Link to={`/vehicles/${trailerData.id}`} className="InfoBar_Button">
                            {txt.showVehicleDetails}
                        </Link>
                    </fieldset>
                    <br/>
                </>
            }
        </div>
    );
}