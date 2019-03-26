import * as React from 'react';
import { AbstractNodeFactory, DiagramEngine, NodeModel } from 'storm-react-diagrams';
import { TransitionNodeModel } from './TransitionNodeModel';
import { TransitionNodeWidget } from './TransitionWidget';


export class TransitionNodeFactory extends AbstractNodeFactory {
	constructor() {
		super("transition");
	}

	public generateReactWidget(diagramEngine: DiagramEngine, node: NodeModel): React.ReactElement {
		return <TransitionNodeWidget node={node} />;
	}

	public getNewInstance() {
		return new TransitionNodeModel();
	}
}