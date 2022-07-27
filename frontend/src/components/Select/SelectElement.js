import React from "react";

const SelectElement = ({ children }) => {
  return <option value={`${children}`}>{children}</option>;
};
export default SelectElement;
