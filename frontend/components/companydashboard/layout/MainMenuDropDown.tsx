import React from "react";

const MainMenu = ({ isOpen }: any) => {
  return (
    <div
      className={`items-center justify-center ${
        isOpen ? "flex absolute flex-wrap top-full right-0" : "hidden"
      } w-full md:flex md:w-auto md:order-1`}
      id="navbar-user"
    >
      <ul className="flex w-full flex-col font-medium p-4 md:p-0  border border-gray-700 shadow-md rounded-lg bg-gray-400 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-gray-800 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 mx-auto max-w-screen-xl">
        {["Home", "About", "Services", "Pricing", "Contact"].map((item) => (
          <li key={item}>
            <a
              href="#"
              className="block py-2 px-3 text-white rounded hover:bg-gray-500 md:hover:bg-transparent md:hover:text-[crimson] md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainMenu;
