export interface Transition {
    id: number;
    name: string;
}

export interface Arc {
    id: number;
    weight: number;
    in: Place | Transition;
    out: Place | Transition;
}

export interface Place {
    id: number;
    name: string;
    marks: number;
}