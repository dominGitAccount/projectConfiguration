/*
* @Description: 路由根目录
* @Author: liuyuan
* @Date: 2022-04-19
* @LastEditTime: 2022-04-19
* @LastEditors: Please set LastEditors
* @version: 1.0
*/

import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from 'src/pages/login';
import TimeOut from 'src/pages/error/timeout';
import ContractApproval from 'src/pages/contract-process';
import MiddlewarePage from 'src/pages/middleware-page';
// 无权限，不能访问
import CannotAccess from 'src/pages/error/cannot-access';
import { getToken } from 'src/utils/cookies';
import { getMenuList } from 'src/utils/session';
import { routeList } from './config';

const getRouters = () => {
  return (
    <HashRouter>
      <Switch>
        {/* 智慧门户跳转中间页 */}
        <Route path="/middleware-page" component={MiddlewarePage} />
        {/* 审签单,免密登录后跳转不需要判断菜单列表 */}
        <Route path="/contract-process" component={ContractApproval} />
        {/* 无权限，不能访问 */}
        <Route path="/cannot-access" component={CannotAccess} />
        {/* 登录token失效后跳转页面 */}
        <Route exact path="/timeout" component={TimeOut} />
        {/* 需要提价加载登录页面，因为重定向 */}
        <Route exact path="/login" component={Login} />
        {
          routeList.map((route) => {
            return (
              <Route key={route.path} path={route.path} render={() => {
                // token失效或没有菜单列表时跳到登录页
                if (!getToken() || (!getMenuList() && !route.noMenu)) {
                  return <Redirect to="/login" />
                } else {
                  return <route.component />
                }
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
