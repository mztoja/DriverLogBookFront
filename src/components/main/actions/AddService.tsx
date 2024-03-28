import React, {FormEvent} from "react";
import {ActionsPropsTypes} from "../../../types/ActionsPropsTypes";
import {useApi} from "../../../hooks/useApi";
import {useAlert} from "../../../hooks/useAlert";
import {CircularProgress} from "@mui/material";
import {home} from "../../../assets/txt/home";
import {DateTimeInput} from "../../common/form/DateTimeInput";
import {OdometerInput} from "../../common/form/OdometerInput";
import {PlaceInput} from "../../common/form/PlaceInput";
import {TextArea} from "../../common/form/TextArea";
import {places} from "../../../assets/txt/places";
import {SubmitButton} from "../../common/form/SubmitButton";
import {Link} from "react-router-dom";
import { AddServiceData, vehicleTypeEnum, ServiceEnum, serviceTypeEnum } from "types";
import {apiPaths} from "../../../config/api";
import {VehicleServiceTypeSelect} from "../../common/form/vehicles/VehicleServiceTypeSelect";
import {VehicleTypeSelect} from "../../common/form/vehicles/VehicleTypeSelect";
import {VehicleRegistrationSelect} from "../../common/form/vehicles/VehicleRegistrationSelect";
import {VehicleServiceEntry} from "../../common/form/vehicles/VehicleServiceEntry";

interface Props extends ActionsPropsTypes {
    serviceType: ServiceEnum;
}

export const AddService = (props: Props) => {

    const {loading, fetchData} = useApi();
    const {setAlert} = useAlert();

    const sendService = async (e: FormEvent) => {
        e.preventDefault();
        const sendData: AddServiceData = {
            date: props.formData.date,
            country: props.formData.country,
            place: props.formData.place,
            placeId: props.formData.placeId,
            odometer: props.formData.serviceVehicleType === vehicleTypeEnum.truck.toString() ? props.formData.odometer : '0',
            notes: props.formData.notes,
            action: home[props.lang].addServiceAction,
            serviceVehicleId: props.formData.serviceVehicleId,
            serviceType: props.serviceType === ServiceEnum.fifthWheelLube
                ? serviceTypeEnum.maintenance.toString()
                : props.formData.serviceType,
            serviceEntry: props.serviceType === ServiceEnum.fifthWheelLube
                ? home[props.lang].addLubrication
                : props.formData.serviceEntry,
        }
        fetchData(apiPaths.createService, {method: 'POST', sendData}, {setAlert, lang: props.lang})
            .then((res) => {
                if (res.success) {
                    setAlert(home[props.lang].addServiceSuccess, 'success');
                    props.setActivityForm(null);
                    props.setRefresh((prev => !prev));
                }
            });
    }

    return (
        <fieldset>
            <Link to="" className="Link" onClick={() => props.setActivityForm(null)}>{home[props.lang].back}</Link><br/><br/>
            <legend>{home[props.lang].addService}</legend>
            <form onSubmit={sendService}>
                <div><DateTimeInput
                    lang={props.lang}
                    value={props.formData.date}
                    onChange={e => props.updateFormData('date', e)}
                />
                </div>
                {props.serviceType === ServiceEnum.standard &&
                    <>
                        <br/>
                        <div>
                            <VehicleServiceTypeSelect
                                lang={props.userData.lang}
                                value={props.formData.serviceType}
                                onChange={e => props.updateFormData('serviceType', e)}
                            />
                        </div>
                        <br/>
                        <div>
                            <VehicleTypeSelect
                                lang={props.userData.lang}
                                value={props.formData.serviceVehicleType}
                                onChange={e => props.updateFormData('serviceVehicleType', e)}
                            />
                        </div>
                    </>
                }
                <br/>
                <div>
                    <VehicleRegistrationSelect
                        companyId={props.userData.companyId}
                        vehicleType={props.serviceType === ServiceEnum.fifthWheelLube
                            ? vehicleTypeEnum.truck
                            : Number(props.formData.serviceVehicleType)}
                        lang={props.userData.lang}
                        value={props.formData.serviceVehicleId}
                        onChange={e => props.updateFormData('serviceVehicleId', e)}
                    />
                </div>
                <br/>
                {props.formData.serviceVehicleType === vehicleTypeEnum.truck.toString() &&
                <>
                    <div><OdometerInput
                        lang={props.lang}
                        value={props.formData.odometer}
                        onChange={e => props.updateFormData('odometer', e)}
                    />
                    </div>
                    <br/>
                </>
                }
                <div><PlaceInput
                    lang={props.lang}
                    defaultCountry={props.userData.country}
                    countryValue={props.formData.country}
                    countryOnChange={e => props.updateFormData('country', e)}
                    placeValue={props.formData.place}
                    placeOnChange={e => props.updateFormData('place', e)}
                    placeIdValue={props.formData.placeId}
                    placeIdOnChange={e => props.updateFormData('placeId', e)}
                />
                </div>
                <br/>
                <div>
                    <VehicleServiceEntry
                        lang={props.userData.lang}
                        value={props.serviceType === ServiceEnum.fifthWheelLube
                            ? home[props.lang].addLubrication
                            : props.formData.serviceEntry}
                        onChange={e => props.updateFormData('serviceEntry', e)}
                        disabled={props.serviceType !== ServiceEnum.standard}
                    />
                </div>
                <br/>
                <div><TextArea label={places[props.lang].description} value={props.formData.notes}
                               onChange={e => props.updateFormData('notes', e.target.value)}/></div>
                <br/>
                {loading ?
                    <CircularProgress/> :
                    <SubmitButton text={home[props.lang].addService}/>
                }
            </form>
            <br/>
            <Link to="" className="Link" onClick={() => props.setActivityForm(null)}>{home[props.lang].back}</Link>
        </fieldset>
    );
}