import React, {Dispatch, FormEvent, SetStateAction, useState} from "react";
import {AddFriendFormInterface, userLangEnum} from 'types';
import {CircularProgress} from "@mui/material";
import {SubmitButton} from "../common/form/SubmitButton";
import {friends} from "../../assets/txt/friends";
import {EmailInput} from "../common/form/profile/EmailInput";
import {useAlert} from "../../hooks/useAlert";
import {useApi} from '../../hooks/useApi';
import {useFriends} from "../../hooks/useFriends";
import {apiPaths} from "../../config/api";
import {handleApiResult} from "../../utils/handleApiResult";
import {Modal, ModalContent, StyledBackdrop} from "../common/Modal";

interface Props {
    lang: userLangEnum;
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
}

const defaultValues: AddFriendFormInterface = {
    email: '',
};

export const AddFriend = (props: Props) => {

    const {setAlert} = useAlert();
    const {loading, fetchDataOld} = useApi();
    const {refreshFriends} = useFriends();

    const [addFriendForm, setAddFriendForm] = useState<AddFriendFormInterface>(defaultValues);

    const sendAddFriendForm = async (e: FormEvent) => {
        e.preventDefault();

        const result = await fetchDataOld(apiPaths.inviteFriend, 'POST', addFriendForm);
        handleApiResult(result, props.lang, setAlert, () => {
            setAddFriendForm(defaultValues);
            refreshFriends();
            setAlert(friends[props.lang].inviteSuccess, 'success');
            props.setShow(false);
        });
    };

    const handleClose = () => props.setShow(false);

    return (
        <div>
            <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={props.show}
                onClose={handleClose}
                slots={{backdrop: StyledBackdrop}}
            >
                <ModalContent sx={{width: 400}}>
                    <center>
                        <h2 onClick={handleClose}>{friends[props.lang].addFriend}</h2>
                        <form onSubmit={sendAddFriendForm}>
                            <div>
                                <EmailInput
                                    lang={props.lang}
                                    value={addFriendForm.email}
                                    onChange={e => setAddFriendForm({email: e.target.value})}
                                />
                            </div>
                            <br/>
                            <p>{friends[props.lang].addFriendConsentInfo}</p>
                            <br/>
                            {loading
                                ? <CircularProgress/>
                                : <SubmitButton text={friends[props.lang].inviteSubmit}/>
                            }
                        </form>
                    </center>
                </ModalContent>
            </Modal>
        </div>
    )
};
