import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "@/store";
import Basic from "@/router";
ReactDOM.render(
  <Provider store={store}>
    <Basic />
  </Provider>,
  document.getElementById("root")
);
