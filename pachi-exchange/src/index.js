import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Routers";
import axios from "axios";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import reportWebVitals from "./reportWebVitals";
import { StateProvider } from "./StateProvider.js";
import reducer, { initialState } from "./Reducer.js";
import { AuthContextProvider } from "./context/AuthContext.js";
import { favIcon } from "./assets"; // Import the favicon

// Create a link element for the favicon
const link = document.createElement("link");
link.rel = "icon";
link.href = favIcon;

// Append it to the head
document.head.appendChild(link);

axios.defaults.withCredentials = true;

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <StateProvider initialState={initialState} reducer={reducer}>
        <App />
      </StateProvider>
    </AuthContextProvider>
  </React.StrictMode>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
