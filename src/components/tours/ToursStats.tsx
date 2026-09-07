import React, {useEffect, useMemo, useState} from "react";
import {TourStatsBucket, TourStatsInterface, userLangEnum} from "types";
import {apiPaths} from "../../config/api";
import {tours} from "../../assets/txt/tours";
import {useApi} from "../../hooks/useApi";
import {useAlert} from "../../hooks/useAlert";
import {CircularProgress} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {formatOdometer} from "../../utils/formats/formatOdometer";
import {formatAmount} from "../../utils/formats/formatAmount";
import {formatWeight} from "../../utils/formats/formatWeight";
import {formatFuelQuantity} from "../../utils/formats/formatFuelQuantity";
import {formatFuelCombustion} from "../../utils/formats/formatFuelCombustion";
import {formatBigTime} from "../../utils/formats/formatBigTime";
import "./TourDetails.css";
import "./ToursStats.css";

interface Props {
    lang: userLangEnum;
}

const Row = ({label, value}: {label: React.ReactNode; value: React.ReactNode}) => (
    <div className="TourDetails__row">
        <span className="TourDetails__rowLabel">{label}</span>
        <span className="TourDetails__rowValue">{value}</span>
    </div>
);

const Panel = ({title, children}: {title: React.ReactNode; children: React.ReactNode}) => (
    <div className="TourDetails__panel">
        <div className="TourDetails__panelTitle">{title}</div>
        {children}
    </div>
);

const Kpi = ({label, value}: {label: React.ReactNode; value: React.ReactNode}) => (
    <div className="TourDetails__kpi">
        <span className="TourDetails__kpiValue">{value}</span>
        <span className="TourDetails__kpiLabel">{label}</span>
    </div>
);

const workHours = (hm: string): number => {
    const [h, m] = hm.split(':');
    return Number(h) + Number(m) / 60;
};

const BucketView = ({b, lang, currency}: {b: TourStatsBucket; lang: userLangEnum; currency: string}) => {
    const t = tours[lang];
    const amount = (v: number) => formatAmount(v, currency);
    const hasSalary = b.salary > 0;
    return (
        <>
            <div className="TourDetails__kpis">
                <Kpi label={t.tours} value={b.toursCount}/>
                <Kpi label={t.distance} value={formatOdometer(b.distance)}/>
                <Kpi label={t.fuelUsage} value={formatFuelCombustion(b.burnedFuelReal, b.distance)}/>
                <Kpi label={hasSalary ? t.salary : `${t.salary} (${t.predicted})`} value={amount(hasSalary ? b.salary : b.expectedSalary)}/>
                <Kpi label={t.outgoings} value={amount(b.outgoings)}/>
            </div>

            <div className="TourDetails__grid">
                <Panel title={t.sectionTime}>
                    <Row label={t.driveTime} value={formatBigTime(b.driveTime)}/>
                    <Row label={t.workTime} value={formatBigTime(b.workTime)}/>
                    <Row
                        label={`${t.onDuty} / ${t.offDuty}`}
                        value={`${b.daysOnDuty} / ${b.daysOffDuty} (${b.daysOnDuty + b.daysOffDuty})`}
                    />
                </Panel>

                <Panel title={t.sectionFuel}>
                    <Row label={`${t.burned} (${t.boardComputer})`} value={formatFuelQuantity(b.burnedFuelComp, 'integer')}/>
                    <Row label={`${t.burned} (${t.real})`} value={formatFuelQuantity(b.burnedFuelReal, 'integer')}/>
                    <Row label={t.refueled} value={formatFuelQuantity(b.totalRefuel, 'twoDecimals')}/>
                    <Row label={t.fuelUsage} value={formatFuelCombustion(b.burnedFuelReal, b.distance)}/>
                </Panel>

                <Panel title={t.sectionLoads}>
                    <Row label={t.numberOfLoads} value={b.numberOfLoads}/>
                    <Row label={t.averageLoadWeight} value={formatWeight(b.avgWeight)}/>
                    <Row label={t.distance} value={formatOdometer(b.distance)}/>
                </Panel>

                <Panel title={t.sectionSalary}>
                    <Row label={`${t.salary} (${t.predicted})`} value={amount(b.expectedSalary)}/>
                    <Row label={`${t.salary} (${t.real})`} value={amount(b.salary)}/>
                    <Row label={`${t.rate} (${t.perKm})`} value={b.salary > 0 && b.distance > 0 ? amount(b.salary / b.distance) : t.na}/>
                    <Row label={`${t.rate} (${t.perHour})`} value={b.salary > 0 && workHours(b.workTime) > 0 ? amount(b.salary / workHours(b.workTime)) : t.na}/>
                    <Row label={`${t.rate} (${t.perDay})`} value={b.salary > 0 && (b.daysOnDuty + b.daysOffDuty) > 0 ? amount(b.salary / (b.daysOnDuty + b.daysOffDuty)) : t.na}/>
                    <Row label={t.outgoings} value={amount(b.outgoings)}/>
                </Panel>
            </div>
        </>
    );
};

