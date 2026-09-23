import React from "react";
import {css, styled} from "@mui/system";

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

type Tier = 'ok' | 'warn' | 'over';

export const TimeArcGauge = (props: Props) => {
    const maxSeconds = props.maxSeconds > 0 ? props.maxSeconds : 1;
    const percent = Math.min(Math.max(props.seconds, 0) / maxSeconds, 1);
    const tier: Tier =
        props.seconds >= props.maxSeconds ? 'over' : props.seconds >= props.warnSeconds ? 'warn' : 'ok';

    return (
        <Wrapper style={{width: props.width ?? 118}}>
            <Svg viewBox="0 0 200 52" preserveAspectRatio="none">
                <Track d={ARC_PATH} pathLength={100}/>
                <TierGroup $blinking={tier === 'over'}>
                    <Fill
                        d={ARC_PATH}
                        pathLength={100}
                        strokeDasharray="100"
                        strokeDashoffset={100 * (1 - percent)}
                        $tier={tier}
                    />
                    <Value x="100" y="40" textAnchor="middle" $tier={tier}>
                        {formatHm(props.seconds)}
                    </Value>
                </TierGroup>
                <Label x="100" y="48" textAnchor="middle">
                    {props.label}
                </Label>
            </Svg>
        </Wrapper>
    );
};

const TIER_STROKE: Record<Tier, string> = {ok: '#4caf50', warn: '#ffc107', over: '#f44336'};
const TIER_FILL: Record<Tier, string> = {ok: '#a5d6a7', warn: '#ffe082', over: '#ff8a80'};

const Wrapper = styled('div')`
    float: left;
    margin-right: 0.6rem;
`;

// bez ustalonego aspect-ratio niektóre silniki nie wyliczają wysokości z samego viewBox
// wewnątrz flexa — całość (łuk + napisy) renderowała się wtedy wyśrodkowana w za wysokim,
// "domyślnym" pudełku SVG zamiast dosunięta do faktycznych granic komponentu.
// 118/45 — przy domyślnej szerokości 118px daje ~45px wysokości, czyli dwie linie tekstu
// #InfoBar (font-size 1rem/16px × line-height 1.4 ≈ 22.4px/linię) — wysokość celowo
// trzymana stała przy zmianach szerokości. Razem z preserveAspectRatio="none" treść
// rozciąga się dokładnie do tych proporcji zamiast dopasowywać się (letterbox) do
// wewnętrznego viewBox.
const Svg = styled('svg')`
    width: 100%;
    height: auto;
    aspect-ratio: 118 / 45;
    display: block;
    overflow: visible;
`;

const Track = styled('path')`
    fill: none;
    stroke: #ffffff26;
    stroke-width: 10;
    stroke-linecap: round;
`;

// "łagodnie i rzadko" — wolny, płynny puls, tylko po przekroczeniu progu czerwonego
const blink = css`
    @keyframes TimeArcGauge__blink {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.4;
        }
    }
    animation: TimeArcGauge__blink 2.6s ease-in-out infinite;
`;

const TierGroup = styled('g')<{ $blinking: boolean }>`
    ${({$blinking}) => $blinking ? blink : ''}
`;

const Fill = styled('path')<{ $tier: Tier }>`
    fill: none;
    stroke-width: 10;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.6s ease, stroke 0.4s ease;
    stroke: ${({$tier}) => TIER_STROKE[$tier]};
`;

const Value = styled('text')<{ $tier: Tier }>`
    font-size: 20px;
    font-weight: bold;
    transition: fill 0.4s ease;
    fill: ${({$tier}) => TIER_FILL[$tier]};
`;

const Label = styled('text')`
    fill: #ffffffb0;
    font-size: 10px;
`;
