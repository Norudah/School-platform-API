import React from "react";

const Sidebar = ({ children }) => {
  return (
    <aside
      className="flex flex-col w-64 h-[93vh] px-4 py-8 bg-white border-r dark:bg-gray-800 dark:border-gray-600"
      aria-label="Sidebar">
      <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800  ">
        <ul className={"space-y-2"}>{children}</ul>
      </div>
    </aside>
  );
};

export default Sidebar;
