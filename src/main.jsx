import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store/Store.js";
import App from "./App";
import "./index.css";

const root = document.getElementById("root");

const appRoot = ReactDOM.createRoot(root);
appRoot.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
