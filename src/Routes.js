import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router, Route, Link, Switch,
} from 'react-router-dom';
import AuthenticatedRoute from './components/AuthenticatedRoutes';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';

const LazyHome = lazy(() => import(/* webpackChunkName: "pages/Home" */ './pages/Home/index'));
const LazyAbout = lazy(() => import(/* webpackChunkName: "pages/About" */ './pages/About/index'));
const LazyContact = lazy(() => import(/* webpackChunkName: "pages/Contact" */ './pages/Contact/index'));
const LazyNotFound = lazy(() => import(/* webpackChunkName: "pages/Contact" */ './pages/NotFound/index'));
const LazyLogin = lazy(() => import(/* webpackChunkName: "pages/Contact" */ './pages/Login/index'));
const LazySignup = lazy(() => import(/* webpackChunkName: "pages/Contact" */ './pages/Signup/index'));

const Routes = props => (
  <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      <AuthenticatedRoute path="/" exact component={LazyHome} props={props} />
      <AuthenticatedRoute path="/about" component={LazyAbout} props={props} />
      <AuthenticatedRoute path="/contact" component={LazyContact} props={props} />
      <UnauthenticatedRoute path="/login" exact component={LazyLogin} props={props} />
      <UnauthenticatedRoute path="/signup" exact component={LazySignup} props={props} />
      <Route component={LazyNotFound} />
    </Switch>
  </Suspense>
);

export default Routes;
