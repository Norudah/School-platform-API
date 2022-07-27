import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "./Admin";
import UserTable from "./User/UserTable";
import HomeAdmin from "./Home";
import ReportTable from "./Report/ReportTable";

export const AdminMain = () => {
  return (
    <div className={" flex flex-col w-full mx-12 px-12 rounded-lg mt-8"}>
      <Routes>
        <Route index element={<Admin />} />
        <Route path={"home"} element={<HomeAdmin />} />
        <Route path={"user"} element={<UserTable />} />
        <Route path={"report"} element={<ReportTable />} />
      </Routes>
    </div>
  );
};
