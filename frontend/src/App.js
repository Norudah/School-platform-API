import React, { Fragment } from "react";
import "./Styles/index.css";

import { Main } from "./main";
import ResponsiveAppBar from "./components/Navbar/Navbar";

function App() {

  return (
    <Fragment>
      <ResponsiveAppBar />
      <Main />
    </Fragment>
  );
}

export default App;
