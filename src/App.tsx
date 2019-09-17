import React from 'react';
import Header from "./components/shared/Header";
import './App.scss';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="dictionaries-container">
        <div className="list">

        </div>
        <div className="editor">

        </div>
      </div>
    </div>
  );
}

export default App;
