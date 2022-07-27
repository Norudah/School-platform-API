import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/useHttp";

const VerifyEmail = () => {
  const params = useParams();
  const http = useHttp();
  const [verificationStatus, setVerificationStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const token = params.token;

  useEffect(() => {
    http
      .get(`/verify/${token}`)
      .then((result) => {
        if (result.status === 200) {
          console.log("SUCCES VERIFICATION");
          setVerificationStatus(true);
        }
      })
      .catch((error) => {
        console.log("Erreur lors de la vérification du token d'inscription");
        console.error(error);
        if (error.response.data.message) setErrorMessage(error.response.data.message);
      });
  }, []);

  return (
    <div>
      {verificationStatus && (
        <div className={"flex flex-row w-screen justify-center mt-32"}>
          <div className={"p-10 bg-gray-900 rounded-lg text-gray-100"}>
            <h1 className={"text-3xl"}>Verify Email</h1>
            <p>Your email is verify !</p>
          </div>
        </div>
      )}

      {!verificationStatus && (
        <div className={"flex flex-row w-screen justify-center mt-32"}>
          <div className={"p-10 bg-gray-900 rounded-lg text-gray-100"}>
            <h1 className={"text-3xl"}>Erreur</h1>
            <p>Vérification email impossible</p>
            <p>Cause : </p>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default VerifyEmail;
