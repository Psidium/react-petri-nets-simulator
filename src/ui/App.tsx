import * as React from "react";
import { useState } from "react";
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from "react-dnd-html5-backend";
import "storm-react-diagrams/dist/style.min.css";
import { JSONFileIOStream } from '../io/JSONFileIOStream';
import { NodeType, NormalizedArc, NormalizedPlace, NormalizedTransition, Place, Transition } from "../petri-nets";
import { normalizedToTreeConverter } from '../petri-nets/normalizedToTreeConverter';
import "./App.css";
import { DeleteButton } from './components/DeleteButton';
import { Dragable } from "./components/draggable/Dragable";
import { LoadFileButton } from './components/LoadFileButton';
import { PauseButton } from './components/PauseButton';
import { PlaceNodeModel } from './components/place/PlaceNodeModel';
import { PlaceNodeWidget } from './components/place/PlaceNodeWidget';
import { PlayButton } from './components/PlayButton';
import { RestartButton } from './components/RestartButton';
import { SaveFileButton } from './components/SaveFileButton';
import { TransitionNodeWidget } from './components/transition/TransitionWidget';
import { DropablaGraph } from "./nets/Net";

export interface StateModel {
  petri: {
    rootPlaces: Place[];
    rootTransition: Transition[];
  };
}

const App: React.SFC = props => {
  const [ places, setPlaces ] = useState<NormalizedPlace[]>([{
    color: "black",
    id: 1,
    in: null,
    marks: 0,
    name: "a",
    out: null,
    position: {
      x: 100, 
      y: 200
    },
    type: NodeType.Place
  }]);
  const [transitions, setTransitions] = useState<NormalizedTransition[]>([]);
  const [arcs, setArcs] = useState<NormalizedArc[]>([]);

  function addDragged(type: NodeType, x: number, y: number): void {
    if (type === NodeType.Transition) {
      setTransitions([
        ...transitions,
        {
          id: Math.random(),
          in: null,
          name: "trans",
          out: null,
          position: { x, y },
          type: NodeType.Transition
        }
      ]);
    } else {
      setPlaces([
        ...places,
        {
          color: "black",
          id: Math.random(),
          in: null,
          marks: 0,
          name: "place",
          out: null,
          position: { x, y },
          type: NodeType.Place
        }
      ])
    }
  }

  function setArcToNodes(arc: NormalizedArc) {
    if (arc.in.type === NodeType.Place) {
      places.find(place => place.id === arc.in.id)!.out = arc;
      transitions.find(transition => transition.id === arc.out.id)!.in = arc;
    } else {
      places.find(place => place.id === arc.out.id)!.in = arc;
      transitions.find(transition => transition.id === arc.in.id)!.out = arc;
    }
  }

  function linkDangling(from: Transition | Place, to: Transition | Place): void {
    const arcToBeUpdated = arcs.find(arc => from.id === arc.in.id && to.id === arc.out.id);
    if (arcToBeUpdated) {
      arcToBeUpdated.weight++;
      setArcs([...arcs]);
    } else {
      const arc = {
        id: Math.random(),
        in: from,
        out: to,
        type: NodeType.Arc,
        weight: 1
      } as NormalizedArc;
      setArcs([...arcs, arc]);
      setArcToNodes(arc);
    }
  }

  function updateMarks(node: PlaceNodeModel) {
    const placeToBeUpdated = places.find(place => place.id === node.realModel.id);
    if (placeToBeUpdated) {
      placeToBeUpdated.marks = node.realModel.marks;
    }
    setPlaces([...places]);
  }

  async function onLoadFileSelected(file: File): Promise<void> {
    const loadedData = await JSONFileIOStream.getInstance().readJSON(file);
    // Data to populate into the model
    console.log(loadedData);
  }

  function onDelete() {
    setArcs([]);
    setPlaces([]);
    setTransitions([]);
  }

  function onPlay() {
    const habilitatedPlaces = places.filter(place => place.out !== null && place.out.weight === place.marks);
    habilitatedPlaces.forEach(place => place.color = "#16F011");
    setPlaces([...places]);
  }

  function onPause() {
    places.forEach(place => place.color = "black");
    setPlaces([...places]);
  }

  return (
    <DragDropContextProvider backend={HTML5Backend}>
    <div className="grid-container">
      <aside className="grid-side">
        <Dragable type={NodeType.Place}>
          <PlaceNodeWidget />
        </Dragable>
        <Dragable type={NodeType.Transition}>
          <TransitionNodeWidget />
        </Dragable>
      </aside>
      <main className="grid-content">
        <DropablaGraph
          createAt={addDragged}
          linkDangling={linkDangling}
          updateMarks={updateMarks}
          model={{
            petri: normalizedToTreeConverter(places, transitions, arcs)
          }}
        />
      </main>
      <footer className="grid-footer">
        <div className="footer-child left-align">
          <DeleteButton onDeleteClicked={onDelete}/>
        </div>
        <div className="footer-child play-pause-buttons">
          <div>
            <RestartButton/>
            <PlayButton onPlayClicked={onPlay}/>
            <PauseButton onPauseClicked={onPause}/>
          </div>
        </div>
        <div className="footer-child right-align">
          <LoadFileButton onFileSelected={onLoadFileSelected}/> 
          <SaveFileButton model={{places, transitions, arcs}}/>
        </div>
      </footer>
      </div>
 </DragDropContextProvider>
  );
};

export default App;
