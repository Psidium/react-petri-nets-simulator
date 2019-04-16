import * as React from 'react';
import {
  ConnectDragSource,
  DragSource,
  DragSourceConnector,
  DragSourceMonitor
} from "react-dnd";
import { NodeType } from '../../../petri-nets';

interface DragableProps {
    type: NodeType;
    // Collected Props
    isDragging?: boolean;
    connectDragSource?: ConnectDragSource;
    createAt(type: NodeType, x: number, y: number): void;
}

class DragableComp extends React.PureComponent<DragableProps> {
    public dropAt(x: number, y: number) {
        this.props.createAt(this.props.type, x, y);
    }

    public render() {
        return (
            <div ref={this.props.connectDragSource}>
                {this.props.children}
            </div>
        )
    } 
};

export const Dragable = DragSource(
    'target',
    {
        beginDrag: (props: DragableProps) => ({ type: props.type }),
        endDrag(props: DragableProps, monitor: DragSourceMonitor) {
            const item = monitor.getItem();
            const dropResult = monitor.getDropResult();
            debugger;
            if (dropResult) {
                alert(`You dropped ${item.name} into ${dropResult.name}!`)
            }
        },
    },
    (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    })
)(DragableComp)