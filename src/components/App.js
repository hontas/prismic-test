import React from 'react';
import Languages from './Languages';
import * as Router from './Router';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Router.Nav />
        <Languages />
      </header>
      <main className="App-content">
        <Router.Routes />
      </main>
    </div>
  );
};

export default App;
