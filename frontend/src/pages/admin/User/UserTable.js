import React from "react";

const UserTable = () => {
  return (
    <div className="overflow-x-auto relative">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Nickname
            </th>
            <th scope="col" className="py-3 px-6">
              Email
            </th>
            <th scope="col" className="py-3 px-6">
              classroom
            </th>
            <th scope="col" className="py-3 px-6">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Pouetozorusrex
            </th>
            <td className="py-4 px-6">test@test.com</td>
            <td className="py-4 px-6">4IW</td>
            <td className="py-4 px-6">
              <button className={"bg-red-800 p-2 text-gray-50 rounded-lg shadow hover:bg-red-600"}>Ban</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
