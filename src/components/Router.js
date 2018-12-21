import React, { useContext } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';

import PrismicContext from '../context/PrismicContext';
import LandingPage from '../pages/LandingPage';
// import About from '../pages/about';
// import Contact from '../pages/contact';

import './Router.css';

const i18n = {
  'sv-se': {
    '/': 'Hem',
    '/about/': 'Om',
    '/contact/': 'Kontakt'
  },
  'en-us': {
    '/': 'Home',
    '/about/': 'About',
    '/contact/': 'Contact'
  }
};

export const routes = [
  {
    path: '/',
    comp: LandingPage
  },
  {
    path: '/about/',
    comp: LandingPage
  },
  {
    path: '/contact/',
    comp: LandingPage
  }
];

export const Nav = () => {
  const { locale } = useContext(PrismicContext);
  return (
    <nav>
      <ul className="Router__navList">
        {routes.map(({ path, text }) => (
          <li key={path}>
            <NavLink
              to={path}
              exact
              className="Router__navList__link"
              activeClassName="Router__navList__link--active"
            >
              {i18n[locale][path]}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export const Routes = () => (
  <Switch>
    {routes.map(({ path, comp, exact }) => (
      <Route path={path} exact component={comp} key={path} />
    ))}
    <Route path="*" component={() => <h1>404</h1>} key="404" />
  </Switch>
);
