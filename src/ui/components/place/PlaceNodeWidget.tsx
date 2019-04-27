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

  public formatColor(node?: PlaceNodeModel) {
    return node ? node.realModel.color : "black";
  }

  public render() {
    const strokeWidth = 7;
    return <div
        style={{
          backgroundColor: "rgba(0,0,0,0)",
          height: "50px",
          position: "relative",
          width: "50px"
        }}>
        <svg viewBox="0 0 100 100">
          <g>
            <circle 
              r={50 - strokeWidth}
              cx="50%"
              cy="50%"
              stroke={this.formatColor(this.props.node)}
              strokeWidth={strokeWidth}
              fill="white"/>
            <text
              textAnchor="middle"
              x="50"
              y="60"
              fontSize="35"
              fill="black">
              {this.formatMarks(this.props.node)}
            </text>
          </g>
        </svg>
        { this.props.node && <OverlayPort name="top" node={this.props.node} /> }
        { this.props.node && <OverlayPort name="bottom" node={this.props.node} /> }
      </div>;
  }
};