
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { routeList } from './config';

const getRouters = () => {
  return (
    <HashRouter>
      <Switch>
        {
          routeList.map((route) => {
            return (
              <Route key={route.path} path={route.path} render={() => {
                return <route.component />
              }} />
            )
          })
        }
      </Switch>
    </HashRouter>
  )
};

const Router = () => {
  const tempRouters = getRouters()
  return tempRouters
}
export {
  Router
};
