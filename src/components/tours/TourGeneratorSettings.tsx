import React, {Dispatch, SetStateAction, useState} from 'react';
import {userLangEnum, TourSettleGeneratorInterface, TourSettleGeneratorLeg} from 'types';
import {TextField} from "@mui/material";
import {Modal, ModalContent, StyledBackdrop} from "../common/Modal";
import {ActionButton} from "../common/ActionButton";
import {tours} from "../../assets/txt/tours";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {useAlert} from "../../hooks/useAlert";
import {generateTourSettlement, MAX_LEG_ROWS} from "../../utils/generateTourSettlement";
import '../common/form/Form.css';

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    data: TourSettleGeneratorInterface;
    setData: Dispatch<SetStateAction<TourSettleGeneratorInterface | null>>;
    lang: userLangEnum;
    tourGenerator: string;
}

type Field = keyof Omit<TourSettleGeneratorInterface, 'routes'>;
type Section = 'drivers' | 'tour' | 'refs' | 'fuel' | 'expenses' | 'legs' | 'other';

const EMPTY_LEG: TourSettleGeneratorLeg = {
    startCity: '', startData: '', startOdometer: '',
    borderDate: '', borderPlace: '',
    stopCity: '', stopData: '', stopOdometer: '',
    distance: '', customer: '',
};

const range = (n: number): number[] => Array.from({length: n}, (_, i) => i + 1);

