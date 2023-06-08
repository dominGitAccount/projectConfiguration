
/*
 * @Description: 引入combineReducers，用于汇总多个reducer
 * @Author: 
 * @Date: 
 * @LastEditTime: 
 * @LastEditors: Please set LastEditors
 * @version: 1.0
 */
import { combineReducers } from "redux";
const modulesFiles = require.context("./modules/", false, /\.js$/);

let modules = {};
modulesFiles.keys().forEach((key) => {
  modules[key.replace(/(\.\/|\.js)/g, "")] = modulesFiles(key).default;
});
export default combineReducers(modules);
