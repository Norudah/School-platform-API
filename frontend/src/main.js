import "./Styles/index.css";
import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ResetPassword } from "./pages/ResetPassword";
import UserIndex from "./pages/users/indexUser";
import Profil from "./pages/users/Profil";
import Friends from "./pages/friend/Friends";
import Message from "./pages/message/Message";
import Admin from "./pages/admin/Admin";
import NotFound from "./pages/NotFound";
import VerifyEmail from "./pages/VerifyEmail";
import Reset from "./pages/Reset";

export const Main = () => {
  return (
    <main className={"md:min-h-screen"}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/*<Route path="/reset-password" element={<ResetPassword />} />*/}
        <Route path="/user" element={<UserIndex />} />
        <Route path="/profil" element={<Profil />} />

        <Route path="/friends/*" element={<Friends />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/verifyEmail">
          <Route path=":token" element={<VerifyEmail />} />
        </Route>

        <Route path="/message">
          <Route path=":friend" element={<Message />} />
        </Route>

        <Route path="/reset" element={<Reset />} />
        <Route path="/resetPassword">
          <Route path=":token" element={<ResetPassword />} />
        </Route>
      </Routes>
    </main>
  );
};
