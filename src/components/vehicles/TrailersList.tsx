import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {UserInterface, VehicleInterface, vehicleTypeEnum} from "types";
import {apiPaths} from "../../config/api";
import {vehicles} from "../../assets/txt/vehicles";
import {useAlert} from "../../hooks/useAlert";
import {useApi} from "../../hooks/useApi";
import {CircularProgress, Fab} from "@mui/material";
import DetailsIcon from "@mui/icons-material/Details";
import {CompanySelect} from "../common/form/place/CompanySelect";
import {formatShortDate} from "../../utils/formatShortDate";
import {formatWeight} from "../../utils/formatWeight";
import EditIcon from '@mui/icons-material/Edit';
import {TrailerEdit} from "./TrailerEdit";

interface Props {
    userData: UserInterface;
    refresh: boolean;
    setUserData: Dispatch<SetStateAction<UserInterface | null>>;
    setRefresh: Dispatch<SetStateAction<boolean>>;
}

export const TrailersList = (props: Props) => {
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
            const result = await fetchData(apiPaths.getTrailersList, 'GET');
            if ((result && result.responseData) && (!result.responseData.dtc)) {
                setData(result.responseData);
            } else {
                setAlert(vehicles[props.userData.lang].apiTrailersError, 'error');
            }
        })();
        // eslint-disable-next-line
    }, [props.refresh]);

    useEffect(() => {
        const newData = data?.filter(vehicle => (
            vehicle.type === vehicleTypeEnum.trailer && vehicle.companyId === Number(companyId)
        ));
        setShowData(newData ? newData : null);
    }, [data, companyId]);

    if (loading) return <CircularProgress/>;

    if (data) {
        return (
            <>
                <main className="Table">
                    <section className="Table__Header">
                        {vehicles[props.userData.lang].trailersTableHeader}
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
                                <th>{vehicles[props.userData.lang].registrationPlate}</th>
                                <th>{vehicles[props.userData.lang].model}</th>
                                <th>{vehicles[props.userData.lang].yearOfProduction}</th>
                                <th>{vehicles[props.userData.lang].weightDisp}</th>
                                <th>{vehicles[props.userData.lang].techRev}</th>
                                <th>{vehicles[props.userData.lang].insurance}</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {chosenVehicle && <TrailerEdit
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
                                    return (
                                        <React.Fragment key={vehicle.id}>
                                            {expandedRow !== index && (
                                                <tr onClick={() => setExpandedRow(index)}>
                                                    <td>{index}</td>
                                                    <td>{vehicle.registrationNr}</td>
                                                    <td>{vehicle.model === '' ? '---' : vehicle.model}</td>
                                                    <td>{vehicle.year === 0 ? '---' : vehicle.year}</td>
                                                    <td>{formatWeight(vehicle.weight)}</td>
                                                    <td className={markTechRevAsExpired}>{formatShortDate(vehicle.techRev)}</td>
                                                    <td className={markInsuranceAsExpired}>{formatShortDate(vehicle.insurance)}</td>
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
                                                        <td>{vehicle.registrationNr}</td>
                                                        <td>{vehicle.model === '' ? '---' : vehicle.model}</td>
                                                        <td>{vehicle.year === 0 ? '---' : vehicle.year}</td>
                                                        <td>{formatWeight(vehicle.weight)}</td>
                                                        <td className={markTechRevAsExpired}>{formatShortDate(vehicle.techRev)}</td>
                                                        <td className={markInsuranceAsExpired}>{formatShortDate(vehicle.insurance)}</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr></tr>
                                                    <tr
                                                        onMouseEnter={handleMouseEnter}
                                                        onMouseLeave={handleMouseLeave}
                                                        className={isHovered ? 'highlighted' : ''}
                                                    >
                                                        <td colSpan={8} className="extended">
                                                            {vehicle.notes !== null && <>
                                                                <DetailsIcon/><br/>
                                                                {vehicle.notes.split('\n').map((line, index) => (
                                                                    <React.Fragment key={index}>
                                                                        {line}
                                                                        <br/>
                                                                    </React.Fragment>
                                                                ))}
                                                            </>}<br/>
                                                            <div>
                                                                <Fab variant="extended" size="small" color="primary"
                                                                     onClick={() => setChosenVehicle(vehicle)}>
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
    return <>{vehicles[props.userData.lang].apiTrailersError}</>
}