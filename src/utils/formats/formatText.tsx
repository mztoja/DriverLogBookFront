import React from 'react';
import ReactDOMServer from 'react-dom/server';

export const formatText = (text: string): string => {
    if (!text || text.length < 1) {
        return '';
    } else {
        const lines: JSX.Element[] = text.split('\n').map((line, index) => (
            <React.Fragment key={index} >
                {line}
                < br />
            </React.Fragment>
        ));
        return lines.map((line) => ReactDOMServer.renderToStaticMarkup(line)).join('');
    }
}