import React from "react";
import './TimeArcGauge.css';

interface Props {
    label: string;         // drobny opis pod wartością, np. "Czas pracy dzisiaj"
    seconds: number;       // aktualny upływający czas
    warnSeconds: number;   // próg żółty (ostrzeżenie)
    maxSeconds: number;    // próg czerwony — po przekroczeniu pasek miga
    width?: number;        // szerokość w px, domyślnie 118
}

// Geometria łuku — stały, płytki łuk, policzony raz (kąty zegarowe: 0° = godz. 12,
// rosną zgodnie z ruchem wskazówek zegara). Napis leży wewnątrz łuku (nie pod nim),
// dzięki czemu cały komponent jest niski — tylko tyle, ile potrzeba na sam łuk.
const CX = 100;
const CY = 135.96;
const R = 127.96;
const HALF_ANGLE = 44.7;

const pointOnArc = (angleDeg: number): { x: number; y: number } => {
    const rad = (angleDeg * Math.PI) / 180;
    return {x: CX + R * Math.sin(rad), y: CY - R * Math.cos(rad)};
};

const START = pointOnArc(-HALF_ANGLE);
const END = pointOnArc(HALF_ANGLE);
const ARC_PATH = `M ${START.x} ${START.y} A ${R} ${R} 0 0 1 ${END.x} ${END.y}`;

const formatHm = (totalSeconds: number): string => {
    const safeSeconds = Math.max(0, Math.round(totalSeconds));
    const hours = Math.floor(safeSeconds / 3600);
    const minutes = Math.floor((safeSeconds % 3600) / 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

export const TimeArcGauge = (props: Props) => {
    const maxSeconds = props.maxSeconds > 0 ? props.maxSeconds : 1;
    const percent = Math.min(Math.max(props.seconds, 0) / maxSeconds, 1);
    const tier: 'ok' | 'warn' | 'over' =
        props.seconds >= props.maxSeconds ? 'over' : props.seconds >= props.warnSeconds ? 'warn' : 'ok';

    return (
        <div className="TimeArcGauge" style={{width: props.width ?? 118}}>
            <svg viewBox="0 0 200 52" preserveAspectRatio="none" className="TimeArcGauge__svg">
                <path d={ARC_PATH} pathLength={100} className="TimeArcGauge__track"/>
                <g className={tier === 'over' ? 'TimeArcGauge__blink' : undefined}>
                    <path
                        d={ARC_PATH}
                        pathLength={100}
                        strokeDasharray="100"
                        strokeDashoffset={100 * (1 - percent)}
                        className={`TimeArcGauge__fill TimeArcGauge__fill--${tier}`}
                    />
                    <text x="100" y="40" textAnchor="middle" className={`TimeArcGauge__value TimeArcGauge__value--${tier}`}>
                        {formatHm(props.seconds)}
                    </text>
                </g>
                <text x="100" y="48" textAnchor="middle" className="TimeArcGauge__label">
                    {props.label}
                </text>
            </svg>
        </div>
    );
};
