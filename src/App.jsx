import React from "react";
import { Provider } from "react-redux"
import { store } from './stores';

import ReduxHooks from './pages/redux-hooks'

function App() {
  return (
    <Provider store={store}>
      <ReduxHooks />
    </Provider>
  );
}

export default App;
