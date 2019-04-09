import * as React from 'react';
import { useState } from 'react';
import "storm-react-diagrams/dist/style.min.css";
import './App.css';
import { Button } from './components/Button';
import { Graph } from './nets/Net';
import { Transition, Place, NodeType } from '../petri-nets';
import Dragable from './components/draggable/Dragable';


export interface StateModel {
  petri: {
    rootPlaces: Place[];
    rootTransition: Transition[];
  }
}
  interface DanglingNodes {
    places: Place[];
    transition: Transition[];
  }

const initialModel: StateModel = {
  petri: {
    rootPlaces: [
      {
        type: NodeType.Place,
        id: 1,
        name: "r",
        marks: 0,
        position: {
          x: 200,
          y: 100
        },
        nextNodes: [
          {
            type: NodeType.Arc,
            weight: 0,
            id: 2,
            out: {
              id: 3,
              name: "trans",
              type: NodeType.Transition,
              position: {
                x: 200,
                y: 400
              },
              nextNodes: []
            }
          }
        ]
      }
    ],
    rootTransition: []
  }
};

const App: React.SFC = props => {
  const [model, setModel] = useState<StateModel>({...initialModel});
  const [danglingPlaces, setDanglingPlaces] = useState([]);
  const [danglingTransitions, setDanglingTransitions] = useState([]);


  return (
    <div className="grid-container">
      <aside className="grid-side">
        <Dragable createAt={(type, x, y) => setModel()} >place pra arrastar</Dragable>
        <div>transition pra arrastar</div>
      </aside>
      <main className="grid-content">
        <Graph model={model} />
      </main>
      <footer className="grid-footer">
        <div className="footer-child left-align">
          <Button>icone de lixo - limpar toda tela</Button>
        </div>
        <div className="footer-child play-pause-buttons">
          <div>
            <Button>Reset execution</Button>
            <Button>Play</Button>
            <Button>Stop</Button>
          </div>
        </div>
        <div className="footer-child right-align">
          <Button>Load file</Button>
          <Button>Save file</Button>
        </div>
      </footer>
    </div>
  );
};

export default App;