// Generator rozliczenia trasy: wszystko, co trafia do PDF (pola ogólne i odcinki), jest edytowalne
// tutaj, przed wygenerowaniem pliku – bez poprawiania pól w samym PDF. Ten sam układ co w aplikacji
// mobilnej (TourGeneratorModal). Odcinki można przestawiać, usuwać i dodawać.
export const TourGeneratorSettings = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<Section | null>('tour');
    const [openLeg, setOpenLeg] = useState<number | null>(null);
    const {data, setData} = props;
    const {setAlert} = useAlert();
    const txt = tours[props.lang];

    const handleClose = () => props.setOpen(false);

    const setField = (key: Field, value: string): void => {
        setData({...data, [key]: value});
    };

    const legs = data.routes;
    const setLegs = (next: TourSettleGeneratorLeg[]): void => setData({...data, routes: next});
    const setLegField = (i: number, key: keyof TourSettleGeneratorLeg, value: string): void =>
        setLegs(legs.map((leg, idx) => (idx === i ? {...leg, [key]: value} : leg)));

    const moveLeg = (i: number, dir: -1 | 1): void => {
        const j = i + dir;
        if (j < 0 || j >= legs.length) return;
        const next = [...legs];
        [next[i], next[j]] = [next[j], next[i]];
        setLegs(next);
        if (openLeg === i) setOpenLeg(j);
    };
    const removeLeg = (i: number): void => {
        setLegs(legs.filter((_, idx) => idx !== i));
        setOpenLeg(null);
    };
    const addLeg = (): void => {
        if (legs.length >= MAX_LEG_ROWS) return;
        setLegs([...legs, {...EMPTY_LEG}]);
        setOpenLeg(legs.length);
    };

    const handleGeneratorButton = (): void => {
        setLoading(true);
        generateTourSettlement(props.lang, data, props.tourGenerator, setAlert).finally(() => setLoading(false));
    };

    const input = (label: string, value: string, onChange: (v: string) => void, key: string, multiline?: boolean) => (
        <TextField
            key={key}
            label={label}
            InputLabelProps={{className: 'TextInput__Label'}}
            InputProps={{className: 'TextInput'}}
            value={value ?? ''}
            onChange={e => onChange(e.target.value)}
            multiline={multiline}
            minRows={multiline ? 3 : undefined}
            maxRows={multiline ? 8 : undefined}
            fullWidth
            size='small'
        />
    );
    const field = (key: Field, label: string, multiline?: boolean) =>
        input(label, data[key], v => setField(key, v), key, multiline);

    const sectionHead = (id: Section, label: string) => (
        <div className="Generator__sectionHead" onClick={() => setOpen(open === id ? null : id)}>
            <span>{label}</span>
            {open === id ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
        </div>
    );

    const legFields: { key: keyof TourSettleGeneratorLeg; label: string }[] = [
        {key: 'startCity', label: txt.legStartCity},
        {key: 'startData', label: txt.legStartData},
        {key: 'startOdometer', label: txt.legStartOdometer},
        {key: 'borderDate', label: txt.legBorderDate},
        {key: 'borderPlace', label: txt.legBorderPlace},
        {key: 'stopCity', label: txt.legStopCity},
        {key: 'stopData', label: txt.legStopData},
        {key: 'stopOdometer', label: txt.legStopOdometer},
        {key: 'distance', label: txt.legDistance},
        {key: 'customer', label: txt.legCustomer},
    ];

    return (
        <div>
            <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={props.open}
                onClose={handleClose}
                slots={{backdrop: StyledBackdrop}}
            >
                <ModalContent sx={{width: 700}}>
                    <h2 className='center' onClick={handleClose}>{txt.generate}</h2>
                    <p>{txt.generatorHint}</p>

                    {sectionHead('drivers', txt.genSectionDrivers)}
                    {open === 'drivers' && <div className="Generator__grid">
                        {field('name1', txt.genDriver1)}
                        {field('name2', txt.genDriver2)}
                    </div>}

                    {sectionHead('tour', txt.genSectionTour)}
                    {open === 'tour' && <div className="Generator__grid">
                        {field('routeNr', txt.genRouteNr)}
                        {field('destonationCity', txt.genDestination)}
                        {field('truck', txt.genTruck)}
                        {field('trailer', txt.genTrailer)}
                        {field('departureDate', txt.genDepartureDate)}
                        {field('departureTime', txt.genDepartureTime)}
                        {field('returnDate', txt.genReturnDate)}
                        {field('returnTime', txt.genReturnTime)}
                        {field('departureOdometer', txt.genDepartureOdometer)}
                        {field('returnOdometer', txt.genReturnOdometer)}
                        {field('distance', txt.genDistance)}
                    </div>}

                    {sectionHead('refs', txt.genSectionRefs)}
                    {open === 'refs' && <div className="Generator__grid">
                        {range(6).map(n => field(`sci${n}` as Field, txt.genRef(n)))}
                    </div>}

                    {sectionHead('fuel', txt.genSectionFuel)}
                    {open === 'fuel' && <div className="Generator__grid">
                        {field('fuelBefore', txt.genFuelBefore)}
                        {field('fuelAfter', txt.genFuelAfter)}
                        {field('refueled', txt.genRefueled)}
                        {field('fuelConsumption', txt.genFuelConsumption)}
                        {range(3).map(n => (
                            <React.Fragment key={n}>
                                {field(`fuel${n}Date` as Field, txt.genFuelDate(n))}
                                {field(`fuel${n}City` as Field, txt.genFuelCity(n))}
                                {field(`fuel${n}Odometer` as Field, txt.genFuelOdometer(n))}
                                {field(`fuel${n}Value` as Field, txt.genFuelValue(n))}
                            </React.Fragment>
                        ))}
                    </div>}

                    {sectionHead('expenses', txt.genSectionExpenses)}
                    {open === 'expenses' && <div className="Generator__grid Generator__grid--single">
                        {range(12).map(n => field(`expence${n}` as Field, txt.genExpense(n)))}
                    </div>}

                    {sectionHead('legs', `${txt.genSectionLegs} (${legs.length})`)}
                    {open === 'legs' && <div className="Generator__legs">
                        {legs.map((leg, i) => {
                            const expanded = openLeg === i;
                            return (
                                <div key={i} className="Generator__leg">
                                    <div className="Generator__legHead">
                                        <div className="Generator__arrows">
                                            {i === 0
                                                ? <ArrowDropUpIcon fontSize='small' color='disabled'/>
                                                : <ArrowDropUpIcon fontSize='small' className="Link" onClick={() => moveLeg(i, -1)}/>}
                                            {i === legs.length - 1
                                                ? <ArrowDropDownIcon fontSize='small' color='disabled'/>
                                                : <ArrowDropDownIcon fontSize='small' className="Link" onClick={() => moveLeg(i, 1)}/>}
                                        </div>
                                        <div className="Generator__legSummary" onClick={() => setOpenLeg(expanded ? null : i)}>
                                            <small>{txt.genLeg(i + 1)}</small><br/>
                                            <strong>{leg.startCity || '—'} → {leg.stopCity || '—'}</strong>
                                            {leg.customer && <><br/><small>{leg.customer}</small></>}
                                        </div>
                                        {expanded
                                            ? <ExpandLessIcon className="Link" onClick={() => setOpenLeg(null)}/>
                                            : <EditIcon className="Link" titleAccess={txt.genEditLeg} onClick={() => setOpenLeg(i)}/>}
                                        <DeleteIcon className="Link" color='error' onClick={() => removeLeg(i)}/>
                                    </div>
                                    {expanded && <div className="Generator__grid">
                                        {legFields.map(f => input(f.label, leg[f.key], v => setLegField(i, f.key, v), f.key))}
                                    </div>}
                                </div>
                            );
                        })}
                        {legs.length < MAX_LEG_ROWS &&
                            <ActionButton icon={<AddIcon/>} onClick={addLeg}>{txt.genAddLeg}</ActionButton>}
                    </div>}

                    {sectionHead('other', txt.genSectionOther)}
                    {open === 'other' && <div className="Generator__grid Generator__grid--single">
                        {/* w szablonie PDF oba pola są wielowierszowe – enter przechodzi do PDF */}
                        {field('stops', txt.genStops, true)}
                        {field('other', txt.genOther, true)}
                    </div>}

                    <br/>
                    <ActionButton
                        variant="accent"
                        icon={<AutoAwesomeIcon/>}
                        loading={loading}
                        onClick={() => handleGeneratorButton()}
                    >
                        {txt.generate}
                    </ActionButton>
                </ModalContent>
            </Modal>
        </div>
    );
}
