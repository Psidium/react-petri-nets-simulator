export interface Coordinates {
    x: number;
    y: number;
}

interface Node {
    nextNodes: Arc[];
}

export interface Transition extends Node {
    id: number;
    name: string;
    position: Coordinates;
}

export interface Arc {
    id: number;
    weight: number;
    in: Place | Transition;
    out: Place | Transition;
}

export interface Place extends Node {
    id: number;
    name: string;
    marks: number;
    position: Coordinates;
}