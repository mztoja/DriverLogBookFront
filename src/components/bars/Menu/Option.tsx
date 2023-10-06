import React from "react";
import { NavLink } from "react-router-dom";
import "./Menu.css";

interface Props {
    name: string;
    url: string;
}

export const Option = (props: Props) => {
    return (
        <div className="Menu__Option">
            <NavLink
                to={props.url}
                className={({ isActive}) => isActive ? "Menu__ActiveOption" : ""}>
                {props.name}
            </NavLink>
        </div>
    );
}


