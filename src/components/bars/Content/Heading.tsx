import React from "react";

interface Props {
    text: string;
}

export const Heading = (props:Props) => (
    <h2>{props.text}</h2>
)