import * as React from "react";
import { ConnectDropTarget, DropTarget, DropTargetConnector, XYCoord } from 'react-dnd';
import {
  DiagramEngine,
  DiagramModel,
  DiagramWidget,
  PortModel
} from "storm-react-diagrams";
import { Arc, NodeType, Place, Transition } from "../../petri-nets";
import { StateModel } from "../App";
import { PlaceNodeFactory } from "../components/place/PlaceNodeFactory";
import { PlaceNodeModel } from "../components/place/PlaceNodeModel";
import { PlacePortModel } from "../components/place/PlacePortModel";
import { SimplePortFactory } from "../components/SimplePortFactory";
import { TransitionNodeFactory } from "../components/transition/TransitionNodeFactory";
import { TransitionNodeModel } from "../components/transition/TransitionNodeModel";

interface Prop {
  model: StateModel;
  className?: string;
  connectDropTarget?: ConnectDropTarget
  createAt(type: NodeType, x: number, y: number): void;
  linkDangling(from: Place | Transition, to: Place | Transition): void;
  updateMarks(node: PlaceNodeModel): void;
}

const engine = new DiagramEngine();
engine.installDefaultFactories();
engine.registerPortFactory(
  new SimplePortFactory("place", config => new PlacePortModel(config.name))
); // TODO nao sei se functiona
engine.registerNodeFactory(new PlaceNodeFactory());
engine.registerNodeFactory(new TransitionNodeFactory());

export const Graph: React.FunctionComponent<Prop> = props => {
  const model = new DiagramModel();

  model.addListener({
    nodesUpdated(event): void {
      const { node } = event;
      node.addListener({
        selectionChanged() {
          const place = node as PlaceNodeModel;
          if (place.realModel.type === NodeType.Place) {
            place.realModel.marks++;
            props.updateMarks(place);
          }
        }
      });
    },
    offsetUpdated(event): void {
      // TODO: add logic to update in the props.model the position of each elemennt
    },
    linksUpdated(event): void {
      const { link } = event;
      link.addListener({
        targetPortChanged(event) {
          if (!event.port) { return; }
          if (link.getSourcePort().canLinkToPort(event.port)) {
            const nodeFrom = link.getSourcePort().getNode() as PlaceNodeModel | TransitionNodeModel;
            const nodeTo = link.getTargetPort().getNode() as PlaceNodeModel | TransitionNodeModel;
            props.linkDangling(nodeFrom.realModel, nodeTo.realModel);
          }
        }
      });
    }
  });

  function createPlaces(place: Place): PortModel {
    const placeModel = new PlaceNodeModel(place);
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
    const transModel = new TransitionNodeModel(transition);
    const { x, y } = transition.position;
    transModel.setPosition(x, y);
    model.addAll(transModel);
    transition.nextNodes.forEach(arc =>
      createArc(arc, transModel.getBottomPort())
    );
    return transModel.getTopPort();
  }
  props.model.petri.rootPlaces.forEach(place => createPlaces(place));
  props.model.petri.rootTransition.forEach(transition => createTransition(transition));

  engine.setDiagramModel(model);

  return <DiagramWidget className={props.className} diagramEngine={engine} />
};

class Wrapper extends React.PureComponent<Prop> {
  public domRef: HTMLDivElement | null;

  public render() {
    return (<div ref={el => this.setRef(el)}  className="net-canvas">
      <Graph className="net-canvas"  {...this.props} />
    </div>);
  }

  private setRef(ref: HTMLDivElement | null): void {
    if (this.props.connectDropTarget && ref)  {
      this.props.connectDropTarget(ref);
    }
    this.domRef = ref;
  }

}

async function getCurrentMousePosition(dom: HTMLDivElement): Promise<XYCoord> {
    return new Promise((resolve, reject) => {
        dom.addEventListener("mousemove", function (event: MouseEvent) {
            resolve({
                x: event.pageX - this.offsetLeft,
                y: event.pageY - this.offsetTop
            });
        }, { once: true });
    });
}

export const DropablaGraph = DropTarget<Prop>(
  "target",
  {
    drop: (props, monitor, component: Wrapper) => {
      const { type } = monitor.getItem() as { type: NodeType };
      if (!component.domRef) { throw new Error("lifecycle error: does not have dom ref when needed");}
      getCurrentMousePosition(component.domRef).then(({ x, y }) => {
        props.createAt(type, x, y);
      });
      return undefined;
    },
  },
  (connect: DropTargetConnector) => ({
    connectDropTarget: connect.dropTarget(),
  })
)(Wrapper);
