import React, { useEffect, useContext, useState } from "react";
import MessageElement from "../../components/Message/messageElement";
import CustomButton from "../../components/Buttons/CustomButton";
import { useHttp } from "../../hooks/useHttp";

const ContentMessage = (props) => {
  const friendId = props.friend;
  const http = useHttp();
  const [createChatStatus, setCreateChatStatus] = useState("");

  console.log("parametre amis");
  console.log(friendId);

  useEffect(() => {
    http
      .post("/chats/new", {
        friendId: friendId,
      })
      .then((result) => {
        console.log("ERREUR CREATE CONV");
        console.log(result);
      })
      .catch((error) => {
        console.log("ERREUR CREATE CONV");
        console.log(error);
        if (error.response.data.message) setCreateChatStatus(error.response.data.message);
        else setCreateChatStatus("une erreur est survenu");
      });
  }, [friendId]);

  // useEffect(() => {
  //   http
  //     .post("/chats/new", {
  //       friendId: friendId,
  //     })
  //     .then((result) => {
  //       console.log("ERREUR CREATE CONV");
  //       console.log(result);
  //     })
  //     .catch((error) => {
  //       console.log("ERREUR CREATE CONV");
  //       console.log(error);
  //       if (error.response.data.message) setCreateChatStatus(error.response.data.message);
  //       else setCreateChatStatus("une erreur est survenu");
  //     });
  // }, [friendId]);

  return (
    <div className={"flex flex-col sticky"}>
      <div className={"mx-12  mt-8"}>
        <h2 className="mb-4 text-2xl tracking-tight font-bold text-gray-900 dark:text-white mt-5 ">WwwGromainwwW</h2>
        <th className={"border-b-2 w-screen"}></th>

        <p>{createChatStatus}</p>

        <div className={"flex flex-col pt-2 max-w-4xl h-1/2 overflow-y-auto"}>
          {/* <MessageElement message={"Bonjour, je suis un message de test"} to={"test"} />
          <MessageElement message={"Pouet"} to={"test"}></MessageElement>
          <MessageElement message={"Salut les ptit para pote"}></MessageElement>
          <MessageElement message={"Bonjour, je suis un message de test"} to={"test"} />
          <MessageElement message={"Pouet"} to={"test"}></MessageElement>
          <MessageElement message={"Salut les ptit para pote"}></MessageElement>
          <MessageElement message={"Bonjour, je suis un message de test"} to={"test"} />
          <MessageElement message={"Pouet"} to={"test"}></MessageElement>
          <MessageElement message={"Salut les ptit para pote"}></MessageElement>
          <MessageElement message={"Bonjour, je suis un message de test"} to={"test"} />
          <MessageElement message={"Pouet"} to={"test"}></MessageElement>
          <MessageElement message={"Salut les ptit para pote"}></MessageElement>
          <MessageElement message={"Bonjour, je suis un message de test"} to={"test"} />
          <MessageElement message={"Pouet"} to={"test"}></MessageElement>
          <MessageElement message={"Salut les ptit para pote"}></MessageElement>
          <MessageElement message={"Bonjour, je suis un message de test"} to={"test"} />
          <MessageElement message={"Pouet"} to={"test"}></MessageElement>
          <MessageElement message={"Salut les ptit para pote"}></MessageElement>
          <MessageElement message={"Bonjour, je suis un message de test"} to={"test"} />
          <MessageElement message={"Pouet"} to={"test"}></MessageElement>
          <MessageElement message={"Salut les ptit para pote"}></MessageElement>
          <MessageElement message={"Bonjour, je suis un message de test"} to={"test"} />
          <MessageElement message={"Pouet"} to={"test"}></MessageElement>
          <MessageElement message={"Salut les ptit para pote"}></MessageElement>
          <MessageElement message={"Bonjour, je suis un message de test"} to={"test"} />
          <MessageElement message={"Pouet"} to={"test"}></MessageElement>
          <MessageElement message={"Salut les ptit para pote"}></MessageElement> */}
        </div>

        <form className={"w-1/2 absolute"}>
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
            Search
          </label>
          <div className="relative">
            <input
              type="search"
              id="default-search"
              className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write a message..."
              required=""></input>

            <CustomButton
              type={"button"}
              className={
                "text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              }>
              Send
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContentMessage;
