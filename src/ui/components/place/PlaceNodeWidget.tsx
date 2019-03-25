import * as React from 'react';
import { PortWidget } from 'storm-react-diagrams';
import { PlaceNodeModel } from './PlaceNodeModel';

interface PlaceWidgetProps {
    node: PlaceNodeModel;
}

interface PortProps extends PlaceWidgetProps {
  name: "top" | "bottom";
}

const OverlayPort: React.FC<PortProps> = (props) => (
  <div style={{
    position: "absolute",
    margin: "0",
    top: props.name === "top" ? "0" : "100%",
    left: "50%",
    width: "100%",
    height: "100%",
    marginLeft: "-7.5px",
    marginTop: props.name === "top" ? "none" : "-15px"
  }} >
    <PortWidget name={props.name} node={props.node} />
  </div>
);

export const PlaceNodeWidget: React.FC<PlaceWidgetProps> = (props) => {
    const strokeWidth = 7;
    return (
      <div
        className="place-node"
        style={{
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
            fill="white"
          />
        </svg>
        <OverlayPort name="top" {...props} />
        <OverlayPort name="bottom" {...props} />
      </div>
    );
};