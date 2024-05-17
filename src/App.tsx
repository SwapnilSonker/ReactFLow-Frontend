import React from 'react';
import FlowEditor from './components/FlowEditor';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>React Flow Example</h1>
      <FlowEditor />
    </div>
  );
};

export default App;
