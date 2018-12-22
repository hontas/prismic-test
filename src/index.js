import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/App';
import { PrismicProvider } from './context/PrismicContext';
import * as serviceWorker from './serviceWorker';

import './index.css';

// make build work locally and on github pages
let basename = '';
if (process.env.PUBLIC_URL) {
  basename = new URL(process.env.PUBLIC_URL).pathname;
}

ReactDOM.render(
  <PrismicProvider>
    <Router basename={basename}>
      <App />
    </Router>
  </PrismicProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
