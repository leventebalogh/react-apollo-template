import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/App";
import { GraphQLProvider } from "./components/GraphQLProvider";

ReactDOM.render(
  <GraphQLProvider>
    <App />
  </GraphQLProvider>,
  document.getElementById("react-app") // eslint-disable-line no-undef
);
