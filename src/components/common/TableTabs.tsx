import React from "react";

interface Tab {
    key: string;
    label: React.ReactNode;
}

interface Props {
    tabs: Tab[];
    active: string;
    onChange: (key: string) => void;
}

// Pasek zakładek nad tabelą – dla widoków z kilkoma tabelami (/vehicles, /tours).
export const TableTabs = (props: Props) => (
    <div className="TableTabs">
        {props.tabs.map((tab) => (
            <button
                key={tab.key}
                type="button"
                className={"TableTabs__tab" + (tab.key === props.active ? " TableTabs__tab--active" : "")}
                onClick={() => props.onChange(tab.key)}
            >
                {tab.label}
            </button>
        ))}
    </div>
);
