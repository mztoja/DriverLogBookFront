import React from "react";
import {AppMainElementsTypes} from "../types/AppMainElementsTypes";
import {MenuLabelTypes} from "../types/MenuLabelTypes";
import {TopBar} from "../components/bars/TopBar/TopBar";
import {Content} from "../components/bars/Content/Content";
import {AddVehicle} from "../components/vehicles/AddVehicle";

interface Props extends AppMainElementsTypes {
    page: keyof MenuLabelTypes;
}

export const VehiclesView = (props: Props) => {
    if (props.userData && props.setUserData) {
        return (
            <>
                <TopBar page={props.page} lang={props.userData.lang} userData={props.userData} setUserData={props.setUserData}/>
                <Content>
                    <AddVehicle userData={props.userData}/>
                </Content>
            </>
        );
    }
    return <></>;
}