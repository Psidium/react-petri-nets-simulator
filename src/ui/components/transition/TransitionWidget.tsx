import * as React from 'react';
import { OverlayPort } from '../OverlayPort';

interface Props {
    node?: any;
}

export const TransitionNodeWidget: React.FC<Props> = ({ node }) => {
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
        {node && <OverlayPort name="top" node={node} />}
        {node && <OverlayPort name="bottom" node={node} />}
      </div>
      );
};