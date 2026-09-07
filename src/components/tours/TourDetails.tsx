import {TourInterface, TourSettleGeneratorInterface, userLangEnum} from "types";
import React, {useEffect, useState} from "react";
import {apiPaths} from "../../config/api";
import {tours} from "../../assets/txt/tours";
import {home} from "../../assets/txt/home";
import {useAlert} from "../../hooks/useAlert";
import {useApi} from "../../hooks/useApi";
import {CircularProgress} from "@mui/material";
import {formatDate} from "../../utils/formats/formatDate";
import {formatTimeToTime} from "../../utils/formats/formatTimeToTime";
import {formatFuelQuantity} from "../../utils/formats/formatFuelQuantity";
import {formatFuelCombustion} from "../../utils/formats/formatFuelCombustion";
import {formatWeight} from "../../utils/formats/formatWeight";
import {formatOdometer} from "../../utils/formats/formatOdometer";
import {formatAmount} from "../../utils/formats/formatAmount";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import ListIcon from '@mui/icons-material/List';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {LogsList} from "../logs/LogsList";
import {DaysList} from "../days/DaysList";
import {FinancesList} from "../finances/FinancesList";
import {LoadingsList} from "../loadings/LoadingsList";
import { TourGeneratorSettings } from "./TourGeneratorSettings";
import { ActionButton } from "../common/ActionButton";
import "./TourDetails.css";

type OpenList = 'logs' | 'days' | 'finances' | 'loadings' | null;

