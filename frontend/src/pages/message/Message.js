import React, { Fragment } from "react";
import SidebarMessage from "./SidebarMessage";
import ContentMessage from "./ContentMessage";
import { useParams } from "react-router-dom";

const Message = () => {
  const params = useParams();

  return (
    <>
      <div className={"flex flex-row"}>
        <SidebarMessage />
        <ContentMessage friend={params.friend} />
      </div>
    </>
  );
};
export default Message;
