import React, { useState } from "react";
import { CN, DE, IT, SY, US } from "country-flag-icons/react/3x2";

const countriesWithStates = {
  US: {
    name: "United States",
    flag: US,
    states: ["CA", "TX", "WA", "FL", "VA", "GA", "MI"],
  },
  DE: {
    name: "Germany",
    flag: DE,
    states: ["Bavaria", "Berlin", "Hesse"],
  },
  IT: {
    name: "Italy",
    flag: IT,
    states: ["Lazio", "Lombardy", "Tuscany"],
  },
  SY: {
    name: "Syria",
    flag: SY,
    states: [
      "Damascus",
      "Dire Alzore",
      "Homes",
      "Damascus Subrab",
      "Swidaa",
      "Aleppo",
      "Latkia",
      "Hamah",
    ],
  },
  CN: {
    name: "China",
    flag: CN,
    states: ["Beijing", "Shanghai", "Guangzhou"],
  },
};

const SelectLocation = ({ name, handleChange }: any) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState("SY");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedState, setSelectedState] = useState("");

  const handleCountrySelect = (countryCode) => {
    setSelectedCountryCode(countryCode);
    setSelectedState("");
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const selectedCountry = countriesWithStates[selectedCountryCode];

  return (
    <div className="w-full">
      <div className="flex">
        {/* Country selector button */}
        <button
          id="states-button"
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
          type="button"
          onClick={toggleDropdown}
          //   disabled
        >
          {selectedCountry.flag &&
            React.createElement(selectedCountry.flag, {
              className: "h-4 w-4 rounded-full mr-2",
            })}
          {selectedCountryCode}
          <svg
            className="w-2.5 h-2.5 ms-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        {/* Dropdown for countries */}
        {isDropdownOpen && (
          <div
            id="dropdown-countries"
            className="mt-10 z-10 bg-white absolute divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="states-button"
            >
              {Object.keys(countriesWithStates).map((countryCode) => (
                <li key={countryCode}>
                  <button
                    className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => handleCountrySelect(countryCode)}
                    // disabled
                  >
                    <div className="inline-flex items-center">
                      {countriesWithStates[countryCode].flag &&
                        React.createElement(
                          countriesWithStates[countryCode].flag,
                          {
                            className: "h-3.5 w-3.5 rounded-full me-2",
                          }
                        )}
                      {countriesWithStates[countryCode].name}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* State selector */}
        <label htmlFor="states" className="sr-only">
          Choose a state
        </label>
        <select
          id="states"
          value={selectedState}
          onChange={handleStateChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-e-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        >
          <option value="" disabled>
            Choose a state
          </option>
          {selectedCountry.states.map((state) => (
            <option key={state} value={state} onChange={handleChange}>
              {state}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectLocation;
