import * as React from 'react';
import MButton from '@material-ui/core/Button';
import { PlayArrow, Stop, Refresh } from '@material-ui/icons';

export const PlayButton: React.FunctionComponent = (props) => {
    return (<MButton variant="contained" >
        <PlayArrow/>
    </MButton>);
};

export const PauseButton: React.FunctionComponent = (props) => {
    return (<MButton variant="contained" >
        <Stop/>
    </MButton>);
};


export const RestartButton: React.FunctionComponent = (props) => {
    return (<MButton variant="contained" >
        <Refresh/>
    </MButton>);
};