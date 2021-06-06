import React from "react";

import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./components/App";
import "./index.css";
import Firebase, { FirebaseContext } from "./components/Firebase";
import reportWebVitals from "./reportWebVitals";

import { store } from "./store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <FirebaseContext.Provider value={new Firebase()}>
        <App />
      </FirebaseContext.Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
