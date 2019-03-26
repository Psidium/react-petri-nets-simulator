import * as React from 'react';
import {
  DiagramEngine,
  DiagramModel,
  DiagramWidget
} from "storm-react-diagrams";
import { PlaceNodeFactory } from '../components/place/PlaceNodeFactory';
import { PlaceNodeModel } from '../components/place/PlaceNodeModel';
import { PlacePortModel } from '../components/place/PlacePortModel';
import { SimplePortFactory } from '../components/SimplePortFactory';
import { TransitionNodeFactory } from '../components/transition/TransitionNodeFactory';
import { TransitionNodeModel } from '../components/transition/TransitionNodeModel';

export const Graph: React.FunctionComponent = (props) => {
	const engine = new DiagramEngine();
	engine.installDefaultFactories();
	engine.registerPortFactory(new SimplePortFactory("place", (config) => new PlacePortModel(config.name))) // TODO nao sei se functiona
	engine.registerNodeFactory(new PlaceNodeFactory());
	engine.registerNodeFactory(new TransitionNodeFactory());
	const model = new DiagramModel();

	const node1 = new TransitionNodeModel();
	const port1 = node1.getBottomPort();
	node1.setPosition(200, 100);

	const placeModel = new PlaceNodeModel();
	const port2 = placeModel.getTopPort();
	placeModel.setPosition(200, 400);

	// link the ports
	const link1 = port1.createLinkModel()!;
	link1.setSourcePort(port1);
	link1.setTargetPort(port2);

	model.addAll(node1, placeModel, link1);

	engine.setDiagramModel(model);

	return (<DiagramWidget className="net-canvas" diagramEngine={engine} />);

};