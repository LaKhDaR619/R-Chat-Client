import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./states/reducers/rootReducer";
import mySaga from "./states/sagas/sagas";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

let enhanser, store;

try {
  enhanser = compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  store = createStore(rootReducer, enhanser);
} catch (err) {
  store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  console.log(err);
}

sagaMiddleware.run(mySaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
