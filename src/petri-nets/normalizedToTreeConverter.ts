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

      const inNodes: Array<Place | Transition> = arc.in.type === NodeType.Place ? rootPlaces : rootTransition;
      const parentItem = inNodes.reduce((acc, node) => acc || findNodeWithIdInNode(arc.in.id, node), undefined);
      if (!parentItem) { throw new Error("CANNOT FIND PLACE OR TRANSITION FROM ARC")}
      parentItem.nextNodes.push({ ...arc, in: parentItem, out: removedNode});
    }
  });

  return {
    rootPlaces,
    rootTransition
  };
}
