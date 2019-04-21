import MButton from "@material-ui/core/Button";
import { Stop } from "@material-ui/icons";
import * as React from 'react';

export class PauseButton extends React.Component<{}, {}> {
  public handlePause = () => {}

  public render() {
      return <MButton variant="contained"
          onClick={this.handlePause}>
          <Stop/>
      </MButton>
  }
};
