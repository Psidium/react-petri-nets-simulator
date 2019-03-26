import * as React from 'react';
import { PortWidget } from 'storm-react-diagrams';

interface PortProps {
  name: "top" | "bottom";
  node: any;
}

export const OverlayPort: React.FC<PortProps> = (props) => (<div style={{
  position: "absolute",
  // tslint:disable-next-line:object-literal-sort-keys
  margin: "0",
  top: props.name === "top" ? "0" : "100%",
  left: "50%",
  width: "100%",
  height: "100%",
  marginLeft: "-7.5px",
  marginTop: props.name === "top" ? "none" : "-15px"
}}>
  <PortWidget name={props.name} node={props.node} />
</div>);
