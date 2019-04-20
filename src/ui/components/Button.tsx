import MButton from '@material-ui/core/Button';
import { PlayArrow, Refresh, Stop } from '@material-ui/icons';
import * as React from 'react';

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