import React from "react";

const CheckboxElement = ({ children }) => {
  return (
    <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
      <div className="flex items-center pl-3">
        <input
          id="vue-checkbox"
          type="checkbox"
          value="children"
          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"></input>
        <label htmlFor="vue-checkbox" className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">
          {children}
        </label>
      </div>
    </li>
  );
};
export default CheckboxElement;
