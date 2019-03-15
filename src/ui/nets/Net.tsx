import * as React from 'react';
import {
  DefaultLinkModel,
  DefaultNodeModel,
  DiagramEngine,
  DiagramModel,
  DiagramWidget
} from "storm-react-diagrams";

export const Graph: React.FunctionComponent = (props) => {
	const engine = new DiagramEngine();
	engine.installDefaultFactories();
	const model = new DiagramModel();

	const node1 = new DefaultNodeModel("Node 1", "rgb(0,192,255)");
	const port1 = node1.addOutPort("Out");
	node1.setPosition(100, 100);

	const node2 = new DefaultNodeModel("Node 2", "rgb(192,255,0)");
	const port2 = node2.addInPort("In");
	node2.setPosition(400, 100);

	// link the ports
	const link1 = port1.link(port2);
	(link1 as DefaultLinkModel).addLabel("Hello World!");

	model.addAll(node1, node2, link1);

	engine.setDiagramModel(model);

	return (<DiagramWidget className="net-canvas" diagramEngine={engine} />);

};