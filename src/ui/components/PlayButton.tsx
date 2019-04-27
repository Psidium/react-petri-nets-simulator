import MButton from "@material-ui/core/Button";
import { PlayArrow } from "@material-ui/icons";
import * as React from 'react';

interface Props { 
    onPlayClicked: () => void
  };

export class PlayButton extends React.Component<Props, {}> {
    public handlePlay = (props: Props) => (event: any) => {
        props.onPlayClicked();
    }
  
    public render() {
        return <MButton variant="contained"
            onClick={this.handlePlay(this.props)}>
            <PlayArrow/>
        </MButton>
    }
  };
  