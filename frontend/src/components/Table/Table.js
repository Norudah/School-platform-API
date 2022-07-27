import React from "react";

const Table = ({ thead }) => {
  return (
    <div className="overflow-x-auto relative">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th>{thead}</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default Table;
