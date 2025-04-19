"use client";
import { formatDateTime } from "@/lib/utils";
import React, { useState } from "react";
import { FaWifi, FaAppleAlt } from "react-icons/fa";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Separator } from "../ui/separator";
import {
  FaArrowRightLong,
  FaBottleWater,
  FaPeopleGroup,
  FaPerson,
} from "react-icons/fa6";
import { Button } from "../ui/button";
import { IoLocationOutline } from "react-icons/io5";
import { MdLocationPin, MdOutlineDoubleArrow } from "react-icons/md";
import { useRouter } from "next/navigation";
import { PiPlugChargingLight } from "react-icons/pi";

type CardBusProps = {
  dataBus: any;
  loadingDataBus: boolean;
};

const CardBus = ({ dataBus, loadingDataBus }: CardBusProps) => {
  const router = useRouter();
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false); // Add a loading state for the button

  // Parsing the date strings into Date objects
  const startUpAt = new Date(dataBus.startUpAt);
  const estimatedArrivalAt = new Date(dataBus.estimatedArrivalAt);

  // Calculating the duration in milliseconds
  const durationInMilliseconds = estimatedArrivalAt - startUpAt;

  // Converting milliseconds into hours and minutes
  const durationHours = Math.floor(durationInMilliseconds / 3600000); // 3600000 ms in an hour
  const durationMinutes = Math.floor(
    (durationInMilliseconds % 3600000) / 60000
  ); // 60000 ms in a minute

  // Formatting the duration to display
  const formattedDuration = `${durationHours
    .toString()
    .padStart(2, "0")}:${durationMinutes.toString().padStart(2, "0")}`;

  // ------------------------
  const amenitiesIcons = {
    chargingSocket: <PiPlugChargingLight color="gray" />,
    food: <FaAppleAlt color="gray" />,
    water: <FaBottleWater color="gray" />,
    wifi: <FaWifi color="gray" />,
  };

  const [loading, setLoading] = useState(loadingDataBus);

  // example fetch function
  const fetchData = async () => {
    setLoading(true);
    try {
      // Your logic to fetch data goes here, like an API call:
      // await fetchBusData();

      // Simulating network delay
      await new Promise((res) => setTimeout(res, 2000));

      // set the loading to false after fetch completion
      setLoading(false);
    } catch (error) {
      // Handle any errors if necessary
      console.error(error);
      setLoading(false);
    }
  };

  // Handle the checkout button click
  const handleCheckout = () => {
    if (dataBus) {
      setIsLoadingCheckout(true); // Set loading to true

      const pathname = "/checkout";
      const busId = encodeURIComponent(dataBus._id);
      // const ticketPrice = encodeURIComponent(data.ticketPrices[0].price);
      console.log("event id send from event deatils :", busId);

      // Use setTimeout to simulate network delay for demonstration purposes
      setTimeout(() => {
        router.push(`${pathname}?busId=${busId}`);
        setIsLoadingCheckout(false); // Reset loading once redirected
      }, 500); // Simulate a 500ms delay for loading animation
    } else {
      console.error("Event data or ticket price is not available");
    }
  };

  return (
    <li className="container max-w-[950px] flex flex-col bg-white rounded-md shadow-md p-4 pt-2 my-4 border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-semibold  ">{dataBus.company?.name}</h4>
        <p className=" items-center justify-center text-gray-500 text-sm">
          <span className="text-xs font-semibold">
            SYP {""}
            {dataBus.price}
          </span>
          | Bus :{" "}
          <span className="text-sm font-semibold"> {dataBus.busNumber}</span>
        </p>
      </div>
      <div className="mb-2">
        <p className="text-gray-600 font-poppins text-sm">
          رحلة من <span className="font-semibold">{dataBus.from}</span> الى{" "}
          <span className="font-semibold">← {dataBus.to}</span>
        </p>
        <p className="text-xs font-bold text-gray-800 flex flex-col">
          {/* {formatDateTime(dataBus.estimatedArrivalAt).timeOnly} */}
          <span className="text-xs">
            {formatDateTime(dataBus.startUpAt).dateOnly}
          </span>
        </p>
      </div>
      {/* <Separator className="my-2" /> */}

      <div className="flex justify-between mb-1">
        <div className="mr-3 text-left">
          <p className="text-lg font-bold text-gray-800 flex flex-col">
            {formatDateTime(dataBus.startUpAt).timeOnly}

            <span className="text-sm">
              {/* {formatDateTime(dataBus.estimatedArrivalAt).dateOnly.slice(0, 2)} */}
            </span>
          </p>
          <p className="text-lg text-gray-500 font-semibold ">{dataBus.from}</p>
        </div>
        <div className="flex-1 text-center">
          <p className="text-sm text-gray-600 font-semibold mb-2">
            <strong>{formattedDuration} hrs</strong>
          </p>
          <div className="relative">
            <MdOutlineDoubleArrow
              className="absolute top-[-10px] left-2"
              size={20}
              color="green"
            />
            <Separator className="mt-[-10px] ml-[30px] w-[calc(100%-30px)] rounded-md bg-[#ffde59] p-[1px]"></Separator>
          </div>

          <p className="text-sm text-gray-600 font-semibold pt-0.5">
            {" "}
            الاستراحات : {dataBus.restStops.length}
          </p>

          <div className="flex flex-row justify-center mt-2">
            {dataBus.restStops && dataBus.restStops.length > 0 ? (
              dataBus.restStops.map((item, index) => (
                <div key={index} className="flex flex-row items-center mx-2">
                  {/* <h1 className="text-gray-800 font-semibold">{item.name} </h1>
                  <span className="text-gray-500 p-1">
                    {" "}
                    {item.duration} min
                  </span> */}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No rest stops available.</p>
            )}
          </div>
        </div>
        <MdLocationPin className="relative" size={20} color="green" />

        <div className="ml-3 text-right">
          <p className="text-lg font-bold text-gray-800 flex flex-col">
            {formatDateTime(dataBus.estimatedArrivalAt).timeOnly}
            <span className="text-sm">
              {/* {formatDateTime(dataBus.estimatedArrivalAt).dateOnly.slice(0, 2)} */}
            </span>
          </p>
          <p className="text-lg text-gray-500 font-semibold">{dataBus.to}</p>
        </div>
      </div>
      {/* <Separator className="my-2" /> */}
      {dataBus.availableSeats <= dataBus.totalSeats &&
      dataBus.availableSeats !== 0 ? (
        <div className="flex items-center">
          <div className="w-full flex justify-start">
            <div className="mr-4">
              <Button
                className={`p-3 w-full bg-[#ffde59] rounded-md text-gray-800 hover:bg-[#ffcf10] transition duration-200 ${
                  isLoadingCheckout ? "disabled" : ""
                }`}
                onClick={handleCheckout}
                disabled={isLoadingCheckout} // Disable button while loading
              >
                {isLoadingCheckout ? (
                  <span className="flex items-center">
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Continue ...
                  </span>
                ) : (
                  "Continue"
                )}
              </Button>
            </div>
            <div className="flex justify-start items-center space-x-2">
              {dataBus.amenities &&
                Object.entries(dataBus.amenities).map(([key, value]) => {
                  if (value) {
                    return (
                      <span key={key} className="text-lg">
                        {amenitiesIcons[key]}
                      </span>
                    );
                  }
                  return null;
                })}
              <div className="items-center justify-end border-l px-3 border-gray-300  ">
                {/* <span className="text-sm font-sans">
                  <FaPerson color="gray" />
                  {dataBus.availableSeats}
                </span> */}
                {/* <span className="text-[10px] ml-1 text-gray-500">
                  المقاعد المتاحة
                </span> */}
                {dataBus.availableSeats <= 10 ? (
                  <span className="text-green-500 text-2xl">
                    <FaPeopleGroup />
                    <span className="text-xs flex">ستمتلئ قريباً</span>
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className=" items-center justify-end">
            <p className="flex items-center text-2xl font-bold">
              <strong className="text-sm font-semibold"> ليرة </strong>
              <span className="pl-0.5">{dataBus.price} </span>
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <p className="flex items-center text-2xl font-sans text-red-400">
            أكتمل حجز هذه الرحلة
          </p>
        </div>
      )}
    </li>
  );
};

export default CardBus;
