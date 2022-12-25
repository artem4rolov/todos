import React from "react";
import ReactDOM from "react-dom/client";
import "bulma/css/bulma.css";
// store из redux импортируется раньше, чем компоненты приложения!
import store from "./redux/store";
import App from "./App";
import "./firebase.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
