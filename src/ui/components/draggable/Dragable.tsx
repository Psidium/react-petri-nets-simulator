import * as React from 'react';
import {
  DropTarget,
  ConnectDropTarget,
  DropTargetMonitor,
  XYCoord
} from "react-dnd";
import { NodeType } from '../../../petri-nets';

interface DragableProps {
    type: NodeType;
    connectDropTarget: ConnectDropTarget;
    createAt(type: NodeType, x: number, y: number): void;
  }

class Dragable extends React.PureComponent<DragableProps> {
    public dropAt(x: number, y: number) {
        this.props.createAt(this.props.type, x, y);
    }

    public render() {
        return this.props.connectDropTarget(
            <div>
                {this.props.children}
            </div>
        );
    } 
};

export default DropTarget(
    'target',
    {
        drop(
            props: DragableProps,
            monitor: DropTargetMonitor,
            component: Dragable | null,
        ) {
            if (!component) { return; }

            const { x, y } = monitor.getDifferenceFromInitialOffset() as XYCoord
            component.dropAt(x, y);
        }
    },
    (connect: any) => ({connectDropTarget: connect.dropTarget()})
)(Dragable)