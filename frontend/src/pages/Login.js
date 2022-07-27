import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import request from "../helpers/request";
import { useHttp } from "../hooks/useHttp";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [requestStatus, setRequestStatus] = useState("Non envoyé");
  const http = useHttp();

  const userContest = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await http.post("/login", { email: email, password: password });
      // const result = await request.post("/login", { email: email, password: password });
      // const result = await request.post("/make-friend-request", {
      //   from: userContext.user.data.id,
      //   to: id,
      // });

      // const result = await axios.post("http://localhost:9000/login", {
      //   email: email,
      //   password: password,
      // });

      if (result.status === 200) {
        setRequestStatus("SUCCESS : jeton d'authentification reçus");
      }

      console.log("result");
      console.log(result);

      console.log("result data.user");
      console.log(result.data.user);

      localStorage.setItem("jwt", result.data.token);
      userContest.setUser({
        name: result.data.user.firstname,
        data: result.data.user,
        jwt: result.data.token,
      });

      console.log("after context login");
      console.log(userContest);
    } catch (error) {
      setRequestStatus("Erreur : lors de la connexion");
      if (error.response.data.message) setRequestStatus(error.response.data.message);
      console.error(error);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h1>Status : {requestStatus}</h1>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Log in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={(e) => {
                handleSubmit(e);
              }}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  required
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  required
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <Link
                  to="/reset"
                  className={"text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"}>
                  Forgot password?
                </Link>
              </div>

              <PrimaryButton type={"submit"}>Log in</PrimaryButton>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?
                <Link
                  to="/register"
                  className={"text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 ml-2"}>
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
