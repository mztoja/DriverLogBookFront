import * as React from 'react';
import {Dispatch, SetStateAction} from "react";
import {UserNoteInterface, userLangEnum} from 'types';
import {home} from "../../assets/txt/home";
import {Modal, ModalContent, StyledBackdrop} from "../common/Modal";
import {formatText} from "../../utils/formats/formatText";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    lang: userLangEnum;
    history: UserNoteInterface[];
}

export const NotesHistory = (props: Props) => {
    const handleClose = () => props.setOpen(false);

    return (
        <div>
            <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={props.open}
                onClose={handleClose}
                slots={{backdrop: StyledBackdrop}}
            >
                <ModalContent sx={{width: 500}}>
                    <h2 className='center' onClick={handleClose}>{home[props.lang].notesHistoryTitle}</h2>
                    {props.history.length === 0 && <p className='center'>&mdash;</p>}
                    {props.history.map((entry, i) => (
                        <div
                            key={entry.id}
                            style={{
                                borderTop: i > 0 ? '1px solid #ffffff33' : 'none',
                                paddingTop: i > 0 ? '0.6rem' : 0,
                                marginTop: i > 0 ? '0.6rem' : 0,
                            }}
                        >
                            <div dangerouslySetInnerHTML={{__html: formatText(entry.notes ?? '')}}/>
                        </div>
                    ))}
                </ModalContent>
            </Modal>
        </div>
    );
};
