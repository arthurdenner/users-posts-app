import React, { lazy, Suspense } from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
const NotFoundPage = lazy(() => import('../components/not-found'));
const Posts = lazy(() => import('./posts'));
const Users = lazy(() => import('./users'));

const Application = () => (
  <BrowserRouter>
    <Suspense fallback={null}>
      <Switch>
        <Redirect exact from="/" to="/users" />
        <Redirect exact from="/users/:userId" to="/users/:userId/posts" />
        <Route exact path="/users" component={Users} />
        <Route exact path="/users/:userId/posts" component={Posts} />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  </BrowserRouter>
);

export default hot(Application);
