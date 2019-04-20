import * as React from 'react';
import {
  ConnectDragSource,
  DragSource,
  DragSourceConnector,
  DragSourceMonitor,
} from "react-dnd";
import { NodeType } from '../../../petri-nets';

interface DragableProps {
    type: NodeType;
    // Collected Props
    isDragging?: boolean;
    connectDragSource?: ConnectDragSource;
}

class DragableComp extends React.PureComponent<DragableProps> {
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
            return null;
        },
    },
    (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    })
)(DragableComp)