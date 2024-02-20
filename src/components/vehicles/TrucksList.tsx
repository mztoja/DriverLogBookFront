import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {UserInterface, VehicleInterface, vehicleTypeEnum} from "types";
import {useAlert} from "../../hooks/useAlert";
import {useApi} from "../../hooks/useApi";
import {apiPaths} from "../../config/api";
import {vehicles} from "../../assets/txt/vehicles";
import {CircularProgress, Fab} from "@mui/material";
import {CompanySelect} from "../common/form/place/CompanySelect";
import {TruckEdit} from "./TruckEdit";
import {formatWeight} from "../../utils/formatWeight";
import {formatShortDate} from "../../utils/formatShortDate";
import DetailsIcon from "@mui/icons-material/Details";
import EditIcon from "@mui/icons-material/Edit";
import {formatOdometer} from "../../utils/formatOdometer";

interface Props {
    userData: UserInterface;
    refresh: boolean;
    setUserData: Dispatch<SetStateAction<UserInterface | null>>;
    setRefresh: Dispatch<SetStateAction<boolean>>;
}

export const TrucksList = (props: Props) => {
    const {setAlert} = useAlert();
    const {loading, fetchData} = useApi();
    const [data, setData] = useState<VehicleInterface[] | null>(null);
    const [showData, setShowData] = useState<VehicleInterface[] | null>(null);
    const [companyId, setCompanyId] = useState<string>(props.userData.companyId.toString());
    const [expandedRow, setExpandedRow] = useState<number | null>(null);
    const [chosenVehicle, setChosenVehicle] = useState<VehicleInterface | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    useEffect(() => {
        (async () => {
            const result = await fetchData(apiPaths.getTrucksList, 'GET');
            if ((result && result.responseData) && (!result.responseData.dtc)) {
                setData(result.responseData);
            } else {
                setAlert(vehicles[props.userData.lang].apiTrucksError, 'error');
            }
        })();
        // eslint-disable-next-line
    }, [props.refresh]);

    useEffect(() => {
        const newData = data?.filter(vehicle => (
            vehicle.type === vehicleTypeEnum.truck && vehicle.companyId === Number(companyId)
        ));
        setShowData(newData ? newData : null);
    }, [data, companyId]);

    if (loading) return <CircularProgress/>;

    if (data) {
        return (
            <>
                <main className="Table">
                    <section className="Table__Header">
                        {vehicles[props.userData.lang].trucksTableHeader}
                    </section>
                    <section className="Table__Filter">
                        <div>
                            <CompanySelect lang={props.userData.lang} value={companyId}
                                           onChange={e => setCompanyId(e)}/>
                        </div>
                    </section>
                    <section className="Table__Body">
                        <table>
                            <thead>
                            <tr>
                                <th>{vehicles[props.userData.lang].thLp}</th>
                                <th>
                                    {vehicles[props.userData.lang].registrationPlate}
                                    <br/>
                                    {vehicles[props.userData.lang].model}
                                </th>
                                <th>
                                    {vehicles[props.userData.lang].isLoadable}
                                    <br/>
                                    {vehicles[props.userData.lang].tankCapacity}
                                </th>
                                <th>
                                    {vehicles[props.userData.lang].yearOfProduction}
                                    <br/>
                                    {vehicles[props.userData.lang].weightDisp}
                                </th>
                                <th>
                                    {vehicles[props.userData.lang].techRev}
                                    <br/>
                                    {vehicles[props.userData.lang].insurance}
                                </th>
                                <th>
                                    {vehicles[props.userData.lang].tacho}
                                    <br/>
                                    {vehicles[props.userData.lang].nextService}
                                </th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {chosenVehicle && <TruckEdit
                                lang={props.userData.lang}
                                vehicle={chosenVehicle}
                                setRefresh={props.setRefresh}
                                setVehicle={setChosenVehicle}
                                setAlert={setAlert}
                            />}
                            {showData?.map((vehicle, index) => {
                                    index++;
                                    const today = new Date();
                                    const markTechRevAsExpired = new Date(vehicle.techRev) < today ? 'expired' : '';
                                    const markInsuranceAsExpired = new Date(vehicle.insurance) < today ? 'expired' : '';
                                    const markTachoAsExpired = new Date(vehicle.tacho ? vehicle.tacho : '') < today ? 'expired' : '';
                                    return (
                                        <React.Fragment key={vehicle.id}>
                                            {expandedRow !== index && (
                                                <tr onClick={() => setExpandedRow(index)}>
                                                    <td>{index}</td>
                                                    <td>
                                                        {vehicle.registrationNr}
                                                        <br/>
                                                        {vehicle.model === '' ? '---' : vehicle.model}
                                                    </td>
                                                    <td>
                                                        {vehicle.isLoadable ? vehicles[props.userData.lang].yes : vehicles[props.userData.lang].no}
                                                        <br/>
                                                        {vehicle.fuel} L
                                                    </td>
                                                    <td>
                                                        {vehicle.year === 0 ? '---' : vehicle.year}
                                                        <br/>
                                                        {formatWeight(vehicle.weight)}
                                                    </td>
                                                    <td>
                                                        <span
                                                            className={markTechRevAsExpired}>{formatShortDate(vehicle.techRev)}</span>
                                                        <br/>
                                                        <span
                                                            className={markInsuranceAsExpired}>{formatShortDate(vehicle.insurance)}</span>
                                                    </td>
                                                    <td>
                                                        <span
                                                            className={markTachoAsExpired}>{formatShortDate(vehicle.tacho ? vehicle.tacho : '')}</span>
                                                        <br/>
                                                        {formatOdometer(vehicle.service ? vehicle.service : 0)}
                                                    </td>
                                                    <td>{vehicle.notes !== null && <DetailsIcon/>}</td>
                                                </tr>
                                            )}
                                            {expandedRow === index && (
                                                <>
                                                    <tr
                                                        onClick={() => setExpandedRow(null)}
                                                        onMouseEnter={handleMouseEnter}
                                                        onMouseLeave={handleMouseLeave}
                                                        className={isHovered ? 'highlighted' : ''}
                                                    >
                                                        <td>{index}</td>
                                                        <td>
                                                            {vehicle.registrationNr}
                                                            <br/>
                                                            {vehicle.model === '' ? '---' : vehicle.model}
                                                        </td>
                                                        <td>
                                                            {vehicle.isLoadable ? vehicles[props.userData.lang].yes : vehicles[props.userData.lang].no}
                                                            <br/>
                                                            {vehicle.fuel} L
                                                        </td>
                                                        <td>
                                                            {vehicle.year === 0 ? '---' : vehicle.year}
                                                            <br/>
                                                            {formatWeight(vehicle.weight)}
                                                        </td>
                                                        <td>
                                                        <span
                                                            className={markTechRevAsExpired}>{formatShortDate(vehicle.techRev)}</span>
                                                            <br/>
                                                            <span
                                                                className={markInsuranceAsExpired}>{formatShortDate(vehicle.insurance)}</span>
                                                        </td>
                                                        <td>
                                                        <span
                                                            className={markTachoAsExpired}>{formatShortDate(vehicle.tacho ? vehicle.tacho : '')}</span>
                                                            <br/>
                                                            {formatOdometer(vehicle.service ? vehicle.service : 0)}
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
                                                            {vehicle.notes !== null && <>
                                                                <DetailsIcon/><br/>
                                                                {vehicle.notes.split('\n').map((line, index) => (
                                                                    <React.Fragment key={index}>
                                                                        {line}
                                                                        <br />
                                                                    </React.Fragment>
                                                                ))}
                                                            </>}<br/>
                                                            <div>
                                                                <Fab variant="extended" size="small" color="primary" onClick={() => setChosenVehicle(vehicle)}>
                                                                    <EditIcon sx={{mr: 1}}/>
                                                                    {vehicles[props.userData.lang].edit}
                                                                </Fab>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </>
                                            )}
                                        </React.Fragment>
                                    );
                                }
                            )}
                            </tbody>
                        </table>
                    </section>
                </main>
            </>
        );
    }
    return <>{vehicles[props.userData.lang].apiTrucksError}</>
}