import React, {useState, useRef, useEffect} from 'react';
import {Link} from "react-router-dom";
import {home} from "../../assets/txt/home";
import {UserNoteInterface, userLangEnum} from 'types';
import {useApi} from "../../hooks/useApi";
import {apiPaths} from '../../config/api';
import {NotesHistory} from './NotesHistory';

interface Props {
    lang: userLangEnum;
}

export const NotesField = (props: Props) => {
    const {fetchData} = useApi();

    const [text, setText] = useState<string>('');
    const [history, setHistory] = useState<UserNoteInterface[]>([]);
    const [synchronized, setSynchronized] = useState<boolean>(true);
    const [showHistory, setShowHistory] = useState<boolean>(false);
    const savedTextRef = useRef<string>('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Autopowiększanie textarea. Reset height:'auto' potrafi na chwilę skrócić stronę,
    // przez co kontener treści (.AppMain__content) przewija się – zapamiętujemy i przywracamy scrollTop.
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

    const handleSave = (): void => {
        setSynchronized(false);
        const value = text;
        fetchData<UserNoteInterface[]>(apiPaths.saveUserNote, {method: 'POST', sendData: {notes: value}}).then((res) => {
            if (res.success && Array.isArray(res.responseData)) {
                setHistory(res.responseData);
                savedTextRef.current = value;
                setSynchronized(true);
            }
        });
    };

    const handleBlur = (): void => {
        if (text !== savedTextRef.current) {
            handleSave();
        }
    };

    useEffect(() => {
        fetchData<UserNoteInterface[]>(apiPaths.getUserNotes).then((res) => {
            if (Array.isArray(res.responseData)) {
                setHistory(res.responseData);
                const current = res.responseData[0]?.notes ?? '';
                setText(current);
                savedTextRef.current = current;
                autoGrow();
            }
        });
        // eslint-disable-next-line
    }, []);

    return (
        <fieldset id={synchronized ? 'Notes' : 'NotesError'}>
            <legend>
                {home[props.lang].notes}
            </legend>
            <textarea
                className='transparent-textarea'
                value={text}
                onChange={(e) => {
                    setText(e.target.value);
                    autoGrow();
                    setSynchronized(false);
                }}
                onBlur={handleBlur}
                autoFocus
                ref={textareaRef}
            />
            <div className="center">
                <Link to="" className="Link" onClick={() => setShowHistory(true)}>
                    {home[props.lang].notesHistory}
                </Link>
            </div>
            {showHistory &&
                <NotesHistory
                    lang={props.lang}
                    history={history}
                    open={showHistory}
                    setOpen={setShowHistory}
                />
            }
        </fieldset>
    );
}
