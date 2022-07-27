import React from "react";

const MessageElement = ({ message, to }) => {
  if (to === "test") {
    return (
      <div className={"flex flex-row"}>
        <p className={"break-all text-md w-fit max-w-md bg-blue-800 text-white rounded-xl p-2 px-3 mt-1 "}>{message}</p>
      </div>
    );
  } else {
    return (
      <div className={"flex flex-row justify-end"}>
        <p className={"break-all text-md w-fit max-w-md bg-gray-100 text-gray-900 rounded-xl p-2 px-3 mt-1 mr-0 "}>
          {message}
        </p>
      </div>
    );
  }
};

export default MessageElement;
