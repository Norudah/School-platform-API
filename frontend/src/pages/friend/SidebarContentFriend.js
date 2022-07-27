import { Fragment } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import SidebarElements from "../../components/Sidebar/SidebarElements";

const SidebarContentFriend = () => {
  return (
    <Fragment>
      <Sidebar>
        <SidebarElements to={"/friends/list"}>My friends</SidebarElements>
        <SidebarElements to={"/friends/requests"}>Invitation</SidebarElements>
        <SidebarElements to={"/friends/add"}>Add friend</SidebarElements>
      </Sidebar>
    </Fragment>
  );
};

export default SidebarContentFriend;
