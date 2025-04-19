"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import MainMenu from "./MainMenuDropDown";
import UserDropdown from "./UserDropDownMenu";

const DashboardCompanyHeader = () => {
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null); // Reference for the menu

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!isUserDropdownOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false); // Close menu if click is outside
        setUserDropdownOpen(false);
      }
      setMenuOpen(false); // Close menu if click an item
      setUserDropdownOpen(false); // Close menu if click an item
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-[70px] bg-gray-800 text-white border-gray-200 dark:bg-gray-900 sticky top-0 left-0 z-30 flex items-center justify-between px-4 w-full">
      {/* Left Side - Logo Section */}
      <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
        <Image
          src="/assets/images/logo.svg"
          className="h-8"
          width={30}
          height={30}
          alt="Lite Ticket Logo"
        />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          Lite Ticket
        </span>
      </a>

      {/* Center - Main Menu Section */}
      <div ref={menuRef} className="flex-grow flex justify-center">
        <MainMenu isOpen={isMenuOpen} />
      </div>

      {/* Right Side - User Icon Dropdown */}
      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <UserDropdown isOpen={isUserDropdownOpen} toggle={toggleUserDropdown} />
        {/* Toggle button to open/close menu */}
        <button
          type="button"
          onClick={toggleMenu} // OnClick to toggle menu
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-user"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DashboardCompanyHeader;
