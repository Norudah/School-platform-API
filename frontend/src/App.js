import React, { Fragment, useMemo, useState } from "react";
import "./Styles/index.css";
import { Main } from "./main";
import ResponsiveAppBar from "./components/Navbar/Navbar";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";

function App() {
  const [user, setUser] = useState({
    name: "Déconnecté",
    data: {},
    jwt: localStorage.getItem("jwt"),
  });

  console.log("jwt");
  console.log(localStorage.getItem("jwt"));

  const userProviderValue = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser]
  );

  return (
    <Fragment>
      <UserContext.Provider value={userProviderValue}>
        <BrowserRouter>
          <ResponsiveAppBar />
          <Main />
        </BrowserRouter>
      </UserContext.Provider>
    </Fragment>
  );
}

export default App;
