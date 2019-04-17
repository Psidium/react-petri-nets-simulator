import * as React from 'react';

export interface Button {
    className?: string;
}

export const enum ButtonType {
    Play = "Play",
    Pause = "Pause"
}

export const Button: React.FunctionComponent<Button> = (props) => {
    return (
        <button className={"Button " + props.className}>
            {props.children}
        </button>
    );
};

export const PlayButton: React.FunctionComponent = (props) => {
    return (<Button className={ButtonType.Play}/>);
};

export const PauseButton: React.FunctionComponent<Button> = (props) => {
    return (<Button className={ButtonType.Pause}/>);
}