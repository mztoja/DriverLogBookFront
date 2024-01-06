import React from "react";
import {AppMainElementsTypes} from "../types/AppMainElementsTypes";
import {MenuLabelTypes} from "../types/MenuLabelTypes";
import {TopBar} from "../components/bars/TopBar/TopBar";
import {Content} from "../components/bars/Content/Content";
import {AddVehicle} from "../components/vehicles/AddVehicle";
import {TrailersList} from "../components/vehicles/TrailersList";
import {TrucksList} from "../components/vehicles/TrucksList";

interface Props extends AppMainElementsTypes {
    page: keyof MenuLabelTypes;
}

export const VehiclesView = (props: Props) => {
    const [refresh, setRefresh] = React.useState<boolean>(false);
    if (props.userData && props.setUserData) {
        return (
            <>
                <TopBar page={props.page} lang={props.userData.lang} userData={props.userData} setUserData={props.setUserData}/>
                <Content>
                    <AddVehicle userData={props.userData} setRefresh={setRefresh}/>
                    <TrucksList userData={props.userData} refresh={refresh} setUserData={props.setUserData} setRefresh={setRefresh}/>
                    <br/>
                    <TrailersList userData={props.userData} refresh={refresh} setUserData={props.setUserData} setRefresh={setRefresh}/>
                </Content>
            </>
        );
    }
    return <></>;
}