import { NodeModel, PortModel } from 'storm-react-diagrams';

export class PlaceNodeModel extends NodeModel {
    constructor() {
        super("place");
        this.addPort(new PortModel("top"));
        this.addPort(new PortModel("bottom"));
    }
    public getTopPort(): PortModel {
        return this.getPort("top")!;
    }
    public getBottomPort(): PortModel {
        return this.getPort("bottom")!;
    }
}