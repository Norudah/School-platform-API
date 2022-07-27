import React from "react";
import "./Styles/index.css";
import { Routes, Route } from "react-router-dom";


export const Main = () => {

  return (
    <main className={"md:min-h-screen"}>
        <Routes>
          <Route path="/" element={</>} />
        </Routes>
    </main>
  );
};
