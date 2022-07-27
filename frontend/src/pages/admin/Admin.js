import React, { Fragment } from "react";
import SidebarContentAdmin from "./SidebarContentAdmin";
import { AdminMain } from "./AdminMain";

const Admin = () => {
  return (
    <Fragment>
      <div className={"flex px-4 lg:px-6 py-2.5"}>
        <SidebarContentAdmin />
        <AdminMain />
      </div>
    </Fragment>
  );
};

export default Admin;
