import MButton from "@material-ui/core/Button";
import { PlayArrow } from "@material-ui/icons";
import * as React from 'react';

export class PlayButton extends React.Component<{}, {}> {
    public handlePlay = () => {}
  
    public render() {
        return <MButton variant="contained"
            onClick={this.handlePlay}>
            <PlayArrow/>
        </MButton>
    }
  };
  