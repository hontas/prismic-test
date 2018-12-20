import React from 'react';
import { Route, Link } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
// import About from '../pages/about';
// import Contact from '../pages/contact';

import './Router.css';

export const routes = [
  {
    path: '/',
    comp: LandingPage,
    exact: true,
    text: 'Hem'
  },
  {
    path: '/about/',
    comp: LandingPage,
    text: 'Om'
  },
  {
    path: '/contact/',
    comp: LandingPage,
    text: 'Kontakt'
  }
];

export const Nav = () => (
  <nav>
    <ul className="Router__navList">
      {routes.map(({ path, text }) => (
        <li key={path}>
          <Link to={path} className="Router__navList__link">
            {text}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export const Routes = () => (
  <>
    {routes.map(({ path, comp, exact }) => (
      <Route path={path} exact component={comp} key={path} />
    ))}
    <Route path="*" component={() => <h1>404</h1>} key="404" />
  </>
);
