import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "mapbox-gl/dist/mapbox-gl.css";
import App from "./App";
import { rootReducer } from "./reducers/rootReducer";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { StyledEngineProvider } from "@mui/material";

const store = createStore(
  rootReducer,
  {},
  compose(applyMiddleware(thunk, logger))
);

ReactDOM.render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </Provider>,
  document.getElementById("root")
);
