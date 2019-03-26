
import { Node } from "./index";

export interface Net {
  addStartNodes(nodes: Node | Node[]): void;
}

export class Net implements Net{
  private nodes: Node[];

  public addStartNodes(nodes: Node | Node[]) {
    this.nodes.concat(nodes);
  }
}