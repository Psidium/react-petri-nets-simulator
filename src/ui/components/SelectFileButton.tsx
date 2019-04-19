import MButton from '@material-ui/core/Button';
import { Component } from 'react';
import * as React from 'react';
  
interface Props { 
  text: string 
};

export class SelectFileButton extends Component<Props, {}> {
  private fileSelector: HTMLInputElement;

  public componentDidMount() {
    this.fileSelector = this.buildFileSelector();
  }
  
  public handleFileSelect = (e: any) => {
    e.preventDefault();
    this.fileSelector.click();
  }

  public onFileSelected = (e: any) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    window.alert(`File is Selected: ${file.name}.`);
  }
  
  public render() {
    return <MButton variant="contained" onClick={this.handleFileSelect}>{this.props.text}</MButton>
  }

  private buildFileSelector():HTMLInputElement {
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.onchange = this.onFileSelected;
    return fileSelector;
  }

}
  