import React, {Dispatch, SetStateAction} from 'react';
import Button from '@mui/material/Button';
import {ActivitiesTypes} from 'types';

interface Props {
    activityForm: ActivitiesTypes;
    text: string;
    set: Dispatch<SetStateAction<ActivitiesTypes | null>>;
}

export const NavigateButton = (props: Props) => {

    const navigate = (activityForm: ActivitiesTypes) => {
        props.set(activityForm);
    }

    return (
        <Button
            style={{margin: 5}}
            onClick={() => navigate(props.activityForm)}
            variant="outlined">
            {props.text}
        </Button>
    );
}