import React from "react";
import ReactDOM from "react-dom";
// import { createStore } from "redux";
import { Provider } from "react-redux";
import "babel-polyfill";

import createStore from "src/redux/store";

//page
import AppContainer from "./src/page/App";

import "./style.css";

const stores = createStore();

const App = () => (
  <Provider store={stores}>
    <AppContainer />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("app"));
