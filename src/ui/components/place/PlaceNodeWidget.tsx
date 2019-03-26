import * as React from 'react';
import { OverlayPort } from '../OverlayPort';
import { PlaceNodeModel } from './PlaceNodeModel';

export interface PlaceWidgetProps {
    node: PlaceNodeModel;
}

export const PlaceNodeWidget: React.FC<PlaceWidgetProps> = (props) => {
    const strokeWidth = 7;
    return (
      <div
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