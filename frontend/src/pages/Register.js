import React from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import Select from "react-select";
import { Checkbox } from "@nextui-org/react";

const options = [
  { value: "4IW1", label: "4IW1" },
  { value: "4IW2", label: "4IW2" },
  { value: "4IW3", label: "4IW3" },
];

const toppings = [
  {
    name: "Node JS",
    value: false,
  },
  {
    name: "React",
    value: false,
  },
  {
    name: "Angular",
    value: false,
  },
];

const Register = () => {

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create and account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
            >
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
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
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="nickname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your nickname
                </label>
                <input
                  type="text"
                  name="nickname"
                  id="nickname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Pouetozorus"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                  Select technologies like
                </label>
                {toppings.map(({ name, price }, index) => {
                  return (
                    <div className="toppings-list-item">
                      <div className="left-section">
                        <Checkbox
                          id={`custom-checkbox-${index}`}
                          name={name}
                          checked={checkedState[index]}
                          label={name}
                          size="sm"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                  Select your classroom
                </label>
                <Select
                  options={options}
                />
              </div>

              <PrimaryButton type={"submit"}>Valid</PrimaryButton>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?
                <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500 ml-2">
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
