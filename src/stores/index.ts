import { createStore, applyMiddleware } from "redux";
//引入redux-thunk，用于支持异步action
import thunk from "redux-thunk";
//引入汇总之后的reducer
import reducer from "./reducers";
// 引入开发者辅助工具
import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
