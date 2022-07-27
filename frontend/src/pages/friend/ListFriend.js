import React from "react";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import SecondaryButton from "../../components/Buttons/SecondaryButton";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useHttp } from "../../hooks/useHttp";
import { Navigate } from "react-router-dom";

const ListFriend = () => {
  const [students, setStudent] = useState([]);
  const [friendRequestStatus, setFriendRequestStatus] = useState("");
  const userContext = useContext(UserContext);
  const http = useHttp();
  const [toNavigate, setToNavigate] = useState(false);
  const [navigateParam, setNavigateParem] = useState(false);

  const handleRemoveFriend = async (id) => {
    console.log(id);
    console.log(userContext.user.data.id);
    try {
      const result = await http.post("/remove-friend", {
        friendId: id,
      });

      if (result.status === 200) setFriendRequestStatus("Votre amis a été supprimé");
    } catch (error) {
      console.log("ERREUR : Durant suppresion amis");
      console.error(error);
      setFriendRequestStatus("Une erreur est survenu");
      if (error.response.data.message) setFriendRequestStatus(error.response.data.message);
    }
  };

  const handleToDiscussion = (id) => {
    setNavigateParem(id);
    setToNavigate(true);
  };

  const studentCards = students.map((student) => {
    return (
      <div className={" grid lg:grid-cols-3 md:grid-cols-1 gap-4 pt-4"}>
        <div className=" p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          {toNavigate && <Navigate to={`/message/${navigateParam}`} replace={true} />}

          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {student.firstname}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Classe : {student.classroom}</p>

          <SecondaryButton type="button" onClick={() => handleRemoveFriend(student.id)}>
            Supprimer
          </SecondaryButton>

          <PrimaryButton type="button" onClick={() => handleToDiscussion(student.id)}>
            Discuter
          </PrimaryButton>
        </div>
      </div>
    );
  });

  const studentCardSection = studentCards.length === 0 ? <h1>Vous n'avez pas d'amis (cheh)</h1> : studentCards;

  useEffect(() => {
    try {
      http
        .get("/users/", {
          userId: userContext.user.data.id,
        })
        .then((result) => {
          console.log("List des utilisateurs reçus");
          console.log(result);
          setStudent(result.data);
        });
    } catch (error) {
      console.log("ERREUR : Durant get all users");
      console.error(error);
      if (error.response.data.message) setFriendRequestStatus(error.response.data.message);
    }
  }, []);

  return (
    <div>
      <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white mt-5">Mes Amis</h2>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{friendRequestStatus}</p>
      {studentCardSection}
    </div>
  );
};

export default ListFriend;
