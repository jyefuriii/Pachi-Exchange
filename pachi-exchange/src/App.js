import React from "react";
import Routers from "./Routers";
import axios from "axios";
import { AuthContextProvider } from "./context/AuthContext";

axios.defaults.withCredentials = true;

function App() {
  return (
    <React.StrictMode>
      <AuthContextProvider>
        <Routers />
      </AuthContextProvider>
    </React.StrictMode>
  );
}

export default App;
