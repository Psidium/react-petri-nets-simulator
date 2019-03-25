import { NodeModel, PortModel } from 'storm-react-diagrams';
import { PlacePortModel, Position } from './PlacePortModel';

export class PlaceNodeModel extends NodeModel {
    constructor() {
        super("place");
        this.addPort(new PlacePortModel(Position.Top));
        this.addPort(new PlacePortModel(Position.Bottom));
    }
    public getTopPort(): PortModel {
        return this.getPort("top")!;
    }
    public getBottomPort(): PortModel {
        return this.getPort("bottom")!;
    }
}
