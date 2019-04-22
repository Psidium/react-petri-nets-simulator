import MButton from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import * as React from 'react';

interface Props { 
  onDeleteClicked: () => void
};

export class DeleteButton extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  public handleDelete = (props: Props) => (e: any) => {
    props.onDeleteClicked()
  }

  public render() {
      return <MButton variant="contained"
          onClick={this.handleDelete(this.props)}>
          <DeleteIcon/>
      </MButton>
  }
};