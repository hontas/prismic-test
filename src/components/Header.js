import React from 'react';

import * as Router from './Router';
import Languages from './Languages';
import PrismicRefs from './PrismicRefs';

import './Header.css';

export default () => (
  <header className="Header">
    <Router.Nav />
    <PrismicRefs className="Header__refs" />
    <Languages className="Header__lang" />
  </header>
);
