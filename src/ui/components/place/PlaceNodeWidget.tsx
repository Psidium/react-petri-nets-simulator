import * as React from 'react';
import { OverlayPort } from '../OverlayPort';
import { PlaceNodeModel } from './PlaceNodeModel';

export interface PlaceWidgetProps {
    node?: PlaceNodeModel;
}

export class PlaceNodeWidget extends React.Component<PlaceWidgetProps, {}> {
  public formatMarks(node?: PlaceNodeModel) {
    return node && node.realModel.marks;
  }

  public render() {
    const strokeWidth = 7;
    return <div
        style={{
          backgroundColor: "rgba(0,0,0,0)",
          height: "50px",
          position: "relative",
          width: "50px"
        }}
      >
        <svg viewBox="0 0 100 100">
          <circle
            r={50 - strokeWidth}
            cx="50%"
            cy="50%"
            stroke="black"
            strokeWidth={strokeWidth}
            fill="white"/>
        </svg>
        { this.props.node && <OverlayPort name="top" node={this.props.node} /> }
        { this.props.node && <OverlayPort name="bottom" node={this.props.node} /> }
        <text>{this.formatMarks(this.props.node)}</text>
      </div>;
  }
};