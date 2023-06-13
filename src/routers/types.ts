/*
 * @Description: 路由类型
 * @Author: liuyuan
 * @Date: 2022-04-27
 * @LastEditTime: 2022-04-27
 * @LastEditors: Please set LastEditors
 * @version: 1.0
 */

import { IMenuItem } from 'src/stores/types/layout-types';
interface IMetaType {
  [propName: string]: any;
}

interface IFunctionalImportType {
  (): any;
}

type ReactElementType = JSX.Element;

// 调用接口，根据接口数据定义类型
interface IRoutesItemType {
  path: string;
  redirect?: string;
  component?: any;
  meta?: IMetaType;
  children?: any;
  url?: string;
  auth?: boolean;
  render?: any;
}

type RoutesType = IRoutesItemType[];

type OnRouteBeforeResType = string | void;

interface IOnRouteBeforeType {
  (payload: { pathname: string; meta: IMetaType }):
    | OnRouteBeforeResType
    | Promise<OnRouteBeforeResType>;
}

interface IRouterWaiterPropsType {
  routes: RoutesType;
  onRouteBefore?: IOnRouteBeforeType;
  loading?: ReactElementType;
}

interface IRouterWaiterType {
  (payload: IRouterWaiterPropsType): JSX.Element;
}

interface IRouteComponent {
  component: any // 暂时使用any,与Route中component匹配
}

type IRouteContent = IRouteComponent & IMenuItem;

export type {
  IMetaType, // 路由meta字段类型
  IFunctionalImportType, // 懒加载函数式导入组件的类型
  ReactElementType, // react组件实例元素类型
  IRoutesItemType, // 路由配属数组项类型
  RoutesType, // 路由配置数组类型
  OnRouteBeforeResType, // 路由拦截函数（实际有效使用的）返回值类型
  IOnRouteBeforeType, // 路由拦截函数类型
  IRouterWaiterPropsType, // RouterWaiter主组件props类型
  IRouterWaiterType, // RouterWaiter主组件类型
  IRouteContent,  // 路由content
};

declare const RouterWaiter: IRouterWaiterType;

export default RouterWaiter;
