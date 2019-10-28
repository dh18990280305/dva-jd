import React from 'react';
import { Router, Route, Switch,Redirect } from 'dva/router';
import Layout from './routes/Layout'
import Index from './routes/Index'
import Search from './routes/Search'
import GoodsList from './routes/GoodsList'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/search" component={Search}/>
        <Route exact path="/list" component={GoodsList}/>
        <Redirect exact path="/" to="/index" />
        <Route path="/" component={Layout}></Route>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
