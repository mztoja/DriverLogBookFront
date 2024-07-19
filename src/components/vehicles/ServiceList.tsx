import React, {Dispatch, SetStateAction, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {ServiceInterface, serviceTypeEnum, userLangEnum} from 'types';
import {vehicles} from "../../assets/txt/vehicles";
import {useApi} from "../../hooks/useApi";
import {apiPaths} from "../../config/api";
import InputLabel from "@mui/material/InputLabel";
import {Fab, MenuItem, Select, Tooltip} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import {NavLink} from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import {formatShortDate} from "../../utils/formats/formatShortDate";
import {formatSimplePlace} from "../../utils/formats/formatSimplePlace";
import {formatOdometer} from "../../utils/formats/formatOdometer";
import DetailsIcon from "@mui/icons-material/Details";
import {formatDate} from "../../utils/formats/formatDate";
import {formatPlace} from "../../utils/formats/formatPlace";
import EditIcon from "@mui/icons-material/Edit";
import {ServiceEdit} from "./ServiceEdit";
import { formatText } from "../../utils/formats/formatText";

interface Props {
    lang: userLangEnum;
    vehicleId: number;
    setVehicleId: Dispatch<SetStateAction<number | null>>;
}

enum ServiceType {
    all,
    maintenance,
    service,
}

export const ServiceList = (props: Props) => {
    const [data, setData] = useState<ServiceInterface[]>([]);
    const [showData, setShowData] = useState<ServiceInterface[]>([]);
    const {fetchData} = useApi();
    const [serviceType, setServiceType] = useState<ServiceType>(ServiceType.all);
    const [vehicleReg, setVehicleReg] = useState<string>('. . . . .');
    const ref = useRef<HTMLTableRowElement | null>(null);
    const [expandedRow, setExpandedRow] = useState<number | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [editServiceData, setEditServiceData] = useState<ServiceInterface | null>(null);
    const [refresh, setRefresh] = useState<boolean>(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    useEffect(() => {
        fetchData<ServiceInterface[]>(`${apiPaths.getServiceByVehicleId}/${props.vehicleId}`).then((res) => {
            if (res.responseData) {
                setData(res.responseData);
            }
        });
        fetchData<{ data: string }>(`${apiPaths.getVehicleRegById}/${props.vehicleId}`).then((res) => {
            if (res.responseData) {
                setVehicleReg(res.responseData.data);
            }
        });
        // eslint-disable-next-line
    }, [props.vehicleId, refresh]);

    useEffect(() => {
        if (serviceType === ServiceType.all) {
            setShowData(data);
        } else if (serviceType === ServiceType.service) {
            setShowData(data.filter(service => service.type === serviceTypeEnum.service));
        } else if (serviceType === ServiceType.maintenance) {
            setShowData(data.filter(service => service.type === serviceTypeEnum.maintenance));
        } else {
            setShowData([]);
        }

        // eslint-disable-next-line
    }, [data, serviceType]);

    const handleClose = (): void => {
        props.setVehicleId(null);
    }

    useLayoutEffect(() => {
        ref.current?.scrollIntoView({behavior: 'smooth', block: 'start'});
        // eslint-disable-next-line
    }, [ref.current, props.vehicleId]);

    return (
        <>
            <FormControl>
                <InputLabel id="serviceType"
                            className="TextInput__Label">{vehicles[props.lang].serviceType}</InputLabel>
                <Select
                    label={vehicles[props.lang].serviceType}
                    id="serviceType"
                    value={serviceType}
                    onChange={(e) => {
                        setServiceType(Number(e.target.value));
                    }}
                    inputProps={{className: 'TextInput'}}
                    size='small'
                >
                    <MenuItem value={ServiceType.all}>{vehicles[props.lang].serviceAll}</MenuItem>
                    <MenuItem value={ServiceType.maintenance}>{vehicles[props.lang].serviceMaintenance}</MenuItem>
                    <MenuItem value={ServiceType.service}>{vehicles[props.lang].serviceService}</MenuItem>
                </Select>
            </FormControl>
            <main className="Table" ref={ref}>
                <section className="Table__Header">
                    <>
                        {vehicles[props.lang].serviceHeader(vehicleReg)}
                        &nbsp;&nbsp;
                        <Tooltip title={vehicles[props.lang].close} arrow>
                            <NavLink to='' className='CloseLink' onClick={() => handleClose()}>
                                <ClearIcon sx={{mr: 1}}/>
                            </NavLink>
                        </Tooltip>
                    </>
                </section>
                <section className="Table__Body">
                    <table>
                        <thead>
                        <tr>
                            <th>{vehicles[props.lang].thLp}</th>
                            <th>{vehicles[props.lang].serviceType}</th>
                            <th>{vehicles[props.lang].serviceDate}</th>
                            <th>{vehicles[props.lang].servicePlace}</th>
                            <th>{vehicles[props.lang].serviceAction}</th>
                            <th>{vehicles[props.lang].serviceOdometer}</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {editServiceData && <ServiceEdit
                        service={editServiceData}
                        setService={setEditServiceData}
                        lang={props.lang}
                        setRefresh={setRefresh}
                        />}
                        {showData.map((service, index) => {
                            index++;
                            return (
                                <React.Fragment key={service.id}>
                                    {expandedRow !== service.id && (
                                        <tr onClick={() => setExpandedRow(service.id)}>
                                            <td>{index}</td>
                                            <td>
                                                {service.type === serviceTypeEnum.service && vehicles[props.lang].serviceService}
                                                {service.type === serviceTypeEnum.maintenance && vehicles[props.lang].serviceMaintenance}
                                            </td>
                                            <td>
                                                {service.logData && formatShortDate(service.logData.date)}
                                            </td>
                                            <td>
                                                {service.logData && formatSimplePlace(service.logData.place, service.logData.placeData)}
                                            </td>
                                            <td>{service.entry}</td>
                                            <td>{service.logData && formatOdometer(service.logData.odometer, true)}</td>
                                            <td>{service.logData && service.logData.notes !== null &&
                                                <DetailsIcon/>}</td>
                                        </tr>)
                                    }
                                    {expandedRow === service.id && (
                                        <>
                                            <tr
                                                onClick={() => setExpandedRow(null)}
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}
                                                className={isHovered ? 'highlighted' : ''}
                                            >
                                                <td>{index}</td>
                                                <td>
                                                    {service.type === serviceTypeEnum.service && vehicles[props.lang].serviceService}
                                                    {service.type === serviceTypeEnum.maintenance && vehicles[props.lang].serviceMaintenance}
                                                </td>
                                                <td>
                                                    {service.logData && formatDate(service.logData.date, props.lang)}
                                                </td>
                                                <td>
                                                    {service.logData && formatPlace(service.logData.place, service.logData.placeData, props.lang)}
                                                </td>
                                                <td>{service.entry}</td>
                                                <td>{service.logData && formatOdometer(service.logData.odometer, true)}</td>
                                                <td></td>
                                            </tr>
                                            <tr></tr>
                                            <tr
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}
                                                className={isHovered ? 'highlighted' : ''}
                                            >
                                                <td colSpan={7} className='extended'>
                                                    {service.logData && service.logData.notes !== null &&
                                                        <>
                                                            <DetailsIcon/><br/>
                                                        <div dangerouslySetInnerHTML={{ __html: formatText(service.logData.notes) }} />
                                                        </>
                                                    }
                                                    <br/>
                                                    <div>
                                                        <Fab
                                                            variant="extended"
                                                            size="small"
                                                            color="primary"
                                                            onClick={() => setEditServiceData(service)}
                                                        >
                                                            <EditIcon sx={{mr: 1}}/>
                                                            {vehicles[props.lang].edit}
                                                        </Fab>
                                                    </div>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                    }
                                </React.Fragment>
                            );
                        })}
                        </tbody>
                    </table>
                </section>
            </main>
        </>
    );
}
