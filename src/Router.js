import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const LazyHome = lazy(() => import('./pages/Home'));
const LazyAbout = lazy(() => import('./pages/About'));
const LazyContact = lazy(() => import('./pages/Contact'));

const withSuspense = Comp => props => (
  <Suspense fallback={<div>Loading...</div>}>
    <Comp {...props} />
  </Suspense>
);

function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
            <li>
              <Link to="/contact/">Contact</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={withSuspense(LazyHome)} />
        <Route path="/about/" component={withSuspense(LazyAbout)} />
        <Route path="/contact/" component={withSuspense(LazyContact)} />
      </div>
    </Router>
  );
}

export default AppRouter;
