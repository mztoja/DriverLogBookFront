import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
// import ReactDOMServer from 'react-dom/server';
import { home } from "../../assets/txt/home";
import { UserInterface, userLangEnum } from 'types';
// import SaveAsIcon from '@mui/icons-material/SaveAs';
// import { Fab } from "@mui/material";
import { useApi } from "../../hooks/useApi";
import { apiPaths } from '../../config/api';
// import { formatText } from '../../utils/formats/formatText';

interface Props {
    userData: UserInterface;
    setUserData: Dispatch<SetStateAction<UserInterface | null>>;
    lang: userLangEnum;
}

export const NotesField = (props: Props) => {
    // const [isEditing, setIsEditing] = useState<boolean>(false);
    const [text, setText] = useState<string | null>(props.userData.notes);
    // const [formatedText, setFormatedText] = useState<string>('');
    const [synchronized, setSynchronized] = useState<boolean>(true);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { fetchData } = useApi();
    const intervalRef = useRef<number | null>(null);

    // const handleClick = (): void => {
    //     if (!isEditing) {
    //         setIsEditing(true);
    //     }
    // }
    const handleSave = (): void => {
        // setIsEditing(false);
        setSynchronized(false);
        const sendData = { notes: text };
        fetchData<UserInterface>(apiPaths.editNotes, { method: 'PATCH', sendData }).then((res) => {
            if (res.success && res.responseData) {
                props.setUserData({ ...props.userData, notes: res.responseData.notes });
                setSynchronized(true);
            };
        });
    }

    // Autopowiększanie textarea. Reset height:'auto' potrafi na chwilę skrócić stronę,
    // przez co kontener treści (.AppMain__content) przewija się przy każdym znaku –
    // dlatego zapamiętujemy i przywracamy jego scrollTop.
    const autoGrow = () => {
        const el = textareaRef.current;
        if (!el) return;
        const scroller = el.closest<HTMLElement>('.AppMain__content, #AppMain');
        const savedScroll = scroller ? scroller.scrollTop : null;
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
        if (scroller && savedScroll !== null) {
            scroller.scrollTop = savedScroll;
        }
    };

    const handleTextareaChange = () => {
        autoGrow();
    };

    useEffect(() => {
        if (!synchronized) {
            intervalRef.current = window.setInterval(() => {
                handleSave();
            }, 3000);
        } else {
            if (props.userData.notes !== text) handleSave();
        }
        return () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
        // eslint-disable-next-line
    }, [text, synchronized]);

    useEffect(() => {
        autoGrow();
        // eslint-disable-next-line
    }, []);


    return (
        <fieldset id={synchronized ? 'Notes' : 'NotesError'}>
            <legend>
                {home[props.lang].notes}
            </legend>
            <textarea
                className='transparent-textarea'
                value={text ? text : ''}
                onChange={(e) => {
                    setText(e.target.value);
                    handleTextareaChange();
                    setSynchronized(false);
                }}
                autoFocus
                ref={textareaRef}
            />
            {
            // isEditing
            //     ?
            //     <>
            //         <textarea
            //             className='transparent-textarea'
            //             value={text ? text : ''}
            //             onChange={(e) => {
            //                 setText(e.target.value);
            //                 handleTextareaChange();
            //                 setSynchronized(false);
            //             }}
            //             autoFocus
            //             ref={textareaRef}
            //         />
            //         {/* <center><Fab onClick={handleSave} color="primary" aria-label="save"><SaveAsIcon /></Fab></center> */}
            //     </>
            //     :
            //     <div dangerouslySetInnerHTML={{ __html: formatedText }} />
            }
        </fieldset>
    );
}