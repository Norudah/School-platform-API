import React, { useState, useEffect, useContext } from "react";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import { useHttp } from "../hooks/useHttp";
import { UserContext } from "../contexts/UserContext";

const Reset = () => {
  const [email, setEmail] = React.useState("");
  const [requestStatus, setRequestStatus] = useState("");
  const [successStatus, setSuccessStatus] = useState("");
  const userContext = useContext(UserContext);
  const http = useHttp();

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    http
      .post("/make-reset-password-request", {
        email: email,
      })
      .then((result) => {
        console.log("result envoie de email");
        console.log(result);
        setSuccessStatus("Mail envoyé. Allez vérifier votre boite mail");
      })
      .catch((error) => {
        console.log("result envoie de email");
        console.log(error);
        setRequestStatus("Une erreur est survenue derant la requête");
      });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        {requestStatus && <p>Une erreur est survene </p>}
        {successStatus}
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Enter your email
          </h2>
          <form
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            action="#"
            onSubmit={(e) => {
              handleSubmit(e);
            }}>
            <div>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="youremail@mail.com"
                onChange={(e) => {
                  handleChange(e);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <PrimaryButton type={"submit"}>Submit</PrimaryButton>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Reset;
