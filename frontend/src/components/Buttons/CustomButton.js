import React from "react";

const CustomButton = ({ children, onClick, type, className, ...rest }) => {
  return (
    <button {...rest} onClick={onClick} className={`${className}`} type={type}>
      {children}
    </button>
  );
};
export default CustomButton;
