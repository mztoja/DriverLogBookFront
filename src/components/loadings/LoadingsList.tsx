import {LoadInterface, LoadListResponse, loadStatusEnum, TourNumbersInterface, userLangEnum} from "types";
import {useAlert} from "../../hooks/useAlert";
import {useApi} from "../../hooks/useApi";
import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {apiPaths} from "../../config/api";
import {LOADINGS_PER_PAGE} from "../../config/set";
import {loadings} from "../../assets/txt/loadings";
import {CircularProgress, Fab, Tooltip} from "@mui/material";
import {TablePagination} from "../common/TablePagination";
import {formatDate} from "../../utils/formats/formatDate";
import {formatSimplePlace} from "../../utils/formats/formatSimplePlace";
import {formatWeight} from "../../utils/formats/formatWeight";
import {formatOdometer} from "../../utils/formats/formatOdometer";
import {formatPlace} from "../../utils/formats/formatPlace";
import DetailsIcon from "@mui/icons-material/Details";
import {tours} from "../../assets/txt/tours";
import {NavLink} from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import {LoadingEdit} from "./LoadingEdit";

interface Props {
    lang: userLangEnum;
    tourId?: number;
    setShowLoadingsList?: Dispatch<SetStateAction<boolean>>;
}

export const LoadingsList = (props: Props) => {
    const {setAlert} = useAlert();
    const {loading, fetchData} = useApi();
    const [data, setData] = useState<LoadInterface[] | null>(null);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [expandedRow, setExpandedRow] = useState<number | null>(null);
    const [tourNrs, setTourNrs] = useState<TourNumbersInterface[] | null>(null);
    const prevTourId = useRef<number>(0);
    const [isHovered, setIsHovered] = useState(false);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [editLoadData, setEditLoadData] = useState<LoadInterface | null>(null);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleEditButton = (loadData: LoadInterface | null): void => {
        setEditLoadData(loadData);
    }

    const handleClose = () => {
        props.setShowLoadingsList && props.setShowLoadingsList(false);
    }

    useEffect(() => {
        if (props.tourId) {
            fetchData<LoadInterface[]>(`${apiPaths.getLoadingsByTourId}/${props.tourId}`).then((res) => {
               if (res.responseData) {
                   setData(res.responseData);
                   setTotalItems(0);
               } else {
                   setAlert(loadings[props.lang].apiError, 'error');
               }
            });
        } else {
            fetchData<LoadListResponse>(`${apiPaths.getLoadings}/${page}/${LOADINGS_PER_PAGE}`).then((res) => {
                if (res.responseData) {
                    setData(res.responseData.items);
                    setTotalItems(res.responseData.totalItems);
                } else {
                    setAlert(loadings[props.lang].apiError, 'error');
                }
            });
        }
        // eslint-disable-next-line
    }, [page, refresh]);

    useEffect(() => {
        if (data) {
            const uniqueTourIds: number[] = data.reduce((uniqueTourIds: number[], load: LoadInterface) => {
                if (!uniqueTourIds.includes(load.tourId)) {
                    uniqueTourIds.push(load.tourId);
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
                            {loadings[props.lang].tableHeader}
                            &nbsp;&nbsp;
                            <Tooltip title={tours[props.lang].close} arrow>
                                <NavLink to='' className='CloseLink' onClick={() => handleClose()}>
                                    <ClearIcon sx={{mr: 1}}/>
                                </NavLink>
                            </Tooltip>
                        </>
                        :loadings[props.lang].tableHeader
                    }
                </section>
                <section className="Table__Body">
                    <table>
                        <thead>
                        <tr>
                            <th>
                                {loadings[props.lang].loadNr}
                                <br/><br/>
                                {loadings[props.lang].tourNr}
                            </th>
                            <th>
                                {loadings[props.lang].loading}
                                <br/><br/>
                                {loadings[props.lang].unloading}
                            </th>
                            <th>
                                {loadings[props.lang].sender}
                                <br/><br/>
                                {loadings[props.lang].receiver}
                            </th>
                            <th>
                                {loadings[props.lang].refNr}
                                <br/><br/>
                                {loadings[props.lang].vehicle}
                            </th>
                            <th>
                                {loadings[props.lang].description}
                                <br/><br/>
                                {loadings[props.lang].quantity}
                            </th>
                            <th>
                                {loadings[props.lang].distance}
                                <br/><br/>
                                {loadings[props.lang].weight}
                            </th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {editLoadData &&
                            <LoadingEdit
                                load={editLoadData}
                                setLoad={setEditLoadData}
                                lang={props.lang}
                                setRefresh={setRefresh}
                            />}
                        {data?.map((load, index) => {
                            const tourNr = Array.isArray(tourNrs) ? (tourNrs.find(tour => tour.tourId === load.tourId)?.tourNr ?? '') : '';
                            const division = prevTourId.current !== load.tourId;
                            prevTourId.current = load.tourId;
                            return (
                                <React.Fragment key={load.id}>
                                    {division && index !== 0 &&
                                        <>
                                            <tr className='tableParting'>
                                                <td colSpan={7}></td>
                                            </tr>
                                            <tr></tr>
                                        </>
                                    }
                                    {expandedRow !== load.id && (
                                        <tr onClick={() => setExpandedRow(load.id)}>
                                            <td>
                                                {load.loadNr}
                                                <br/><br/>
                                                {tourNr}
                                            </td>
                                            <td>
                                                {load.loadingLogData &&
                                                    <>
                                                        {formatDate(load.loadingLogData.date, props.lang)}
                                                        <br/>
                                                        {formatSimplePlace(load.loadingLogData.place, load.loadingLogData.placeData)}
                                                    </>
                                                }
                                                <br/><br/>

                                                    {load.status === loadStatusEnum.notUnloaded
                                                        ? loadings[props.lang].notUnloaded
                                                        :
                                                        load.unloadingLogData &&
                                                        <>
                                                            {formatDate(load.unloadingLogData.date, props.lang)}
                                                            <br/>
                                                            {formatSimplePlace(load.unloadingLogData.place, load.unloadingLogData.placeData)}
                                                        </>

                                                    }

                                            </td>
                                            <td>
                                                {formatSimplePlace(loadings[props.lang].na,load.senderData)} {load.senderData?.country}
                                                <br/><br/>
                                                {formatSimplePlace(loadings[props.lang].na,load.receiverData)} {load.receiverData?.country}
                                            </td>
                                            <td>
                                                {load.reference === '' ? loadings[props.lang].na : load.reference}
                                                <br/><br/>
                                                {load.vehicle}
                                            </td>
                                            <td>
                                                {load.description === '' ? loadings[props.lang].na : load.description}
                                                <br/><br/>
                                                {load.quantity === '' ? loadings[props.lang].na : load.quantity}
                                            </td>
                                            <td>
                                                {formatOdometer(load.distance)}
                                                <br/><br/>
                                                {formatWeight(load.weight)}
                                            </td>
                                            <td>{(load.loadingLogData?.notes || load.unloadingLogData?.notes) && <DetailsIcon/>}</td>
                                        </tr>
                                    )}
                                    {expandedRow === load.id && (
                                        <>
                                            <tr
                                                onClick={() => setExpandedRow(null)}
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}
                                                className={isHovered ? 'highlighted' : ''}
                                            >
                                                <td>
                                                    {load.loadNr}
                                                    <br/><br/>
                                                    {tourNr}
                                                </td>
                                                <td>
                                                    {load.loadingLogData &&
                                                        <>
                                                            {formatDate(load.loadingLogData.date, props.lang)}
                                                            <br/>
                                                            {formatPlace(load.loadingLogData.place, load.loadingLogData.placeData, props.lang)}
                                                        </>
                                                    }
                                                    <br/><br/>

                                                    {load.status === loadStatusEnum.notUnloaded
                                                        ? loadings[props.lang].notUnloaded
                                                        :
                                                        load.unloadingLogData &&
                                                        <>
                                                            {formatDate(load.unloadingLogData.date, props.lang)}
                                                            <br/>
                                                            {formatPlace(load.unloadingLogData.place, load.unloadingLogData.placeData, props.lang)}
                                                        </>

                                                    }

                                                </td>
                                                <td>
                                                    {formatPlace(loadings[props.lang].na,load.senderData, props.lang)} {load.senderData?.country}
                                                    <br/><br/>
                                                    {formatPlace(loadings[props.lang].na,load.receiverData, props.lang)} {load.receiverData?.country}
                                                </td>
                                                <td>
                                                    {load.reference === '' ? loadings[props.lang].na : load.reference}
                                                    <br/><br/>
                                                    {load.vehicle}
                                                </td>
                                                <td>
                                                    {load.description === '' ? loadings[props.lang].na : load.description}
                                                    <br/><br/>
                                                    {load.quantity === '' ? loadings[props.lang].na : load.quantity}
                                                </td>
                                                <td>
                                                    {formatOdometer(load.distance)}
                                                    <br/><br/>
                                                    {formatWeight(load.weight)}
                                                </td>
                                                <td></td>
                                            </tr>
                                            <tr></tr>
                                            <tr
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}
                                                className={isHovered ? 'highlighted' : ''}
                                            >
                                                <td colSpan={7} className="extended">
                                                    {(load.loadingLogData?.notes || load.unloadingLogData?.notes) && <DetailsIcon/>}
                                                    <br/>
                                                    {load.loadingLogData?.notes &&
                                                        <>{loadings[props.lang].loading}: {load.loadingLogData.notes}<br/></>
                                                    }
                                                    {load.unloadingLogData?.notes &&
                                                        <>{loadings[props.lang].unloading}: {load.unloadingLogData.notes}<br/></>
                                                    }
                                                    <br/>
                                                    <div>
                                                        <Fab
                                                            variant="extended"
                                                            size="small"
                                                            color="primary"
                                                            onClick={() => handleEditButton(load)}
                                                        >
                                                            <EditIcon sx={{mr: 1}}/>
                                                            {loadings[props.lang].edit}
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
            {!props.tourId && <TablePagination totalItems={totalItems} page={page} rowsPerPage={LOADINGS_PER_PAGE} setPage={setPage}/>}
        </>
    );
}