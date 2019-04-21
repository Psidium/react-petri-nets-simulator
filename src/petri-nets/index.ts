export enum NodeType {
    Arc,
    Transition,
    Place
}
export interface Coordinates {
    x: number;
    y: number;
}

export interface Node extends NormalizedNode {
    nextNodes: Arc[];
}

export interface Place extends NormalizedPlace, Node {};
export interface Transition extends NormalizedTransition, Node {};
export interface Arc extends NormalizedArc {
    in: Place | Transition;
    out: Place | Transition;
};


export interface NormalizedArc {
    type: NodeType.Arc;
    id: number;
    weight: number;
    in: NormalizedPlace | NormalizedTransition;
    out: NormalizedPlace | NormalizedTransition;
}

export interface NormalizedPlace extends NormalizedNode {
    type: NodeType.Place;
    marks: number;
}

export interface NormalizedTransition extends NormalizedNode {
    type: NodeType.Transition;
}

export interface NormalizedNode {
    id: number;
    name: string;
    position: Coordinates;
}
