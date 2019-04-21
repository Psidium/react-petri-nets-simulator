import { NodeModel, PortModel } from 'storm-react-diagrams';
import { Place } from '../../../petri-nets';
import { PlacePortModel, Position } from './PlacePortModel';

export class PlaceNodeModel extends NodeModel {
    constructor(
        public realModel: Place
    ) {
        super("place");
        this.addPort(new PlacePortModel(Position.Top));
        this.addPort(new PlacePortModel(Position.Bottom));
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
