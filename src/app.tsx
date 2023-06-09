import React from "react";
import { Provider } from "react-redux"
import ReduxHooks from './pages/redux-hooks';
import { store } from './stores';

const App = ()=> {
  return (
    <Provider store={store}>
      <ReduxHooks/>
    </Provider>
  );
}

export default App;
