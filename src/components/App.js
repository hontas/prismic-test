import React from 'react';
import * as Router from './Router';
import Header from './Header';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <main className="App-content">
        <Router.Routes />
      </main>
    </div>
  );
};

export default App;
