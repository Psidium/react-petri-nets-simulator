import * as React from 'react';
import "storm-react-diagrams/dist/style.min.css";
import './App.css';
import { Graph } from './nets/Net';


class App extends React.Component {
  public render() {
    return (
      <div className="bg">
        <Graph />
      </div>
    );
  }
}

export default App;
