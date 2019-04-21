import MButton from '@material-ui/core/Button';
import LoadIcon from '@material-ui/icons/FolderOpen';
import { Component } from 'react';
import * as React from 'react';

interface Props { 
  onFileSelected: (file: File) => void
};

export class LoadFileButton extends Component<Props, {}> {
  private fileSelector: HTMLInputElement;

  constructor(props: Props) {
    super(props);
  }

  public componentDidMount() {
    this.fileSelector = this.buildFileSelector();
  }
  
  public handleFileSelect = (e: any) => {
    e.preventDefault();
    this.fileSelector = this.buildFileSelector();
    this.fileSelector.click();
  }

  public async onDialogFileSelected(e: any) {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    this.props.onFileSelected(file);
  }
  
  public render() {
    return <MButton variant="contained" 
      onClick={this.handleFileSelect}>
      <LoadIcon/>
    </MButton>
  }

  private buildFileSelector():HTMLInputElement {
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.onchange = this.onDialogFileSelected.bind(this);
    return fileSelector;
  }

}
  