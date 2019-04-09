export enum NodeType {
    Arc,
    Transition,
    Place
}
export interface Coordinates {
    x: number;
    y: number;
}

export interface Node {
    id: number;
    name: string;
    position: Coordinates;
    nextNodes: Arc[];
}

export interface Transition extends Node {
    type: NodeType.Transition;
}

export interface Arc {
    type: NodeType.Arc;
    id: number;
    weight: number;
    in?: Place | Transition;
    out: Place | Transition;
}

export interface Place extends Node {
    type: NodeType.Place;
    marks: number;
}