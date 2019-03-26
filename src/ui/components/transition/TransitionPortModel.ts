import * as _ from "lodash";
import { DefaultLinkModel, DiagramEngine, PortModel } from "storm-react-diagrams";

export const enum Position {
    Top = "top",
    Bottom = "bottom"
}
export class TransitionPortModel extends PortModel {

    constructor(public position: Position) {
        super(position, "transition");
    }
    public serialize() {
       return _.merge(super.serialize(), {
           position: this.position
       });
    }

    public deSerialize(data: any, engine: DiagramEngine) {
        super.deSerialize(data, engine);
        this.position = data.position;
    }

    public createLinkModel() {
        return new DefaultLinkModel();
    }
}
