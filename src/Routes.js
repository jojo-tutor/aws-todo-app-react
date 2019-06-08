import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router, Route, Link, Switch,
} from 'react-router-dom';

const LazyHome = lazy(() => import(/* webpackChunkName: "pages/Home" */ './pages/Home/index'));
const LazyAbout = lazy(() => import(/* webpackChunkName: "pages/About" */ './pages/About/index'));
const LazyContact = lazy(() => import(/* webpackChunkName: "pages/Contact" */ './pages/Contact/index'));
const LazyNotFound = lazy(() => import(/* webpackChunkName: "pages/Contact" */ './pages/NotFound/index'));

function Routes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/" exact component={LazyHome} />
        <Route path="/about/" component={LazyAbout} />
        <Route path="/contact/" component={LazyContact} />
        <Route component={LazyNotFound} />
      </Switch>
    </Suspense>
  );
}

export default Routes;
