import React, {useState} from "react";
import {AppMainElementsTypes} from "../types/AppMainElementsTypes";
import {MenuLabelTypes} from "../types/MenuLabelTypes";
import {AddVehicle} from "../components/vehicles/AddVehicle";
import {TrailersList} from "../components/vehicles/TrailersList";
import {TrucksList} from "../components/vehicles/TrucksList";
import {Fab} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {TourInterface} from "types";
import {CompanySelect} from "../components/common/form/place/CompanySelect";
import {TableTabs} from "../components/common/TableTabs";
import {vehicles} from "../assets/txt/vehicles";

interface Props extends AppMainElementsTypes {
    page: keyof MenuLabelTypes;
    tourData: TourInterface | null,
}

export const VehiclesView = (props: Props) => {
    const [refresh, setRefresh] = React.useState<boolean>(false);
    const [showAddVehicle, setShowAddVehicle] = useState<boolean>(false);
    const [companyId, setCompanyId] = useState<string | null>(props.userData ? props.userData.companyId.toString() : null);
    const [tab, setTab] = useState<"trucks" | "trailers">("trucks");
    const autoSwitchedRef = React.useRef<boolean>(false);
    const handleWrongType = (target: "trucks" | "trailers") => {
        if (autoSwitchedRef.current) return;
        autoSwitchedRef.current = true;
        setTab(target);
    };

    if (props.userData && props.setUserData) {
        const txt = vehicles[props.userData.lang];
        return (
            <>
                <div className="TableView__toolbar">
                    {!showAddVehicle &&
                        <Fab onClick={() => setShowAddVehicle(true)} color="primary" aria-label="add" size="medium"><AddIcon/></Fab>
                    }
                    <CompanySelect lang={props.userData.lang} value={companyId ? companyId.toString() : '0'}
                                   onChange={e => setCompanyId(e)}/>
                </div>

                <AddVehicle userData={props.userData} setRefresh={setRefresh} show={showAddVehicle} setShow={setShowAddVehicle}/>

                <TableTabs
                    active={tab}
                    onChange={(k) => setTab(k as "trucks" | "trailers")}
                    tabs={[
                        {key: "trucks", label: txt.trucksTableHeader},
                        {key: "trailers", label: txt.trailersTableHeader},
                    ]}
                />

                {tab === "trucks"
                    ? <TrucksList userData={props.userData} refresh={refresh} setUserData={props.setUserData}
                                  setRefresh={setRefresh} tourData={props.tourData} companyId={Number(companyId)}
                                  onWrongType={() => handleWrongType("trailers")}/>
                    : <TrailersList userData={props.userData} refresh={refresh} setUserData={props.setUserData}
                                    setRefresh={setRefresh} tourData={props.tourData} companyId={Number(companyId)}
                                    onWrongType={() => handleWrongType("trucks")}/>}
            </>
        );
    }
    return <></>;
}
