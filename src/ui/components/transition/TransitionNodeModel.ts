import { NodeModel, PortModel } from 'storm-react-diagrams';
import { Position, TransitionPortModel } from './TransitionPortModel';
import { Transition } from '../../../petri-nets';

export class TransitionNodeModel extends NodeModel {
    constructor(
        public realModel: Transition
    ) {
        super("transition");
        this.addPort(new TransitionPortModel(Position.Top));
        this.addPort(new TransitionPortModel(Position.Bottom));
        const { x, y } = realModel.position;
        this.setPosition(x, y);
    }
    public getTopPort(): PortModel {
        return this.getPort("top")!;
    }
    public getBottomPort(): PortModel {
        return this.getPort("bottom")!;
    }
}
