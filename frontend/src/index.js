import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Login from "./Admin/Login"
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import store from "./Admin/store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <App />
 </Provider>
      {/* <Login/> */}
    </BrowserRouter>
  </React.StrictMode>
);
