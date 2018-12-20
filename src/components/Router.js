import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from '../pages/home';
import About from '../pages/about';
import Contact from '../pages/contact';

export const routes = [
  {
    path: '/',
    comp: Home,
    exact: true,
    text: 'Hem'
  },
  {
    path: '/about/',
    comp: About,
    text: 'Om'
  },
  {
    path: '/contact/',
    comp: Contact,
    text: 'Kontakt'
  }
];

export const Nav = () => (
  <nav>
    <ul>
      {routes.map(({ path, text }) => (
        <li>
          <Link to={path}>{text}</Link>
        </li>
      ))}
    </ul>
  </nav>
);

export const Routes = () => (
  <div>
    <Route path="/" exact component={Home} />
    <Route path="/about/" component={About} />
    <Route path="/contact/" component={Contact} />
  </div>
);
