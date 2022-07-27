import React, { Fragment } from "react";

import { FriendMain } from "./FriendMain";
import SidebarContentFriend from "./SidebarContentFriend";

const Friends = () => {
  return (
    <Fragment>
      <div className={"flex px-4 lg:px-6 py-2.5"}>
        <SidebarContentFriend />
        <FriendMain />
      </div>
    </Fragment>
  );
};

export default Friends;
