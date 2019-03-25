import * as React from 'react';
import { AbstractNodeFactory, DiagramEngine, NodeModel } from 'storm-react-diagrams';
import { PlaceNodeModel } from './PlaceNodeModel';
import { PlaceNodeWidget } from './PlaceNodeWidget';


export class PlaceNodeFactory extends AbstractNodeFactory {
	constructor() {
		super("place");
	}

	public generateReactWidget(diagramEngine: DiagramEngine, node: NodeModel): React.ReactElement {
		return <PlaceNodeWidget node={node as PlaceNodeModel} />;
	}

	public getNewInstance() {
		return new PlaceNodeModel();
	}
}