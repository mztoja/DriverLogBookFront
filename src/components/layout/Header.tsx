import React, {Dispatch, SetStateAction} from "react";
import "./Header.css";
import {NavLink, useLocation} from "react-router-dom";
import {AppBar, Box, Toolbar, Tooltip, useMediaQuery} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PaymentsIcon from "@mui/icons-material/Payments";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import RouteIcon from "@mui/icons-material/Route";
import PlaceIcon from "@mui/icons-material/Place";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {SvgIconComponent} from "@mui/icons-material";
import {UserInterface, userLangEnum} from "types";
import {MenuLabelTypes} from "../../types/MenuLabelTypes";
import {labels} from "../../assets/txt/menuLabels";
import {commons} from "../../assets/txt/commons";
import {login} from "../../assets/txt/login";
import {LogoutLink} from "../auth/LogoutLink";
import {routeLabelKey} from "../../hooks/useDocumentTitle";

interface Props {
    className?: string;
    lang: userLangEnum;
    userData: UserInterface;
    setUserData: Dispatch<SetStateAction<UserInterface | null>>;
}

const NAV: { key: keyof MenuLabelTypes; url: string; Icon: SvgIconComponent }[] = [
    {key: "home", url: "/", Icon: HomeIcon},
    {key: "logs", url: "/logs", Icon: AssignmentIcon},
    {key: "days", url: "/days", Icon: CalendarMonthIcon},
    {key: "finances", url: "/finances", Icon: PaymentsIcon},
    {key: "loadings", url: "/loadings", Icon: Inventory2Icon},
    {key: "tours", url: "/tours", Icon: RouteIcon},
    {key: "places", url: "/places", Icon: PlaceIcon},
];

export const Header = (props: Props) => {
    const txt = labels[props.lang];
    const location = useLocation();
    const pageName = txt[routeLabelKey(location.pathname)];
    const wide = useMediaQuery('(min-width:960px)'); // ≥960px: nawigacja na środku z etykietami; poniżej: same ikony w grupie po prawej

    // Tooltip MUSI być WEWNĄTRZ NavLink – wrapping NavLink w Tooltip gubi funkcyjny className
    // (MUI robi clsx(other.className, children.props.className), a clsx ignoruje funkcję).
    const navLinks = NAV.map(({key, url, Icon}) => (
        <NavLink key={url} to={url} end={url === "/"}
                 className={({isActive}) =>
                     "AppHeader__link" + (isActive ? " AppHeader__link--active" : "")}>
            <Tooltip title={txt[key]} arrow>
                <span className="AppHeader__linkBody">
                    <Icon className="AppHeader__linkIcon"/>
                    <span className="AppHeader__linkText">{txt[key]}</span>
                </span>
            </Tooltip>
        </NavLink>
    ));

    const actionLinks = (
        <>
            <NavLink to="/vehicles"
                     className={({isActive}) => isActive ? "Link__Active" : "Link"}>
                <Tooltip title={login[props.lang].vehicles} arrow>
                    <span className="AppHeader__actionIcon"><LocalShippingIcon/></span>
                </Tooltip>
            </NavLink>
            <NavLink to="/profile"
                     className={({isActive}) => isActive ? "Link__Active" : "Link"}>
                <Tooltip title={login[props.lang].profile} arrow>
                    <span className="AppHeader__actionIcon"><AccountCircleIcon/></span>
                </Tooltip>
            </NavLink>
            <LogoutLink lang={props.lang} setUserData={props.setUserData}/>
        </>
    );

    return (
        <AppBar position="static" elevation={2} className={`AppHeader ${props.className ?? ""}`}>
            <Toolbar className="AppHeader__toolbar" disableGutters>
                <div className="AppHeader__brand">
                    <NavLink to="/" end className="AppHeader__brandTitle">{commons[props.lang].title}</NavLink>
                    <span className="AppHeader__brandPage">- {pageName}</span>
                </div>

                <Box className="AppHeader__nav">{wide && navLinks}</Box>

                <Box className="AppHeader__actions">
                    {!wide && navLinks}
                    {actionLinks}
                </Box>
            </Toolbar>
        </AppBar>
    );
};
