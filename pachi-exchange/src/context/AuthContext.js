import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);

  async function getLoggedIn() {
    const loggedInRes = await axios.get("http://localhost:8001/auth/loggedIn");
    //const loggedInRes = await axios.get(
    //"https://mern-auth-template-tutorial.herokuapp.com/auth/loggedIn"
    //);
    setLoggedIn(loggedInRes.data);
  }

  useEffect(() => {
    getLoggedIn();
  }, []);
  return (
    <React.StrictMode>
      <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
        {props.children}
      </AuthContext.Provider>
    </React.StrictMode>
  );
}

export default AuthContext;
export { AuthContextProvider };
