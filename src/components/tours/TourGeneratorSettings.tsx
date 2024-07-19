import React, { Dispatch, SetStateAction, useState } from 'react';
import { userLangEnum, TourSettleGeneratorInterface } from 'types';
import { Modal, ModalContent, StyledBackdrop } from "../common/Modal";
import { CircularProgress, Fab } from "@mui/material";
import { tours } from "../../assets/txt/tours";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useAlert } from "../../hooks/useAlert";
import { generateTourSettlement } from "../../utils/generateTourSettlement";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    data: TourSettleGeneratorInterface;
    setData: Dispatch<SetStateAction<TourSettleGeneratorInterface | null>>;
    lang: userLangEnum;
    tourGenerator: string;
}

export const TourGeneratorSettings = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const handleClose = () => props.setOpen(false);
    const { data, setData } = props;
    const { setAlert } = useAlert();

    const handleDelete = (v: number): void => {
        const value = v.toString();
        setData({
            ...data,
            [`startCity${value}`]: '',
            [`startData${value}`]: '',
            [`startOdometer${value}`]: '',
            [`borderDate${value}`]: '',
            [`borderPlace${value}`]: '',
            [`stopCity${value}`]: '',
            [`stopData${value}`]: '',
            [`stopOdometer${value}`]: '',
            [`distance${value}`]: '',
            [`customer${value}`]: '',
        });
    }

    const handleUp = (v: number): void => {
        const value = v.toString();
        const prev = (v - 1).toString();
        const dataAny = data as any;
        setData({
            ...data,
            [`startCity${value}`]: dataAny[`startCity${prev}`],
            [`startData${value}`]: dataAny[`startData${prev}`],
            [`startOdometer${value}`]: dataAny[`startOdometer${prev}`],
            [`borderDate${value}`]: dataAny[`borderDate${prev}`],
            [`borderPlace${value}`]: dataAny[`borderPlace${prev}`],
            [`stopCity${value}`]: dataAny[`stopCity${prev}`],
            [`stopData${value}`]: dataAny[`stopData${prev}`],
            [`stopOdometer${value}`]: dataAny[`stopOdometer${prev}`],
            [`distance${value}`]: dataAny[`distance${prev}`],
            [`customer${value}`]: dataAny[`customer${prev}`],
            [`startCity${prev}`]: dataAny[`startCity${value}`],
            [`startData${prev}`]: dataAny[`startData${value}`],
            [`startOdometer${prev}`]: dataAny[`startOdometer${value}`],
            [`borderDate${prev}`]: dataAny[`borderDate${value}`],
            [`borderPlace${prev}`]: dataAny[`borderPlace${value}`],
            [`stopCity${prev}`]: dataAny[`stopCity${value}`],
            [`stopData${prev}`]: dataAny[`stopData${value}`],
            [`stopOdometer${prev}`]: dataAny[`stopOdometer${value}`],
            [`distance${prev}`]: dataAny[`distance${value}`],
            [`customer${prev}`]: dataAny[`customer${value}`],
        });
    }

    const handleDown = (v: number): void => {
        const value = v.toString();
        const next = (v + 1).toString();
        const dataAny = data as any;
        setData({
            ...data,
            [`startCity${value}`]: dataAny[`startCity${next}`],
            [`startData${value}`]: dataAny[`startData${next}`],
            [`startOdometer${value}`]: dataAny[`startOdometer${next}`],
            [`borderDate${value}`]: dataAny[`borderDate${next}`],
            [`borderPlace${value}`]: dataAny[`borderPlace${next}`],
            [`stopCity${value}`]: dataAny[`stopCity${next}`],
            [`stopData${value}`]: dataAny[`stopData${next}`],
            [`stopOdometer${value}`]: dataAny[`stopOdometer${next}`],
            [`distance${value}`]: dataAny[`distance${next}`],
            [`customer${value}`]: dataAny[`customer${next}`],
            [`startCity${next}`]: dataAny[`startCity${value}`],
            [`startData${next}`]: dataAny[`startData${value}`],
            [`startOdometer${next}`]: dataAny[`startOdometer${value}`],
            [`borderDate${next}`]: dataAny[`borderDate${value}`],
            [`borderPlace${next}`]: dataAny[`borderPlace${value}`],
            [`stopCity${next}`]: dataAny[`stopCity${value}`],
            [`stopData${next}`]: dataAny[`stopData${value}`],
            [`stopOdometer${next}`]: dataAny[`stopOdometer${value}`],
            [`distance${next}`]: dataAny[`distance${value}`],
            [`customer${next}`]: dataAny[`customer${value}`],
        });
    }

    const handleGeneratorButton = (): void => {
        setLoading(true);
        generateTourSettlement(props.lang, data, props.tourGenerator, setAlert).finally(() => setLoading(false));
    }

    return (
        <div>
            <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={props.open}
                onClose={handleClose}
                slots={{ backdrop: StyledBackdrop }}
            >
                <ModalContent sx={{ width: 650 }}>
                    <h2 className='center' onClick={handleClose}>{tours[props.lang].generate}</h2>
                    <p>{tours[props.lang].generatorTourEdit}</p>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <ArrowDropUpIcon fontSize='small' color='disabled' onClick={() => handleUp(1)} />
                                    <br />
                                    <ArrowDropDownIcon fontSize='small' onClick={() => handleDown(1)} />
                                </td>
                                <td>
                                    {data.startCity1}
                                </td>
                                <td>
                                    {data.startData1}
                                    <br />
                                    {data.startOdometer1}
                                </td>
                                <td>
                                    {data.borderDate1}
                                    <br />
                                    {data.borderPlace1}
                                </td>
                                <td>
                                    {data.stopCity1}
                                </td>
                                <td>
                                    {data.stopData1}
                                    <br />
                                    {data.stopOdometer1}
                                </td>
                                <td>
                                    {data.distance1}
                                </td>
                                <td>
                                    {data.customer1}
                                </td>
                                <td>
                                    <DeleteIcon fontSize='small' color='error' onClick={() => handleDelete(1)} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <ArrowDropUpIcon fontSize='small' onClick={() => handleUp(2)} />
                                    <br />
                                    <ArrowDropDownIcon fontSize='small' onClick={() => handleDown(2)} />
                                </td>
                                <td>
                                    {data.startCity2}
                                </td>
                                <td>
                                    {data.startData2}
                                    <br />
                                    {data.startOdometer2}
                                </td>
                                <td>
                                    {data.borderDate2}
                                    <br />
                                    {data.borderPlace2}
                                </td>
                                <td>
                                    {data.stopCity2}
                                </td>
                                <td>
                                    {data.stopData2}
                                    <br />
                                    {data.stopOdometer2}
                                </td>
                                <td>
                                    {data.distance2}
                                </td>
                                <td>
                                    {data.customer2}
                                </td>
                                <td>
                                    <DeleteIcon fontSize='small' color='error' onClick={() => handleDelete(2)} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <ArrowDropUpIcon fontSize='small' onClick={() => handleUp(3)} />
                                    <br />
                                    <ArrowDropDownIcon fontSize='small' onClick={() => handleDown(3)} />
                                </td>
                                <td>
                                    {data.startCity3}
                                </td>
                                <td>
                                    {data.startData3}
                                    <br />
                                    {data.startOdometer3}
                                </td>
                                <td>
                                    {data.borderDate3}
                                    <br />
                                    {data.borderPlace3}
                                </td>
                                <td>
                                    {data.stopCity3}
                                </td>
                                <td>
                                    {data.stopData3}
                                    <br />
                                    {data.stopOdometer3}
                                </td>
                                <td>
                                    {data.distance3}
                                </td>
                                <td>
                                    {data.customer3}
                                </td>
                                <td>
                                    <DeleteIcon fontSize='small' color='error' onClick={() => handleDelete(3)} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <ArrowDropUpIcon fontSize='small' onClick={() => handleUp(4)} />
                                    <br />
                                    <ArrowDropDownIcon fontSize='small' onClick={() => handleDown(4)} />
                                </td>
                                <td>
                                    {data.startCity4}
                                </td>
                                <td>
                                    {data.startData4}
                                    <br />
                                    {data.startOdometer4}
                                </td>
                                <td>
                                    {data.borderDate4}
                                    <br />
                                    {data.borderPlace4}
                                </td>
                                <td>
                                    {data.stopCity4}
                                </td>
                                <td>
                                    {data.stopData4}
                                    <br />
                                    {data.stopOdometer4}
                                </td>
                                <td>
                                    {data.distance4}
                                </td>
                                <td>
                                    {data.customer4}
                                </td>
                                <td>
                                    <DeleteIcon fontSize='small' color='error' onClick={() => handleDelete(4)} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <ArrowDropUpIcon fontSize='small' onClick={() => handleUp(5)} />
                                    <br />
                                    <ArrowDropDownIcon fontSize='small' onClick={() => handleDown(5)} />
                                </td>
                                <td>
                                    {data.startCity5}
                                </td>
                                <td>
                                    {data.startData5}
                                    <br />
                                    {data.startOdometer5}
                                </td>
                                <td>
                                    {data.borderDate5}
                                    <br />
                                    {data.borderPlace5}
                                </td>
                                <td>
                                    {data.stopCity5}
                                </td>
                                <td>
                                    {data.stopData5}
                                    <br />
                                    {data.stopOdometer5}
                                </td>
                                <td>
                                    {data.distance5}
                                </td>
                                <td>
                                    {data.customer5}
                                </td>
                                <td>
                                    <DeleteIcon fontSize='small' color='error' onClick={() => handleDelete(5)} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <ArrowDropUpIcon fontSize='small' onClick={() => handleUp(6)} />
                                    <br />
                                    <ArrowDropDownIcon fontSize='small' onClick={() => handleDown(6)} />
                                </td>
                                <td>
                                    {data.startCity6}
                                </td>
                                <td>
                                    {data.startData6}
                                    <br />
                                    {data.startOdometer6}
                                </td>
                                <td>
                                    {data.borderDate6}
                                    <br />
                                    {data.borderPlace6}
                                </td>
                                <td>
                                    {data.stopCity6}
                                </td>
                                <td>
                                    {data.stopData6}
                                    <br />
                                    {data.stopOdometer6}
                                </td>
                                <td>
                                    {data.distance6}
                                </td>
                                <td>
                                    {data.customer6}
                                </td>
                                <td>
                                    <DeleteIcon fontSize='small' color='error' onClick={() => handleDelete(6)} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <ArrowDropUpIcon fontSize='small' onClick={() => handleUp(7)} />
                                    <br />
                                    <ArrowDropDownIcon fontSize='small' onClick={() => handleDown(7)} />
                                </td>
                                <td>
                                    {data.startCity7}
                                </td>
                                <td>
                                    {data.startData7}
                                    <br />
                                    {data.startOdometer7}
                                </td>
                                <td>
                                    {data.borderDate7}
                                    <br />
                                    {data.borderPlace7}
                                </td>
                                <td>
                                    {data.stopCity7}
                                </td>
                                <td>
                                    {data.stopData7}
                                    <br />
                                    {data.stopOdometer7}
                                </td>
                                <td>
                                    {data.distance7}
                                </td>
                                <td>
                                    {data.customer7}
                                </td>
                                <td>
                                    <DeleteIcon fontSize='small' color='error' onClick={() => handleDelete(7)} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <ArrowDropUpIcon fontSize='small' onClick={() => handleUp(8)} />
                                    <br />
                                    <ArrowDropDownIcon fontSize='small' onClick={() => handleDown(8)} />
                                </td>
                                <td>
                                    {data.startCity8}
                                </td>
                                <td>
                                    {data.startData8}
                                    <br />
                                    {data.startOdometer8}
                                </td>
                                <td>
                                    {data.borderDate8}
                                    <br />
                                    {data.borderPlace8}
                                </td>
                                <td>
                                    {data.stopCity8}
                                </td>
                                <td>
                                    {data.stopData8}
                                    <br />
                                    {data.stopOdometer8}
                                </td>
                                <td>
                                    {data.distance8}
                                </td>
                                <td>
                                    {data.customer8}
                                </td>
                                <td>
                                    <DeleteIcon fontSize='small' color='error' onClick={() => handleDelete(8)} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <ArrowDropUpIcon fontSize='small' onClick={() => handleUp(9)} />
                                    <br />
                                    <ArrowDropDownIcon fontSize='small' onClick={() => handleDown(9)} />
                                </td>
                                <td>
                                    {data.startCity9}
                                </td>
                                <td>
                                    {data.startData9}
                                    <br />
                                    {data.startOdometer9}
                                </td>
                                <td>
                                    {data.borderDate9}
                                    <br />
                                    {data.borderPlace9}
                                </td>
                                <td>
                                    {data.stopCity9}
                                </td>
                                <td>
                                    {data.stopData9}
                                    <br />
                                    {data.stopOdometer9}
                                </td>
                                <td>
                                    {data.distance9}
                                </td>
                                <td>
                                    {data.customer9}
                                </td>
                                <td>
                                    <DeleteIcon fontSize='small' color='error' onClick={() => handleDelete(9)} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <ArrowDropUpIcon fontSize='small' onClick={() => handleUp(10)} />
                                    <br />
                                    <ArrowDropDownIcon fontSize='small' color='disabled' onClick={() => handleDown(10)} />
                                </td>
                                <td>
                                    {data.startCity10}
                                </td>
                                <td>
                                    {data.startData10}
                                    <br />
                                    {data.startOdometer10}
                                </td>
                                <td>
                                    {data.borderDate10}
                                    <br />
                                    {data.borderPlace10}
                                </td>
                                <td>
                                    {data.stopCity10}
                                </td>
                                <td>
                                    {data.stopData10}
                                    <br />
                                    {data.stopOdometer10}
                                </td>
                                <td>
                                    {data.distance10}
                                </td>
                                <td>
                                    {data.customer10}
                                </td>
                                <td>
                                    <DeleteIcon fontSize='small' color='error' onClick={() => handleDelete(10)} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br /><br />
                    <Fab variant="extended" size="small" color="primary" disabled={loading}
                        onClick={() => handleGeneratorButton()}>
                        {!loading ? tours[props.lang].generate : <CircularProgress />}
                    </Fab>
                </ModalContent>
            </Modal>
        </div>
    );
}