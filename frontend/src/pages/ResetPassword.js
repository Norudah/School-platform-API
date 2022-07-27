import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import { useHttp } from "../hooks/useHttp";

export const ResetPassword = () => {
  let params = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const http = useHttp();
  const [requestStatus, setRequestStatus] = useState("");
  const [resetStatus, setResetStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    http
      .post(`/reset-password/${params.token}`, {
        password: password,
      })
      .then((result) => {
        setResetStatus("Mot de passe changé. Vous pouvez vous connecter avec votre nouveau mot de passe");
      })
      .catch((error) => {
        setResetStatus("Erreur : Avec l'envoie ");
      });
  };

  useEffect(() => {
    http
      .post(`/reset-password/${params.token}`)
      .then((result) => {
        if (result.response === 200) {
          setRequestStatus("Lien vérifié. Vous pouvez changer votre mot de passe");
        }
      })
      .catch((error) => {
        console.log("BOUH NUL -> location");
        window.location.href = "http://localhost:3000";
      });
  }, []);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <p>{requestStatus}</p>
        <p>{resetStatus}</p>
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
          </h2>
          <form
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            action="#"
            onSubmit={(e) => {
              handleSubmit(e);
            }}>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                New Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  handleChange(e);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="••••••••"
                value={confirmPassword}
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
