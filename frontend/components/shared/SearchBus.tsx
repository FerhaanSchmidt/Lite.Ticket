"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input"; // Assuming you have the Input component
import { MdLocationPin, MdOutlineCalendarMonth } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import {
  HiOutlineSwitchHorizontal,
  HiOutlineSwitchVertical,
} from "react-icons/hi";
import { BsPerson } from "react-icons/bs";
import CardBus from "./CardBus";
import { SkeletonCardBus } from "./SkeletonCardBus";

const base_url = process.env.BASE_URL || "http://localhost:4242/api/v1";

const SearchBus = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const [isMediumScreen, setIsMediumScreen] = useState(
    window.innerWidth >= 768
  );
  const [fromLocation, setFromLocation] = useState("دمشق");
  const [toLocation, setToLocation] = useState("حمص");

  // Set travelDate to today's date
  const today = new Date().toISOString().split("T")[0];
  const [travelDate, setTravelDate] = useState(today);

  const [passengerCount, setPassengerCount] = useState(1);
  const [busResults, setBusResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleResize = () => {
    setIsLargeScreen(window.innerWidth >= 1024);
    setIsMediumScreen(window.innerWidth >= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderSwitchIcon = () => {
    return isLargeScreen ? (
      <HiOutlineSwitchHorizontal size={24} color="gray" />
    ) : (
      <HiOutlineSwitchVertical size={24} color="gray" />
    );
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    const queryParameters = new URLSearchParams({
      from: fromLocation,
      to: toLocation,
      startUpAt: travelDate,
      availableSeats: passengerCount,
    });

    setLoading(true);

    try {
      const response = await fetch(
        `${base_url}/bus/search/getBusBySearch?${queryParameters.toString()}`
      );
      const data = await response.json();

      if (response.ok) {
        setBusResults(data.data); // Assuming data.data contains the results
      } else {
        console.error("Failed to fetch bus data:", data);
        setBusResults([]); // Clear previous results on error
      }
    } catch (error) {
      console.error("Error fetching bus data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchLocations = () => {
    // Swap the locations
    setFromLocation(toLocation);
    setToLocation(fromLocation);
  };

  return (
    <div>
      <form className="lg:container lg:max-w-[950px]" onSubmit={handleSearch}>
        <div className={`grid grid-cols-1 gap-3`}>
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
            <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-xl bg-grey-50 px-4 py-2">
              <IoLocationOutline size={24} color="green" />
              <Input
                type="text"
                placeholder="From"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                className="p-regular-16 border-0 bg-grey-50 outline-offset-0 placeholder:text-gray-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <div
              className={`absolute top-1/2 -translate-y-1/2 left-1/2 transform -translate-x-1/2 rounded-full border border-gray-300 bg-white p-2 cursor-pointer hover:bg-gray-50`}
              onClick={handleSwitchLocations} // Add the click handler here
            >
              {renderSwitchIcon()}
            </div>
            <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-xl bg-grey-50 px-4 py-2">
              <MdLocationPin size={24} color="green" />
              <Input
                type="text"
                placeholder="To"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                className="p-regular-16 border-0 bg-grey-50 outline-offset-0 placeholder:text-gray-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>
          <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-xl bg-grey-50 px-4 py-2">
            <MdOutlineCalendarMonth size={24} color="green" />
            <Input
              type="date"
              value={travelDate}
              min={today} // Restrict dates to today and future
              onChange={(e) => setTravelDate(e.target.value)}
              className="p-regular-16 border-0 bg-grey-50 outline-offset-0 placeholder:text-gray-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-xl bg-grey-50 px-4 py-2">
            <BsPerson size={24} color="green" />
            <select
              value={passengerCount}
              onChange={(e) => setPassengerCount(parseInt(e.target.value, 10))}
              className="p-regular-16 w-full border-0 bg-grey-50 outline-offset-0 placeholder:text-gray-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <option value={1}>1 Adult</option>
              <option value={2}>2 Adults</option>
              <option value={3}>3 Adults</option>
              <option value={4}>4 Adults</option>
              <option value={5}>5 Adults</option>
            </select>
          </div>
          <button
            type="submit"
            className="mt-4 p-2 rounded-xl bg-[#ffde59] text-gray-800 hover:bg-[#ffcf10]"
          >
            Search Buses
          </button>
        </div>
      </form>

      {/* Display search results */}
      <div className="mt-4">
        {loading ? (
          <div className="flex items-center justify-center font-semibold">
            <SkeletonCardBus className="" />
          </div>
        ) : busResults.length > 0 ? (
          <>
            <h2 className="text-xl font-semibold">الرحلات المتاحة</h2>
            <ul>
              {busResults.map((bus) => (
                <div key={bus.id} className="border-b">
                  <CardBus dataBus={bus} loadingDataBus={loading} />
                </div>
              ))}
            </ul>
          </>
        ) : (
          <div className="flex items-center justify-center font-semibold pt-2">
            لم يتم العثور على حافلة مع هذا البحث , حاول مرة اخرى{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBus;
