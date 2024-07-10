import React, {useState} from "react";
import {AppMainElementsTypes} from "../types/AppMainElementsTypes";
import {MenuLabelTypes} from "../types/MenuLabelTypes";
import {TopBar} from "../components/bars/TopBar/TopBar";
import {Content} from "../components/bars/Content/Content";
import {AddVehicle} from "../components/vehicles/AddVehicle";
import {TrailersList} from "../components/vehicles/TrailersList";
import {TrucksList} from "../components/vehicles/TrucksList";
import {Fab} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { TourInterface } from "types";
import {CompanySelect} from "../components/common/form/place/CompanySelect";

interface Props extends AppMainElementsTypes {
    page: keyof MenuLabelTypes;
    tourData: TourInterface | null,
}

export const VehiclesView = (props: Props) => {
    const [refresh, setRefresh] = React.useState<boolean>(false);
    const [showAddVehicle, setShowAddVehicle] = useState<boolean>(false);
    const [companyId, setCompanyId] = useState<string | null>(props.userData? props.userData.companyId.toString() : null);
    if (props.userData && props.setUserData) {
        return (
            <>
                <TopBar page={props.page} lang={props.userData.lang} userData={props.userData} setUserData={props.setUserData}/>
                <Content>
                    <div>
                        {!showAddVehicle &&
                            <Fab  onClick={() => setShowAddVehicle(true)} color="primary" aria-label="add"><AddIcon /></Fab>
                        }
                    </div>

                    <br/>

                    <AddVehicle userData={props.userData} setRefresh={setRefresh} show={showAddVehicle} setShow={setShowAddVehicle}/>

                    <div>
                        <CompanySelect lang={props.userData.lang} value={companyId? companyId.toString() : '0'}
                                       onChange={e => setCompanyId(e)}/>
                    </div>

                    <br/>

                    <TrucksList userData={props.userData} refresh={refresh} setUserData={props.setUserData} setRefresh={setRefresh} tourData={props.tourData} companyId={Number(companyId)}/>

                    <br/>

                    <TrailersList userData={props.userData} refresh={refresh} setUserData={props.setUserData} setRefresh={setRefresh} tourData={props.tourData} companyId={Number(companyId)}/>

                </Content>
            </>
        );
    }
    return <></>;
}