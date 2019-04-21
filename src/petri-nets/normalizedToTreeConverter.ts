import {
  NodeType,
  NormalizedArc,
  NormalizedPlace,
  NormalizedTransition,
  Place,
  Transition
} from ".";

function findNodeWithIdInNode(id: number, node: Place | Transition): Place | Transition | undefined {
    if (node.id === id) {
        return node;
    }
    for (const { out } of node.nextNodes) {
        return findNodeWithIdInNode(id, out);
    }
    return undefined;
}

export function normalizedToTreeConverter(
  places: NormalizedPlace[],
  transitions: NormalizedTransition[],
  arcs: NormalizedArc[]
): {
  rootPlaces: Place[];
  rootTransition: Transition[];
} {
  const rootPlaces: Place[] = places.map(place => ({...place, nextNodes: []}));
  const rootTransition: Transition[] = transitions.map(trans => ({...trans, nextNodes: []}));
  arcs.forEach(arc => {
    if (arc.in && arc.out) {
      const outNodes: Array<Place | Transition> = arc.out.type === NodeType.Place ? rootPlaces : rootTransition;
      const indexToRemove = outNodes.findIndex(({ id }) => id === arc.out.id);
      const [ removedNode ] = outNodes.splice(indexToRemove);
      const parentItem = extractNodeFromAnywhere(arc, rootPlaces, rootTransition);
      if (!parentItem) { throw new Error("CANNOT FIND ARC.OUT from any of the arrays.");}
      parentItem.nextNodes.push({ ...arc, in: parentItem, out: removedNode});
    }
  });

  return {
    rootPlaces,
    rootTransition
  };
}
function extractNodeFromAnywhere(arc: NormalizedArc, rootPlaces: Place[], rootTransition: Transition[]) {
  const [ inNodesPossible, inNodesImpossible ] : Array<Array<Place | Transition>> = arc.in.type === NodeType.Place ? [ rootPlaces, rootTransition ] : [ rootTransition, rootPlaces ];
  let parentItem = inNodesPossible.reduce((acc, node) => acc || findNodeWithIdInNode(arc.in.id, node), undefined);
  if (!parentItem) {
    //search from the other tree
    parentItem = inNodesImpossible.reduce((acc, node) => acc || findNodeWithIdInNode(arc.in.id, node), undefined)
  }
  return parentItem;
}

