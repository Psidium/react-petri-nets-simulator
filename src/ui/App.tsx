import * as React from "react";
import { useState } from "react";
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from "react-dnd-html5-backend";
import "storm-react-diagrams/dist/style.min.css";
import { NodeType, Place, Transition } from "../petri-nets";
import "./App.css";
import { Button, PauseButton, PlayButton } from "./components/Button";
import { Dragable } from "./components/draggable/Dragable";
import { PlaceNodeWidget } from './components/place/PlaceNodeWidget';
import { TransitionNodeWidget } from './components/transition/TransitionWidget';
import { DropablaGraph } from "./nets/Net";
import MButton from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { LoadFileButton } from './components/LoadFileButton';
import { SaveFileButton } from './components/SaveFileButton';
import { JSONFileIOStream } from '../io/JSONFileIOStream';

export interface StateModel {
  petri: {
    rootPlaces: Place[];
    rootTransition: Transition[];
  };
}

const App: React.SFC = props => {
  const [ danglingPlaces ] = useState<Place[]>([{
    id: 1,
    marks: 0,
    name: "a",
    position: {
      x: 100, 
      y: 200
    },
    type: NodeType.Place,
    nextNodes: []
  }]);
  const [danglingTransitions, setDanglingTransitions] = useState<Transition[]>(
    []
  );

  function addDragged(type: NodeType, x: number, y: number): void {
    if (type === NodeType.Transition) {
      setDanglingTransitions([
        ...danglingTransitions,
        {
          id: Math.random(),
          name: "trans",
          type: NodeType.Transition,
          position: { x, y },
          nextNodes: []
        }
      ]);
    }
  }

  async function onLoadFileSelected(file: File): Promise<void> {
    const loadedData = await JSONFileIOStream.getInstance().readJSON(file);
    //Data to populate into the model
    console.log(loadedData);
  }

  return (
    <DragDropContextProvider backend={HTML5Backend}>
    <div className="grid-container">
      <aside className="grid-side">
        <Dragable createAt={addDragged} type={NodeType.Place}>
          <PlaceNodeWidget />
        </Dragable>
        <Dragable createAt={addDragged} type={NodeType.Transition}>
          <TransitionNodeWidget />
        </Dragable>
      </aside>
      <main className="grid-content">
        <DropablaGraph
          model={{
            petri: {
              rootPlaces: danglingPlaces,
              rootTransition: danglingTransitions
            }
          }}
        />
      </main>
      <footer className="grid-footer">
        <div className="footer-child left-align">
          <MButton variant="contained">Delete
            <DeleteIcon />
          </MButton>
        </div>
        <div className="footer-child play-pause-buttons">
          <div>
            <Button>Reset execution</Button>
            <PlayButton/>
            <PauseButton/>
          </div>
        </div>
        <div className="footer-child right-align">
          <LoadFileButton text="Load File"
            onFileSelected={onLoadFileSelected}/> 
          <SaveFileButton text="Save File"
            model={danglingPlaces}/>
        </div>
      </footer>
      </div>
 </DragDropContextProvider>
  );
};

export default App;
