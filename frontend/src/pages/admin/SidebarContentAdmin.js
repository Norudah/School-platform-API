import React from "react";
import SidebarElements from "../../components/Sidebar/SidebarElements";
import Sidebar from "../../components/Sidebar/Sidebar";

const SidebarContentAdmin = () => {
  return (
    <Sidebar>
      <SidebarElements to={"/admin/home"}>Home</SidebarElements>
      <SidebarElements to={"/admin/user"}>Users</SidebarElements>
      <SidebarElements to={"/admin/report"}>Report</SidebarElements>
    </Sidebar>
  );
};

export default SidebarContentAdmin;
