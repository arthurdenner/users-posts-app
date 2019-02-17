import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { EmptyContent } from '../components/empty-content';
import { ReturnToUsers } from '../components/return-to-users';
import { Posts } from './posts';
import { Users } from './users';

const Application = () => (
  <BrowserRouter>
    <Switch>
      <Redirect exact from="/" to="/users" />
      <Redirect exact from="/users/:userId" to="/users/:userId/posts" />
      <Route exact path="/users" component={Users} />
      <Route exact path="/users/:userId/posts" component={Posts} />
      <Route
        render={() => (
          <EmptyContent message="This page doesn't exist">
            <ReturnToUsers />
          </EmptyContent>
        )}
      />
    </Switch>
  </BrowserRouter>
);

export default hot(Application);
