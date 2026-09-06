import React from "react";
import {CircularProgress} from "@mui/material";
import "./ActionButton.css";

type Variant = "default" | "accent" | "danger";

interface Props {
    children?: React.ReactNode;
    icon?: React.ReactNode;
    iconRight?: boolean;  // ikona po prawej stronie etykiety
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    variant?: Variant;
    round?: boolean;      // wariant „tylko ikona", okrągły
    large?: boolean;      // większy – główna akcja formularza
    loading?: boolean;    // spinner + disabled
    disabled?: boolean;
    type?: "button" | "submit";
    ariaLabel?: string;
    title?: string;
    className?: string;
}

// Wspólny, lekki przycisk akcji (zastępuje MUI <Fab>).
export const ActionButton = React.forwardRef<HTMLButtonElement, Props>((props, ref) => {
    const {
        children, icon, iconRight = false, onClick, variant = "default", round = false,
        large = false, loading = false, disabled = false, type = "button", ariaLabel, title, className,
    } = props;

    const label = !round && children != null && children !== false
        ? <span>{children}</span>
        : null;
    const mark = loading
        ? <CircularProgress size={round ? 20 : 16} color="inherit"/>
        : icon;

    const classes = [
        "ActionBtn",
        variant !== "default" ? `ActionBtn--${variant}` : "",
        round ? "ActionBtn--round" : "",
        large ? "ActionBtn--large" : "",
        className ?? "",
    ].filter(Boolean).join(" ");

    return (
        <button
            ref={ref}
            type={type}
            className={classes}
            onClick={onClick}
            disabled={disabled || loading}
            aria-label={ariaLabel}
            title={title}
        >
            {iconRight
                ? <>{label}{mark}</>
                : <>{mark}{label}</>}
        </button>
    );
});

ActionButton.displayName = "ActionButton";
