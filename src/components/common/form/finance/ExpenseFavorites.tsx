import * as React from 'react';
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {DeleteExpenseFavoriteData, ExpenseFavoriteInterface, userLangEnum} from 'types';
import {form} from "../../../../assets/txt/form";
import {CircularProgress, IconButton, Tooltip} from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {apiPaths} from "../../../../config/api";
import {useApi} from "../../../../hooks/useApi";
import {usePlaces} from "../../../../hooks/usePlaces";
import {Modal, ModalContent, StyledBackdrop} from "../../Modal";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    lang: userLangEnum;
    applyFavorite: (fav: ExpenseFavoriteInterface) => void;
}

export const ExpenseFavorites = (props: Props) => {
    const {loading, fetchData, fetchDataOld} = useApi();
    const {places: placesList} = usePlaces();
    const [favoritesList, setFavoritesList] = useState<ExpenseFavoriteInterface[]>([]);

    useEffect(() => {
        fetchData<ExpenseFavoriteInterface[]>(apiPaths.getExpenseFavorites).then((r) => {
            if (r.responseData) setFavoritesList(r.responseData);
        });
        // eslint-disable-next-line
    }, []);

    const handleClose = () => props.setOpen(false);

    const choose = (fav: ExpenseFavoriteInterface) => {
        props.applyFavorite(fav);
        props.setOpen(false);
    };

    const erase = async (id: number) => {
        const sendData: DeleteExpenseFavoriteData = {favoriteId: id.toString()};
        const result = await fetchDataOld(apiPaths.deleteExpenseFavorite, 'DELETE', sendData);
        if ((result && result.responseData) && (!result.responseData.dtc)) {
            setFavoritesList(result.responseData);
        }
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
                <ModalContent sx={{width: 400}}>
                    {loading ? <CircularProgress/> :
                        <>
                            <h2 className='center' onClick={handleClose}>{form[props.lang].expenseFavTitle}</h2>
                            {favoritesList.length === 0 &&
                                <p className='center'>{form[props.lang].expenseFavEmpty}</p>}
                            {favoritesList.map((fav) => {
                                const placeLabel = fav.place
                                    || placesList?.find((p) => p.id === fav.placeId)?.name
                                    || '';
                                return (
                                    <p key={fav.id}>
                                        <Tooltip title={form[props.lang].expenseFavDelete} arrow>
                                            <IconButton color="error" aria-label="delete"
                                                        onClick={() => erase(fav.id)}>
                                                <HighlightOffIcon/>
                                            </IconButton>
                                        </Tooltip>
                                        <span style={{cursor: 'pointer'}} onClick={() => choose(fav)}>
                                            {[
                                                placeLabel,
                                                fav.itemDescription,
                                                Number(fav.unitPrice).toFixed(2),
                                                fav.payment || form[props.lang].cash,
                                            ].filter(Boolean).join(' · ')}
                                        </span>
                                    </p>
                                );
                            })}
                        </>
                    }
                </ModalContent>
            </Modal>
        </div>
    );
};
