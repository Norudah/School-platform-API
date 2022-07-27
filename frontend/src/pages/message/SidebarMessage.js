import React from "react";

const SidebarMessage = () => {
  return (
    <aside
      className="flex flex-col sm:w-1/3 lg:w-1/4 h-[93vh] px-4 py-8 bg-white border-r dark:bg-gray-800 dark:border-gray-600"
      aria-label="Sidebar">
      <button className={"bg-red-800 w-fit mx-auto rounded-lg p-2 text-gray-100 px-3"}>Refresh your messages</button>
      <h2 className="mb-4 text-2xl tracking-tight font-extrabold text-gray-900 dark:text-white mt-5">Discussions</h2>

      <form className={"pb-3"}>
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
            placeholder=""
            required></input>
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Search
          </button>
        </div>
      </form>

      {/* <div className={"flex flex-col space-y-3"}>
        <a href={"#"}>
          <div className="bg-white rounded-lg border shadow-sm sm:p-5 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-center ">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">XxxGromainxxX</h5>
            </div>
            <p className={"max-w-full truncate"}>Mon dernier message trop cool qui peux pas depasser de</p>
          </div>
        </a>
      </div> */}
    </aside>
  );
};

export default SidebarMessage;