export const ToursStats = (props: Props) => {
    const {loading, fetchData} = useApi();
    const {setAlert} = useAlert();
    const t = tours[props.lang];

    const [data, setData] = useState<TourStatsInterface | null>(null);
    const [yearIdx, setYearIdx] = useState<number>(0);

    useEffect(() => {
        fetchData<TourStatsInterface>(apiPaths.getRouteStats).then((res) => {
            if (res.responseData) {
                setData(res.responseData);
            } else {
                setAlert(t.statsApiError, 'error');
            }
        });
        // eslint-disable-next-line
    }, []);

    const year = data?.years[yearIdx] ?? null;

    const chart = useMemo(() => {
        if (!year) return null;
        const maxDist = Math.max(1, ...year.months.map((m) => m.distance));
        const maxSalary = Math.max(1, ...year.months.map((m) => (m.salary > 0 ? m.salary : m.expectedSalary)));
        return year.months.map((m) => ({
            month: m.month,
            distance: m.distance,
            salary: m.salary > 0 ? m.salary : m.expectedSalary,
            distPct: (m.distance / maxDist) * 100,
            salaryPct: ((m.salary > 0 ? m.salary : m.expectedSalary) / maxSalary) * 100,
        }));
    }, [year]);

    if (loading && !data) {
        return <><br/><CircularProgress/><br/></>;
    }

    if (!data || data.years.length === 0 || !year) {
        return <p className="ToursStats__empty">{t.statsNoData}</p>;
    }

    return (
        <div className="ToursStats">
            <div className="ToursStats__yearBar">
                <button
                    type="button"
                    className="ToursStats__yearNav"
                    onClick={() => setYearIdx((i) => i + 1)}
                    disabled={yearIdx >= data.years.length - 1}
                    aria-label={t.statsYearLabel}
                >
                    <NavigateBeforeIcon/>
                </button>
                <span className="ToursStats__year">{year.year}</span>
                <button
                    type="button"
                    className="ToursStats__yearNav"
                    onClick={() => setYearIdx((i) => i - 1)}
                    disabled={yearIdx <= 0}
                    aria-label={t.statsYearLabel}
                >
                    <NavigateNextIcon/>
                </button>
            </div>

            <BucketView b={year} lang={props.lang} currency={data.currency}/>

            {chart &&
                <div className="ToursStats__chart">
                    <div className="ToursStats__chartTitle">{t.statsByMonth}</div>
                    <div className="ToursStats__chartLegend">
                        <span><i className="ToursStats__swatch ToursStats__swatch--dist"/>{t.distance}</span>
                        <span><i className="ToursStats__swatch ToursStats__swatch--salary"/>{t.salary}</span>
                    </div>
                    <div className="ToursStats__bars">
                        {chart.map((c) => (
                            <div className="ToursStats__barGroup" key={c.month}>
                                <div className="ToursStats__barPair">
                                    <span
                                        className="ToursStats__bar ToursStats__bar--dist"
                                        style={{height: `${c.distPct}%`}}
                                        title={`${t.distance}: ${formatOdometer(c.distance)}`}
                                    />
                                    <span
                                        className="ToursStats__bar ToursStats__bar--salary"
                                        style={{height: `${c.salaryPct}%`}}
                                        title={`${t.salary}: ${formatAmount(c.salary, data.currency)}`}
                                    />
                                </div>
                                <span className="ToursStats__barLabel">{t.monthsShort[c.month - 1]}</span>
                            </div>
                        ))}
                    </div>
                </div>
            }

            <div className="ToursStats__total">
                <div className="ToursStats__totalTitle">{t.statsTotalLabel}</div>
                <BucketView b={data.total} lang={props.lang} currency={data.currency}/>
            </div>
        </div>
    );
};
