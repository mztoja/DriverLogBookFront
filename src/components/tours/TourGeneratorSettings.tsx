import React, {Dispatch, SetStateAction, useState} from 'react';
import {userLangEnum, TourSettleGeneratorInterface, TourSettleGeneratorLeg} from 'types';
import {Modal, ModalContent, StyledBackdrop} from "../common/Modal";
import {ActionButton} from "../common/ActionButton";
import {tours} from "../../assets/txt/tours";
import DeleteIcon from '@mui/icons-material/Delete';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {useAlert} from "../../hooks/useAlert";
import {generateTourSettlement} from "../../utils/generateTourSettlement";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    data: TourSettleGeneratorInterface;
    setData: Dispatch<SetStateAction<TourSettleGeneratorInterface | null>>;
    lang: userLangEnum;
    tourGenerator: string;
}

const MAX_ROWS = 20;

const EMPTY_LEG: TourSettleGeneratorLeg = {
    startCity: '', startData: '', startOdometer: '',
    borderDate: '', borderPlace: '',
    stopCity: '', stopData: '', stopOdometer: '',
    distance: '', customer: '',
};

export const TourGeneratorSettings = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const {data, setData} = props;
    const {setAlert} = useAlert();

    const handleClose = () => props.setOpen(false);

    const legs = data.routes;
    // Gdy generator nie wykrył żadnego odcinka – pokaż jeden pusty wiersz, żeby dało się dopisać kolejne.
    const rows: TourSettleGeneratorLeg[] = legs.length > 0 ? legs : [EMPTY_LEG];

    const handleUp = (i: number): void => {
        if (i <= 0 || i >= legs.length) return;
        const next = [...legs];
        [next[i - 1], next[i]] = [next[i], next[i - 1]];
        setData({...data, routes: next});
    };

    const handleDown = (i: number): void => {
        if (i < legs.length - 1) {
            const next = [...legs];
            [next[i], next[i + 1]] = [next[i + 1], next[i]];
            setData({...data, routes: next});
            return;
        }
        // ostatni wiersz „w dół" → nowy pusty wiersz nad przesuwanym
        if (legs.length >= MAX_ROWS) return;
        const base = [...legs];
        const moved = base.length ? base.pop() as TourSettleGeneratorLeg : {...EMPTY_LEG};
        setData({...data, routes: [...base, {...EMPTY_LEG}, moved]});
    };

    const handleDelete = (i: number): void => {
        setData({...data, routes: legs.filter((_, idx) => idx !== i)});
    };

    const handleGeneratorButton = (): void => {
        setLoading(true);
        generateTourSettlement(props.lang, data, props.tourGenerator, setAlert).finally(() => setLoading(false));
    };

    return (
        <div>
            <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={props.open}
                onClose={handleClose}
                slots={{backdrop: StyledBackdrop}}
            >
                <ModalContent sx={{width: 650}}>
                    <h2 className='center' onClick={handleClose}>{tours[props.lang].generate}</h2>
                    <p>{tours[props.lang].generatorTourEdit}</p>
                    <table>
                        <tbody>
                        {rows.map((leg, i) => (
                            <tr key={i}>
                                <td>
                                    {i === 0
                                        ? <ArrowDropUpIcon fontSize='small' color='disabled'/>
                                        : <ArrowDropUpIcon fontSize='small' onClick={() => handleUp(i)}/>}
                                    <br/>
                                    <ArrowDropDownIcon fontSize='small' onClick={() => handleDown(i)}/>
                                </td>
                                <td>{leg.startCity}</td>
                                <td>{leg.startData}<br/>{leg.startOdometer}</td>
                                <td>{leg.borderDate}<br/>{leg.borderPlace}</td>
                                <td>{leg.stopCity}</td>
                                <td>{leg.stopData}<br/>{leg.stopOdometer}</td>
                                <td>{leg.distance}</td>
                                <td>{leg.customer}</td>
                                <td>
                                    <DeleteIcon fontSize='small' color='error' onClick={() => handleDelete(i)}/>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <br/><br/>
                    <ActionButton
                        variant="accent"
                        icon={<AutoAwesomeIcon/>}
                        loading={loading}
                        onClick={() => handleGeneratorButton()}
                    >
                        {tours[props.lang].generate}
                    </ActionButton>
                </ModalContent>
            </Modal>
        </div>
    );
}
