import React from "react";
import { UserInterface } from "types";

interface Props {
    userData: UserInterface;
}

export const VehicleManagement = (props: Props) => {
return <>{props.userData.email}</>
}