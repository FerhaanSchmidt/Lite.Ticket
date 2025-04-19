"use client";

import { AuthContext } from "@/context/(companyAuth)/AuthContext";
import { formatDateTime } from "@/lib/utils";
import { ReloadIcon } from "@radix-ui/react-icons";
import React, { useContext, useEffect, useState } from "react";
const base_url = process.env.BASE_URL || "http://localhost:4242/api/v1";

interface Item {
  id: number;
  driver: string;
  busNumber: string;
  from: string;
  to: string;
  startUpAt: string;
  estimatedArrivalAt: string;
  totalSeats: string;
  availableSeats: string;
  status: string;
}

// data for test mode
// const itemsData: Item[] = [
//   {
//     id: 1,
//     nameDriver: 'Apple MacBook Pro 17"',
//     busNumber: "DV5202",
//     from: "دمشق",
//     to: "حمص",
//     startUpAt: "01-09-2024 Fr",
//     estimatedArrivalAt: "01-09-2024 Fr",
//     totalSeats: "40",
//     availableSeats: "40",
//     status: "نشط",
//   },
//   {
//     id: 2,
//     nameDriver: "Microsoft Surface Pro",
//     busNumber: "DV5202",
//     from: "دمشق",
//     to: "حمص",
//     startUpAt: "01-09-2024 Fr",
//     estimatedArrivalAt: "01-09-2024 Fr",
//     totalSeats: "40",
//     availableSeats: "40",
//     status: "نشط",
//   },
//   {
//     id: 3,
//     nameDriver: "Magic Mouse 2",
//     busNumber: "DV5202",
//     from: "دمشق",
//     to: "حمص",
//     startUpAt: "01-09-2024 Fr",
//     estimatedArrivalAt: "01-09-2024 Fr",
//     totalSeats: "40",
//     availableSeats: "40",
//     status: "نشط",
//   },
//   {
//     id: 4,
//     nameDriver: "Apple Watch",
//     busNumber: "DV5202",
//     from: "دمشق",
//     to: "حمص",
//     startUpAt: "01-09-2024 Fr",
//     estimatedArrivalAt: "01-09-2024 Fr",
//     totalSeats: "40",
//     availableSeats: "40",
//     status: "نشط",
//   },
//   {
//     id: 5,
//     nameDriver: "iPad",
//     busNumber: "DV5202",
//     from: "دمشق",
//     to: "حمص",
//     startUpAt: "01-09-2024 Fr",
//     estimatedArrivalAt: "01-09-2024 Fr",
//     totalSeats: "40",
//     availableSeats: "40",
//     status: "نشط",
//   },
//   {
//     id: 6,
//     nameDriver: 'Apple iMac 27"',
//     busNumber: "DV5202",
//     from: "دمشق",
//     to: "حمص",
//     startUpAt: "01-09-2024 Fr",
//     estimatedArrivalAt: "01-09-2024 Fr",
//     totalSeats: "40",
//     availableSeats: "40",
//     status: "نشط",
//   },
// ];

const DashboardCompanyAllTransports: React.FC = () => {
  const { state } = useContext(AuthContext);
  const [itemsData, setItemsData] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Last 30 days");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  console.log("this is the state of AuthContext Al Trasport :", state);

  useEffect(() => {
    const fetchData = async () => {
      if (state.company && state.company._id) {
        console.log("Fetching data for company ID:", state.company._id);
        try {
          const response = await fetch(
            `${base_url}/company/buses/${state.company._id}`,
            {
              method: "GET",
              credentials: "include",
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch buses");
          }

          const data = await response.json();
          console.log("Fetched data:", data);
          setItemsData(data.data || []); // Fallback to empty array
        } catch (fetchError) {
          console.error("Fetch error:", fetchError);
          setError(fetchError.message);
        } finally {
          setLoading(false);
        }
      } else {
        console.warn("Company not found:", state.company);
        setError("Company not found");
        setLoading(false);
      }
    };

    if (state.company) {
      fetchData();
    }
  }, [state.company]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center h-screen">
        <ReloadIcon className="mr-2 h-20 w-20 animate-spin" color="#ffde59" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex items-center justify-center bg-red-300 h-screen">
        <div className="bg-red-400 rounded-md border border-gray-200 shadow-md font-semibold text-lg p-10">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gray-400">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-4">
        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          <div>
            {/* Dropdown and search input here */}
            {/* ... (Keep dropdown code as is but update its state and handlers as needed) */}
            {/* Dropdown button */}
            <button
              id="dropdownRadioButton"
              onClick={toggleDropdown}
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
            >
              <svg
                className="w-3 h-3 text-gray-500 dark:text-gray-400 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
              </svg>
              {selectedFilter}
              <svg
                className="w-2.5 h-2.5 ms-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute mt-1">
                <ul
                  className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownRadioButton"
                >
                  {[
                    "Last day",
                    "Last 7 days",
                    "Last 30 days",
                    "Last month",
                    "Last year",
                  ].map((filter) => (
                    <li key={filter}>
                      <div
                        className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                        onClick={() => handleFilterChange(filter)}
                      >
                        <input
                          type="radio"
                          checked={selectedFilter === filter}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                        />
                        <label className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                          {filter}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <input
              type="text"
              id="table-search"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search bus with number"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600"
                  />
                  <label className="sr-only">checkbox</label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                اسم السائق
              </th>
              <th scope="col" className="px-6 py-3">
                رقم الحافلة
              </th>
              <th scope="col" className="px-6 py-3 bg-green-300">
                رحلة من
              </th>
              <th scope="col" className="px-6 py-3 bg-blue-300">
                رحلة الى
              </th>
              <th scope="col" className="px-6 py-3 bg-yellow-300">
                الانطلاق
              </th>
              <th scope="col" className="px-6 py-3">
                الوصول
              </th>
              <th scope="col" className="px-6 py-3">
                الركاب
              </th>
              <th scope="col" className="px-6 py-3">
                الركاب المتاحة
              </th>
              <th scope="col" className="px-6 py-3">
                الحالة
              </th>
              <th scope="col" className="px-6 py-3">
                اعدادات
              </th>
            </tr>
          </thead>
          <tbody>
            {itemsData?.map((item) => (
              <tr
                key={item.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id={`checkbox-table-${item.id}`}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600"
                    />
                    <label
                      htmlFor={`checkbox-table-${item.id}`}
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.driver.name}
                </th>
                <td className="px-6 py-4">{item.busNumber}</td>
                <td className="px-6 py-4 bg-green-100">{item.from}</td>
                <td className="px-6 py-4 bg-blue-100">{item.to}</td>
                <td className="px-6 py-4 bg-yellow-100">
                  {formatDateTime(item.startUpAt).dateTime}
                </td>
                <td className="px-6 py-4">
                  {formatDateTime(item.estimatedArrivalAt).dateTime}
                </td>
                <td className="px-6 py-4">{item.totalSeats}</td>
                <td className="px-6 py-4 ">{item.availableSeats}</td>
                <td className="px-6 py-4">{item.status}</td>
                <td className="px-6 py-4 flex items-center justify-between">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Remove
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav
          className="flex items-center flex-column flex-wrap md:flex-row justify-between p-4 bg-white "
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              1-10
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              1000
            </span>
          </span>
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                4
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                5
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default DashboardCompanyAllTransports;
