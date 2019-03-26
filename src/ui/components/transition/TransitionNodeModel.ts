import { NodeModel, PortModel } from 'storm-react-diagrams';
import { Position, TransitionPortModel } from './TransitionPortModel';

export class TransitionNodeModel extends NodeModel {
    constructor() {
        super("transition");
        this.addPort(new TransitionPortModel(Position.Top));
        this.addPort(new TransitionPortModel(Position.Bottom));
    }
    public getTopPort(): PortModel {
        return this.getPort("top")!;
    }
    public getBottomPort(): PortModel {
        return this.getPort("bottom")!;
    }
}
