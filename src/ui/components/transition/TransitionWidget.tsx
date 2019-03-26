import * as React from 'react';
import { OverlayPort } from '../OverlayPort';

interface Props {
    node: any;
}

export const TransitionNodeWidget: React.FC<Props> = (props) => {
    return (
      <div
        style={{
          height: "10px",
          position: "relative",
          width: "100px"
        }}
      >
        <svg viewBox="0 0 100 100">
            <rect width="100" height="10" fill="black" />
        </svg>
        <OverlayPort name="top" {...props} />
        <OverlayPort name="bottom" {...props} />
      </div>
      );
};