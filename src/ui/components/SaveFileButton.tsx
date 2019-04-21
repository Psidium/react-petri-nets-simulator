import MButton from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { Component } from 'react';
import * as React from 'react';
import { JSONFileIOStream } from '../../io/JSONFileIOStream';
import { NormalizedPlace, NormalizedTransition, NormalizedArc } from '../../petri-nets';

interface Props { 
  text: string,
  model: {
    places: NormalizedPlace[],
    transitions: NormalizedTransition[],
    arcs: NormalizedArc[]
  }
};

export class SaveFileButton extends Component<Props, {}> {
  private fileSelector: HTMLAnchorElement;

  public componentDidMount() {
    this.fileSelector = this.buildFileSelector();
  }
  
  public handleFileSelect = (props: Props) => (e: any) => {
    e.preventDefault();
    const url = JSONFileIOStream.getInstance().mountJSONFileURL(props.model);
    this.fileSelector.setAttribute('href', url);
    this.fileSelector.click();
  }

  public render() {
    return <MButton variant="contained" onClick={this.handleFileSelect(this.props)}>{this.props.text}
        <SaveIcon/>
    </MButton>
  }

  private buildFileSelector():HTMLAnchorElement {
    const fileSelector = document.createElement('a');
    fileSelector.setAttribute('download', 'petri-net.json');
    return fileSelector;
  }

}
  