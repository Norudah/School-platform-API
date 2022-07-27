import React from "react";
import { Routes, Route } from "react-router-dom";
import AddFriend from "./FriendsAdd";
import Friends from "./Friends";
import ListFriend from "./ListFriend";
import RequestFriend from "./RequestFriend";

export const FriendMain = () => {
  return (
    <div className={" flex flex-col w-full mx-12 px-12 rounded-lg mt-8"}>
      <Routes>
        <Route index element={<Friends />} />
        <Route path="list" element={<ListFriend />} />
        <Route path="requests" element={<RequestFriend />} />
        <Route path="add" element={<AddFriend />} />
      </Routes>
    </div>
  );
};
