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
    id: 1,
    marks: 0,
    name: "a",
    position: {
      x: 100, 
      y: 200
    },
    type: NodeType.Place,
  }]);
  const [transitions, setTransitions] = useState<NormalizedTransition[]>([]);
  const [arcs, setArcs] = useState<NormalizedArc[]>([]);

  function addDragged(type: NodeType, x: number, y: number): void {
    if (type === NodeType.Transition) {
      setTransitions([
        ...transitions,
        {
          id: Math.random(),
          name: "trans",
          type: NodeType.Transition,
          position: { x, y },
        }
      ]);
    } else {
      setPlaces([
        ...places,
        {
          id: Math.random(),
          name: "place",
          type: NodeType.Place,
          position: { x, y },
          marks: 0
        }
      ])
    }
  }

  function linkDangling(from: Transition | Place, to: Transition | Place): void {
    setArcs([...arcs, {
      id: Math.random(),
      type: NodeType.Arc,
      in: from,
      out: to,
      weight: 0
    }]);
  }

  async function onLoadFileSelected(file: File): Promise<void> {
    const loadedData = await JSONFileIOStream.getInstance().readJSON(file);
    // Data to populate into the model
    console.log(loadedData);
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
          model={{
            petri: normalizedToTreeConverter(places, transitions, arcs)
          }}
        />
      </main>
      <footer className="grid-footer">
        <div className="footer-child left-align">
          <DeleteButton/>
        </div>
        <div className="footer-child play-pause-buttons">
          <div>
            <RestartButton/>
            <PlayButton/>
            <PauseButton/>
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
