import React, { useState, useRef, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { home } from "../../assets/txt/home";
import { userLangEnum } from 'types';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { Fab } from "@mui/material";
import { useApi } from "../../hooks/useApi";
import { apiPaths } from '../../config/api';

interface Props {
    notes: string | null;
    lang: userLangEnum;
}

export const NotesField = (props: Props) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [text, setText] = useState<string | null>(props.notes);
    const [formatedText, setFormatedText] = useState<string>('');
    const [synchronized, setSynchronized] = useState<boolean>(true);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { fetchData } = useApi();

    const handleClick = (): void => {
        if (!isEditing) {
            setIsEditing(true);
        }
    }
    const handleSave = (): void => {
        setIsEditing(false);
        setSynchronized(false);
        const sendData = { notes: text };
        fetchData(apiPaths.editNotes, { method: 'PATCH', sendData }).then((res) => {
            if (res.success) setSynchronized(true);
        });
    }

    useEffect(() => {
        handleTextareaChange();
    }, [isEditing]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [textareaRef]);

    useEffect(() => {
        if (text) {
            const lines = text.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                    {line}
                    <br />
                </React.Fragment>
            ));
            const formattedHtml = lines.map((line) => ReactDOMServer.renderToStaticMarkup(line)).join('');
            setFormatedText(formattedHtml);
        }
    }, [text]);

    const handleTextareaChange = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };


    return (
        <fieldset id={synchronized ? 'Notes' : 'NotesError'} onClick={handleClick}>
            <legend>
                {home[props.lang].notes}
            </legend>
            {
                isEditing
                    ?
                    <>
                        <textarea
                            className='transparent-textarea'
                            value={text ? text : ''}
                            onChange={(e) => {
                                setText(e.target.value);
                                handleTextareaChange();
                            }}
                            autoFocus
                            ref={textareaRef}
                        />
                        <center><Fab onClick={handleSave} color="primary" aria-label="save"><SaveAsIcon /></Fab></center>
                    </>
                    :
                    <div dangerouslySetInnerHTML={{ __html: formatedText }} />
            }
        </fieldset>
    );
}