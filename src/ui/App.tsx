import * as React from 'react';
import "storm-react-diagrams/dist/style.min.css";
import './App.css';
import { Button } from './components/Button';
import { Graph } from './nets/Net';


class App extends React.Component {
  public render() {
    return (
      <div className="grid-container">
        <aside className="grid-side">
          <div>place pra arrastar</div>
          <div>transition pra arrastar</div>
        </aside>
        <main className="grid-content">
          <Graph />
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
  }
}

export default App;
