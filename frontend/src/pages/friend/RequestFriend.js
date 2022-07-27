import PrimaryButton from "../../components/Buttons/PrimaryButton";
import SecondaryButton from "../../components/Buttons/SecondaryButton";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useHttp } from "../../hooks/useHttp";

const RequestFriend = () => {
  const [students, setStudent] = useState([]);
  const [friendRequestStatus, setFriendRequestStatus] = useState("");
  const userContext = useContext(UserContext);
  const http = useHttp();

  const handleAcceptFriend = async (id) => {
    console.log(id);
    console.log(userContext.user.data.id);
    try {
      const result = await http.post("/accept-friend-request", {
        relationId: id,
      });

      if (result.status === 200) setFriendRequestStatus("Vous avez accepté la demande d'amis");
    } catch (error) {
      console.log("ERREUR : Durant accept amis");
      console.error(error);
      setFriendRequestStatus("Une erreur est survenu");
      if (error.response.data.message) setFriendRequestStatus(error.response.data.message);
    }
  };

  const studentCards = students.map((student) => {
    return (
      <div className={" grid lg:grid-cols-3 md:grid-cols-1 gap-4 pt-4"}>
        <div className=" p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {student.id} veut être votre amis
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Status de la demande : {student.status}</p>

          <PrimaryButton type="button" onClick={() => handleAcceptFriend(student.id)}>
            Accepter la demande d'amis
          </PrimaryButton>
        </div>
      </div>
    );
  });

  const studentCardSection = studentCards.length === 0 ? <h1>Aucunes demandes d'amis pour le moment</h1> : studentCards;

  useEffect(() => {
    try {
      http
        .post("/my-friend-requests", {
          userId: userContext.user.data.id,
        })
        .then((result) => {
          console.log("demande d'amis :");
          console.log(result);
          setStudent(result.data.relations);
        });
    } catch (error) {
      console.log("ERREUR : Durant get all users");
      console.error(error);
    }
  }, []);

  return (
    <div>
      <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white mt-5">
        Invitation en attente
      </h2>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{friendRequestStatus}</p>

      {studentCardSection}
    </div>
  );
};

export default RequestFriend;
