import {FinanceInterface, TourNumbersInterface, userLangEnum, FinanceListResponse} from "types";
import {useAlert} from "../../hooks/useAlert";
import {useApi} from "../../hooks/useApi";
import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {apiPaths} from "../../config/api";
import {FINANCES_PER_PAGE} from "../../config/set";
import {finances} from "../../assets/txt/finances";
import {CircularProgress, Fab, Tooltip} from "@mui/material";
import {formatDate} from "../../utils/formats/formatDate";
import DetailsIcon from "@mui/icons-material/Details";
import {TablePagination} from "../common/TablePagination";
import {formatQuantity} from "../../utils/formats/formatQuantity";
import {formatAmount} from "../../utils/formats/formatAmount";
import {formatUnitPrice} from "../../utils/formats/formatUnitPrice";
import {formatPlace} from "../../utils/formats/formatPlace";
import {tours} from "../../assets/txt/tours";
import {NavLink} from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import {FinanceEdit} from "./FinanceEdit";
import { formatText } from "../../utils/formats/formatText";

interface Props {
    lang: userLangEnum;
    tourId?: number;
    setShowFinancesList?: Dispatch<SetStateAction<boolean>>;
}

export const FinancesList = (props: Props) => {
    const {setAlert} = useAlert();
    const {loading, fetchData} = useApi();

    const [data, setData] = useState<FinanceInterface[] | null>(null);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [expandedRow, setExpandedRow] = useState<number | null>(null);
    const [tourNrs, setTourNrs] = useState<TourNumbersInterface[] | null>(null);
    const prevTourId = useRef<number>(0);
    const [isHovered, setIsHovered] = useState(false);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [editFinanceData, setEditFinanceData] = useState<FinanceInterface | null>(null);

    const handleMouseEnter = (): void => {
        setIsHovered(true);
    };

    const handleMouseLeave = (): void => {
        setIsHovered(false);
    };

    const handleEditButton = (financeData: FinanceInterface | null): void => {
        setEditFinanceData(financeData);
    }

    const handleClose = () => {
        props.setShowFinancesList && props.setShowFinancesList(false);
    }

    useEffect(() => {
        if (props.tourId) {
            fetchData<FinanceInterface[]>(`${apiPaths.getFinancesByTourId}/${props.tourId}`).then((res) => {
                if (res.responseData) {
                    setData(res.responseData);
                    setTotalItems(0);
                } else {
                    setAlert(finances[props.lang].apiError, 'error');
                }
            });
        } else {
            fetchData<FinanceListResponse>(`${apiPaths.getFinances}/${page}/${FINANCES_PER_PAGE}`).then((res) => {
                if (res.responseData) {
                    setData(res.responseData.items);
                    setTotalItems(res.responseData.totalItems);
                } else {
                    setAlert(finances[props.lang].apiError, 'error');
                }
            });
        }
        // eslint-disable-next-line
    }, [page, refresh]);

    useEffect(() => {
        if (data) {
            const uniqueTourIds: number[] = data.reduce((uniqueTourIds: number[], finance: FinanceInterface) => {
                if (!uniqueTourIds.includes(finance.tourId)) {
                    uniqueTourIds.push(finance.tourId);
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
                            {finances[props.lang].tableHeader}
                            &nbsp;&nbsp;
                            <Tooltip title={tours[props.lang].close} arrow>
                                <NavLink to='' className='CloseLink' onClick={() => handleClose()}>
                                    <ClearIcon sx={{mr: 1}}/>
                                </NavLink>
                            </Tooltip>
                        </>
                        :finances[props.lang].tableHeader
                    }
                </section>
                <section className="Table__Body">
                    <table>
                        <thead>
                        <tr>
                            <th>{finances[props.lang].tNr}</th>
                            <th>{finances[props.lang].date}</th>
                            <th>{finances[props.lang].description}</th>
                            <th>{finances[props.lang].quantity}</th>
                            <th>{finances[props.lang].unitPrice}</th>
                            <th>{finances[props.lang].amount}</th>
                            <th>{finances[props.lang].localAmount}</th>
                            <th>{finances[props.lang].payment}</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {editFinanceData && <FinanceEdit
                            lang={props.lang}
                            finance={editFinanceData}
                            setFinance={setEditFinanceData}
                            setRefresh={setRefresh}
                        />}
                        {
                            data?.map((finance, index) => {
                                const tourNr = Array.isArray(tourNrs) ? (tourNrs.find(tour => tour.tourId === finance.tourId)?.tourNr ?? '') : '';
                                const division = prevTourId.current !== finance.tourId;
                                prevTourId.current = finance.tourId;
                                return (
                                    <React.Fragment key={finance.id}>
                                        {division && index !== 0 &&
                                            <tr className='tableParting'>
                                                <td colSpan={9}></td>
                                            </tr>
                                        }
                                        {expandedRow !== finance.id && (
                                            <tr onClick={() => setExpandedRow(finance.id)}>
                                                <td>
                                                    {/*<strong>{(page - 1) * LOGS_PER_PAGE + index + 1}</strong>*/}
                                                    {/*<br/>*/}
                                                    {tourNr ? tourNr : ''}
                                                </td>
                                                <td>
                                                    {finance.logData && formatDate(finance.logData.date, props.lang)}
                                                </td>
                                                <td>
                                                    {finance.itemDescription}
                                                </td>
                                                <td>
                                                    {formatQuantity(Number(finance.quantity))}
                                                </td>
                                                <td>
                                                    {Number(finance.quantity) === 1 || Number(finance.quantity) === 0 || Number(finance.amount) === 0
                                                        ? ''
                                                        : formatAmount(Number(formatUnitPrice(Number(finance.quantity), Number(finance.amount))), finance.currency)}
                                                </td>
                                                <td>
                                                    {formatAmount(Number(finance.amount), finance.currency)}
                                                </td>
                                                <td>
                                                    {finance.foreignCurrency === ''
                                                        ? finances[props.lang].na
                                                        : formatAmount(Number(finance.foreignAmount), finance.foreignCurrency)}
                                                </td>
                                                <td>
                                                    {finance.payment}
                                                </td>
                                                <td>
                                                    {(finance.logData?.notes) && <DetailsIcon/>}
                                                </td>
                                            </tr>
                                        )}
                                        {expandedRow === finance.id && (
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
                                                    {finance.logData && formatDate(finance.logData.date, props.lang)}
                                                    <br/>
                                                    {finance.logData && formatPlace(finance.logData.place, finance.logData.placeData, props.lang)}
                                                </td>
                                                <td>
                                                    {finance.itemDescription}
                                                </td>
                                                <td>
                                                    {formatQuantity(Number(finance.quantity))}
                                                </td>
                                                <td>
                                                    {Number(finance.quantity) === 1 || Number(finance.quantity) === 0 || Number(finance.amount) === 0
                                                        ? ''
                                                        : formatAmount(Number(formatUnitPrice(Number(finance.quantity), Number(finance.amount))), finance.currency)}
                                                </td>
                                                <td>
                                                    {formatAmount(Number(finance.amount), finance.currency)}
                                                </td>
                                                <td>
                                                    {finance.foreignCurrency === ''
                                                        ? finances[props.lang].na
                                                        : formatAmount(Number(finance.foreignAmount), finance.foreignCurrency)}
                                                </td>
                                                <td>
                                                    {finance.payment}
                                                </td>
                                                <td>
                                                </td>
                                            </tr>
                                            <tr></tr>
                                            <tr
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}
                                                className={isHovered ? 'highlighted' : ''}
                                            >
                                                <td colSpan={9} className="extended">
                                                        {(finance.logData?.notes) && <><br /><DetailsIcon /><br /><div dangerouslySetInnerHTML={{ __html: formatText(finance.logData.notes) }} /></>}
                                                    <br/>
                                                    <div>
                                                        <Fab
                                                            variant="extended"
                                                            size="small"
                                                            color="primary"
                                                            onClick={() => handleEditButton(finance)}
                                                        >
                                                            <EditIcon sx={{mr: 1}}/>
                                                            {finances[props.lang].edit}
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
            {!props.tourId && <TablePagination totalItems={totalItems} page={page} rowsPerPage={FINANCES_PER_PAGE} setPage={setPage}/>}
        </>
    );
}