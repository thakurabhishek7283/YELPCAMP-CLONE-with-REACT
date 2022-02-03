import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Auth from "./components/Auth/Auth";
// import { createStore, applyMiddleware, compose } from "redux";
// import { Provider } from "react-redux";
// import thunk from "redux-thunk";

// const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById("root")
// );
ReactDOM.render(<App />, document.getElementById("root"));
