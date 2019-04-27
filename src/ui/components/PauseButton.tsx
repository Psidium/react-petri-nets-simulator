import MButton from "@material-ui/core/Button";
import { Stop } from "@material-ui/icons";
import * as React from 'react';

interface Props {
  onPauseClicked: () => void;
}

export class PauseButton extends React.Component<Props, {}> {
  public handlePause = (props: Props) => (e: any) => {
    props.onPauseClicked();
  }

  public render() {
      return <MButton variant="contained"
          onClick={this.handlePause(this.props)}>
          <Stop/>
      </MButton>
  }
};
