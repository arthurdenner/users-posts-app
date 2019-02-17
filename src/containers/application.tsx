import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Posts } from './posts';
import { Users } from './users';

const Application = () => (
  <BrowserRouter>
    <Switch>
      <Redirect exact from="/" to="/users" />
      <Route exact path="/users" component={Users} />
      <Route path="/users/:userId/posts" component={Posts} />
    </Switch>
  </BrowserRouter>
);

export default hot(Application);
