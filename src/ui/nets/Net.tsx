import * as React from "react";
import {
  DiagramEngine,
  DiagramModel,
  DiagramWidget,
  PortModel
} from "storm-react-diagrams";
import { StateModel } from "../App";
import { PlaceNodeFactory } from "../components/place/PlaceNodeFactory";
import { PlaceNodeModel } from "../components/place/PlaceNodeModel";
import { PlacePortModel } from "../components/place/PlacePortModel";
import { SimplePortFactory } from "../components/SimplePortFactory";
import { TransitionNodeFactory } from "../components/transition/TransitionNodeFactory";
import { TransitionNodeModel } from "../components/transition/TransitionNodeModel";
import { Place, Arc, Transition, NodeType } from "../../petri-nets";
import { DropTarget, DropTargetConnector, ConnectDropTarget } from 'react-dnd';

interface Prop {
  model: StateModel;
  className?: string;
  connectDropTarget?: ConnectDropTarget
}

export const Graph: React.FunctionComponent<Prop> = props => {
  const engine = new DiagramEngine();
  engine.installDefaultFactories();
  engine.registerPortFactory(
    new SimplePortFactory("place", config => new PlacePortModel(config.name))
  ); // TODO nao sei se functiona
  engine.registerNodeFactory(new PlaceNodeFactory());
  engine.registerNodeFactory(new TransitionNodeFactory());
  const model = new DiagramModel();

  function createPlaces(place: Place): PortModel {
    const placeModel = new PlaceNodeModel();
    const { x, y } = place.position;
    placeModel.setPosition(x, y);
    model.addAll(placeModel);
    place.nextNodes.forEach(arc => createArc(arc, placeModel.getBottomPort()));
    return placeModel.getTopPort();
  }

  function createArc(arc: Arc, bottomPort: PortModel) {
    let topPort: PortModel;
    if (arc.out.type === NodeType.Place) {
      topPort = createPlaces(arc.out);
    } else if (arc.out.type === NodeType.Transition) {
      topPort = createTransition(arc.out);
    } else {
      return;
    }
    const link = bottomPort.createLinkModel()!;
    link.setSourcePort(bottomPort);
    link.setTargetPort(topPort);
    model.addAll(link);
  }

  function createTransition(transition: Transition): PortModel {
    const transModel = new TransitionNodeModel();
    const { x, y } = transition.position;
    transModel.setPosition(x, y);
    model.addAll(transModel);
    transition.nextNodes.forEach(arc =>
      createArc(arc, transModel.getBottomPort())
    );
    return transModel.getTopPort();
  }
  props.model.petri.rootPlaces.forEach(place => createPlaces(place));

  engine.setDiagramModel(model);

  return <DiagramWidget className={props.className} diagramEngine={engine} />
};

class Wrapper extends React.PureComponent<Prop> {
  public render() {
    return (<div ref={this.props.connectDropTarget}  className="net-canvas">
      <Graph className="net-canvas" model={this.props.model} />
    </div>);
  }
}
export const DropablaGraph = DropTarget<Prop>(
  "target",
  {
    drop: () => ({}),
  },
  (connect: DropTargetConnector) => ({
    connectDropTarget: connect.dropTarget(),
  })
)(Wrapper);