interface Props {
    lang: userLangEnum;
    tourId: number | null;
    tourGenerator: string;
    onBack: () => void;
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

export const TourDetails = (props: Props) => {
    const {setAlert} = useAlert();
    const {loading, fetchDataOld, fetchData} = useApi();
    const [data, setData] = useState<TourInterface | null>(null);
    const [generatorLoading, setGeneratorLoading] = useState<boolean>(false);
    const [openList, setOpenList] = useState<OpenList>(null);
    const [showGeneratorSettings, setShowGeneratorSettings] = useState<boolean>(false);
    const [generatorData, setGeneratorData] = useState<TourSettleGeneratorInterface | null>(null);

    useEffect(() => {
        if (props.tourId) {
            (async () => {
                const result = await fetchDataOld(apiPaths.getRouteById + '/' + props.tourId, 'GET');
                if ((result && result.responseData) && (!result.responseData.dtc)) {
                    setData(result.responseData);
                } else {
                    setAlert(tours[props.lang].apiError3, 'error');
                }
            })();
        } else {
            setData(null);
        }
        setOpenList(null);
        window.scrollTo({top: 0, behavior: 'smooth'});
        // eslint-disable-next-line
    }, [props.tourId]);

    const handleGeneratorButton = () => {
        setGeneratorLoading(true);

        fetchData<TourSettleGeneratorInterface>(`${apiPaths.generateSettlementRoute}/${props.tourId}`).then((res) => {
            if (res.responseData) {
                setGeneratorData(res.responseData);
                setShowGeneratorSettings(true);
            } else {
                setAlert(tours[props.lang].generateError, 'error');
            }
        }).finally(() => setGeneratorLoading(false));
    }

    if ((loading && !generatorLoading) || !data) {
        return <><br/><CircularProgress/><br/></>
    }

    // Otwarta lista – widok „na całą stronę" (przejmuje panel treści).
    if (openList && props.tourId) {
        const close = () => setOpenList(null);
        return (
            <div className="TableView">
                {openList === 'logs' &&
                    <LogsList lang={props.lang} tourId={props.tourId} setShowLogList={close}/>}
                {openList === 'days' &&
                    <DaysList lang={props.lang} tourId={props.tourId} setShowDayList={close}/>}
                {openList === 'finances' &&
                    <FinancesList lang={props.lang} tourId={props.tourId} setShowFinancesList={close}/>}
                {openList === 'loadings' &&
                    <LoadingsList lang={props.lang} tourId={props.tourId} setShowLoadingsList={close}/>}
            </div>
        );
    }

    const hasRealSalary = Number(data.salary) > 0;
    const salaryShown = hasRealSalary ? Number(data.salary) : Number(data.expectedSalary);

    return (
        <>
            <section className="TourDetails">
                <div className="TourDetails__back">
                    <ActionButton icon={<ArrowBackIcon/>} onClick={props.onBack}>
                        {home[props.lang].back}
                    </ActionButton>
                </div>

                <header className="TourDetails__head">
                    <div className="TourDetails__title">
                        <span className="TourDetails__tourNr">{tours[props.lang].tour} {data.tourNr}</span>
                        <span className="TourDetails__dates">
                            {data.startLogData ? formatDate(data.startLogData.date, props.lang) : tours[props.lang].na}
                            {' → '}
                            {data.stopLogData ? formatDate(data.stopLogData.date, props.lang) : tours[props.lang].na}
                        </span>
                    </div>
                    <div className="TourDetails__truck">{tours[props.lang].truck}: <strong>{data.truck}</strong></div>
                </header>

                <div className="TourDetails__kpis">
                    <Kpi label={tours[props.lang].distance} value={formatOdometer(data.distance)}/>
                    <Kpi label={tours[props.lang].fuelUsage} value={formatFuelCombustion(Number(data.burnedFuelReal), data.distance)}/>
                    <Kpi
                        label={hasRealSalary ? tours[props.lang].salary : `${tours[props.lang].salary} (${tours[props.lang].predicted})`}
                        value={formatAmount(salaryShown, data.currency)}
                    />
                    <Kpi label={tours[props.lang].outgoings} value={formatAmount(Number(data.outgoings), data.currency)}/>
                </div>

                <div className="TourDetails__grid">
                    <Panel title={tours[props.lang].sectionTime}>
                        <Row label={tours[props.lang].driveTime} value={formatTimeToTime(data.driveTime)}/>
                        <Row label={tours[props.lang].workTime} value={formatTimeToTime(data.workTime)}/>
                        <Row
                            label={`${tours[props.lang].onDuty} / ${tours[props.lang].offDuty}`}
                            value={`${data.daysOnDuty} / ${data.daysOffDuty} (${Number(data.daysOnDuty) + Number(data.daysOffDuty)})`}
                        />
                    </Panel>

                    <Panel title={tours[props.lang].sectionFuel}>
                        <Row label={`${tours[props.lang].fuel} ${tours[props.lang].before}`} value={formatFuelQuantity(data.fuelStateBefore, 'integer')}/>
                        <Row label={`${tours[props.lang].fuel} ${tours[props.lang].after}`} value={formatFuelQuantity(data.fuelStateAfter, 'integer')}/>
                        <Row label={`${tours[props.lang].burned} (${tours[props.lang].boardComputer})`} value={formatFuelQuantity(data.burnedFuelComp, 'integer')}/>
                        <Row label={`${tours[props.lang].burned} (${tours[props.lang].real})`} value={formatFuelQuantity(data.burnedFuelReal, 'integer')}/>
                        <Row label={tours[props.lang].refueled} value={formatFuelQuantity(data.totalRefuel, 'twoDecimals')}/>
                        <Row label={tours[props.lang].fuelUsage} value={formatFuelCombustion(Number(data.burnedFuelReal), data.distance)}/>
                    </Panel>

                    <Panel title={tours[props.lang].sectionLoads}>
                        <Row label={tours[props.lang].averageLoadWeight} value={formatWeight(data.avgWeight)}/>
                        <Row label={tours[props.lang].numberOfLoads} value={data.numberOfLoads}/>
                        <Row label={tours[props.lang].distance} value={formatOdometer(data.distance)}/>
                    </Panel>

                    <Panel title={tours[props.lang].sectionSalary}>
                        <Row label={`${tours[props.lang].salary} (${tours[props.lang].predicted})`} value={formatAmount(Number(data.expectedSalary), data.currency)}/>
                        <Row label={`${tours[props.lang].salary} (${tours[props.lang].real})`} value={formatAmount(Number(data.salary), data.currency)}/>
                        <Row
                            label={`${tours[props.lang].rate} (${tours[props.lang].perKm})`}
                            value={data.salary > 0
                                ? formatAmount(Number(data.salary) / Number(data.distance), data.currency)
                                : tours[props.lang].na}
                        />
                        <Row
                            label={`${tours[props.lang].rate} (${tours[props.lang].perHour})`}
                            value={data.salary > 0
                                ? formatAmount(Number(data.salary) / (Number(data.workTime.split(":")[0]) + (Number(data.workTime.split(":")[1]) / 60)), data.currency)
                                : tours[props.lang].na}
                        />
                        <Row
                            label={`${tours[props.lang].rate} (${tours[props.lang].perDay})`}
                            value={data.salary > 0
                                ? formatAmount(Number(data.salary) / (Number(data.daysOnDuty) + Number(data.daysOffDuty)), data.currency)
                                : tours[props.lang].na}
                        />
                        <Row label={tours[props.lang].outgoings} value={formatAmount(Number(data.outgoings), data.currency)}/>
                    </Panel>
                </div>

                <div className="TourDetails__actions">
                    <ActionButton icon={<ListIcon/>} onClick={() => setOpenList('logs')}>
                        {tours[props.lang].showLogs}
                    </ActionButton>
                    <ActionButton icon={<FormatListNumberedIcon/>} onClick={() => setOpenList('days')}>
                        {tours[props.lang].showDays}
                    </ActionButton>
                    <ActionButton icon={<PaymentIcon/>} onClick={() => setOpenList('finances')}>
                        {tours[props.lang].showFinances}
                    </ActionButton>
                    <ActionButton icon={<LocalShippingIcon/>} onClick={() => setOpenList('loadings')}>
                        {tours[props.lang].showLoads}
                    </ActionButton>
                    <ActionButton
                        variant="accent"
                        icon={<AutoAwesomeIcon/>}
                        loading={generatorLoading}
                        onClick={() => handleGeneratorButton()}
                    >
                        {tours[props.lang].generate}
                    </ActionButton>
                </div>
            </section>
            {showGeneratorSettings && generatorData &&
                <TourGeneratorSettings
                    data={generatorData}
                    lang={props.lang}
                    open={showGeneratorSettings}
                    setOpen={setShowGeneratorSettings}
                    setData={setGeneratorData}
                    tourGenerator={props.tourGenerator}
                />
            }
        </>
    );
}
