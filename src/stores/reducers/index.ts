
/*
 * @Description: 引入combineReducers，用于汇总多个reducer
 * @Author: 
 * @Date: 
 * @LastEditTime: 
 * @LastEditors: Please set LastEditors
 * @version: 1.0
 */
import { combineReducers } from "redux";
import { IObjTy } from "src/stores/types/layout-types";

const modulesFiles = require.context("./modules/", false, /\.ts$/);

let modules: IObjTy = {};
modulesFiles.keys().forEach((key) => {
  modules[key.replace(/(\.\/|\.ts)/g, "")] = modulesFiles(key).default;
});
export default combineReducers(modules);
