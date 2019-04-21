
import { NormalizedNode } from "./index";

export interface Net {
  addStartNodes(nodes: NormalizedNode | NormalizedNode[]): void;
}

export class Net implements Net{
  private nodes: NormalizedNode[];

  public addStartNodes(nodes: NormalizedNode | NormalizedNode[]) {
    this.nodes.concat(nodes);
  }
}