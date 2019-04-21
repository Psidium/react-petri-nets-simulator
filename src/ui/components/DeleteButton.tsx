import MButton from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import * as React from 'react';

export class DeleteButton extends React.Component<{}, {}> {
  public handleDelete = () => {}

  public render() {
      return <MButton variant="contained"
          onClick={this.handleDelete}>
          <DeleteIcon/>
      </MButton>
  }
};