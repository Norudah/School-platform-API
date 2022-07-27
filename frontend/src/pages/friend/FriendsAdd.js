import { useContext, useEffect, useState } from "react";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";
// import request from "../../helpers/request";
import { useHttp } from "../../hooks/useHttp";

const AddFriend = () => {
  const [students, setStudent] = useState([]);
  const [friendRequestStatus, setFriendRequestStatus] = useState("");
  const userContext = useContext(UserContext);
  const http = useHttp();

  const handleFriendRequest = async (id) => {
    console.log(id);
    console.log(userContext.user.data.id);
    try {
      const result = await http.post("/make-friend-request", {
        from: userContext.user.data.id,
        to: id,
      });

      if (result.status === 200) setFriendRequestStatus("Demande envoyé");
    } catch (error) {
      console.log("ERREUR : Durant la demande d'amis");
      console.error(error);
      setFriendRequestStatus("Une erreur est survenu");
      if (error.response.data.message) setFriendRequestStatus(error.response.data.message);
    }
  };

  const studentCards = students.map((student) => {
    return (
      <div className={" grid lg:grid-cols-3 md:grid-cols-1 gap-4 pt-4"}>
        <div className=" p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{friendRequestStatus}</p>
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {student.firstname}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Classe : {student.classroom}</p>

          <PrimaryButton type="button" onClick={() => handleFriendRequest(student.id)}>
            Demander en amis
          </PrimaryButton>
        </div>
      </div>
    );
  });

  const studentCardSection =
    studentCards.length === 0 ? <h1>Aucunes personnes inscrites sur la plateforme</h1> : studentCards;

  useEffect(() => {
    try {
      http.get("http://localhost:9000/users", {}).then((result) => {
        setStudent(result.data);
      });
    } catch (error) {
      console.log("ERREUR : Durant get all users");
      console.error(error);
    }
  }, []);

  return (
    <div>
      <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white mt-5">Ajouter un ami</h2>

      <form className={"sm:w-full lg:w-1/2"}>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
          Search
        </label>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Nickname..."
            required=""></input>
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Search
          </button>
        </div>
        {studentCardSection}
      </form>
    </div>
  );
};

export default AddFriend;
