"use client";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { formatDateTime } from "@/lib/utils";
import { InfoCircledIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
const base_url = process.env.BASE_URL || "http://localhost:4242/api/v1";

const CheckOut = ({ data }: any) => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams(); // Get search parameters
  const [tourId, setTourId] = useState<string | undefined>();
  const [eventId, setEventId] = useState<string | undefined>();
  const [busId, setBusId] = useState<string | undefined>();
  const [ticketPrice, setTicketPrice] = useState<string | undefined>();

  const [tourDetails, setTourDetails] = useState(null);
  const [eventDetails, setEventDetails] = useState(null);
  const [busDetails, setBusDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedTourId = searchParams.get("tourId");
    const fetchedEventId = searchParams.get("eventId");
    const fetchedBusId = searchParams.get("busId");
    const fetchedTicketPrice = searchParams.get("ticketPrice");

    if (fetchedTourId) setTourId(fetchedTourId);
    if (fetchedEventId) setEventId(fetchedEventId);
    if (fetchedBusId) setBusId(fetchedBusId);
    if (fetchedTicketPrice) setTicketPrice(fetchedTicketPrice);
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      if (tourId) {
        const tourResponse = await fetch(`${base_url}/tours/${tourId}`);
        const tourData = await tourResponse.json();
        setTourDetails(tourData);
      }

      if (eventId) {
        const eventResponse = await fetch(`${base_url}/events/${eventId}`);
        const eventData = await eventResponse.json();
        setEventDetails(eventData);
      }

      if (busId) {
        const busResponse = await fetch(`${base_url}/bus/${busId}`);
        const busData = await busResponse.json();
        setBusDetails(busData.data);
      }

      setLoading(false);
    };

    if (tourId || eventId || busId) {
      fetchData();
    }
  }, [tourId, eventId, busId]);

  console.log("Bus Details Data :", busDetails);
  console.log("Event Details Data :", eventDetails);
  console.log("Tour Details Data :", tourDetails);

  if (loading) {
    return (
      <section className="flex justify-center items-center h-screen">
        <ReloadIcon className="mr-2 h-20 w-20 animate-spin" color="#ffde59" />
      </section>
    );
  }

  const handleBackClick = () => {
    router.back();
  };

  const handleChange = (event) => {
    setSelectedMethod(event.target.value);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="grid sm:grid-cols-1 ms:grid-cols-2 lg:grid-cols-2 p-4 ">
        {/* Booking Details Section */}
        <div className="container">
          <button
            type="button"
            onClick={handleBackClick}
            className="flex items-center text-blue-600 mb-4"
          >
            <svg
              className="w-5 h-5 mr-2 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12H9m3-3l-3 3 3 3"
              />
            </svg>
            <span>Back</span>
          </button>

          <form name="checkout" className="space-y-4">
            <BookingSection number={1} title="Passengers">
              {Array.from({ length: 1 }).map((_, index) => (
                <PassengerForm key={index} index={index + 1} />
              ))}
            </BookingSection>

            <BookingSection number={2} title="Select your seats">
              <div className="bg-gray-100 p-4 rounded">
                <p className="text-sm">
                  from <span className="font-bold">€2.49</span>
                </p>
                <button
                  type="button"
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Choose seats
                </button>
              </div>
            </BookingSection>

            <BookingSection number={3} title="Extras">
              <div className="bg-gray-100 p-4 rounded">
                <h4 className="font-semibold">Included per person</h4>
                <p>
                  Hand Luggage |{" "}
                  <span className="font-bold">20 kg · 30 cm</span>
                </p>
                <p>
                  Hold Luggage |{" "}
                  <span className="font-bold">20 kg · 30 cm</span>
                </p>
              </div>
            </BookingSection>

            <BookingSection number={4} title="Contact">
              <div className="flex flex-col space-y-4 ">
                <div className="flex flex-col gap-2 lg:flex-row">
                  <InputField
                    id="email"
                    label="Email"
                    type="email"
                    defaultValue="test@example.com"
                    className="flex-1"
                  />
                  <InputField
                    id="phone-number"
                    label="Phone number (optional)"
                    type="tel"
                    defaultValue="+963"
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-blue-500 text-center">
                  Used only to contact you in case of delays or itinerary
                  changes.
                </p>
              </div>
              <p className="text-xs pt-2">
                Your e-mail address will be used to send you the booking
                confirmation, as well as our additional offers.
              </p>
            </BookingSection>

            <BookingSection number={5} title="Payment">
              <fieldset className="mb-4 border border-gray-300 p-4 rounded">
                <legend className="font-semibold">
                  Please choose a payment method
                </legend>
                {["E-cach", "MTN", "Syriatel"].map((method) => (
                  <div
                    className="flex items-center mb-2 p-3 border border-gray-300 rounded-xl text-lg font-poppins cursor-pointer"
                    key={method}
                  >
                    <input
                      type="radio"
                      id={method}
                      name="payment_item"
                      value={method}
                      className="custom-radio"
                      checked={selectedMethod === method}
                      onChange={handleChange}
                    />
                    <label htmlFor={method}>
                      {method.replace("_", " ").toUpperCase()}
                    </label>
                  </div>
                ))}
              </fieldset>
            </BookingSection>

            <h3 className="text-xs mt-4 text-gray-600 text-center">
              Contract partner for transportation services: LiteTicket LLC
              <br />
              <span className="text-blue-700 cursor-pointer underline">
                Privacy Policy
              </span>
            </h3>
          </form>
        </div>

        {/* Booking Summary Section */}
        <>
          {/* Bus */}
          {busDetails && (
            <div className="">
              <h2 className="text-xl font-semibold text-center">
                Your Booking Bus
              </h2>
              <div className="bg-white p-4 rounded-t-md mt-4 border border-gray-300 shadow-md shadow-[#00000025] m-3">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-xs font-semibold lg:text-sm">
                    {formatDateTime(busDetails?.startUpAt).dateOnly} →{" "}
                    {formatDateTime(busDetails?.estimatedArrivalAt).dateOnly}
                  </h1>
                  <p className="text-gray-600 font-poppins text-sm lg:text-lg">
                    رحلة من{" "}
                    <span className="font-semibold">{busDetails?.from}</span>{" "}
                    الى <span className="font-semibold">{busDetails?.to}</span>
                  </p>
                </div>
                <div className="relative grid grid-cols-2 gap-3 mt-2">
                  {/* <ul className="flex flex-col items-start m-0 p-0 relative justify-start">
                <li className="circle_book"></li>
                <li className="line"></li>
                <li className="circle_book last"></li>
              </ul> */}
                  <ul className="flex flex-col justify-center pl-6">
                    <li className="flex items-center">
                      {busDetails?.from}
                      <span className="ml-2">
                        {formatDateTime(busDetails?.startUpAt).timeOnly}
                      </span>
                    </li>
                    <li className="flex items-center">
                      {busDetails?.to}
                      <span className="ml-2">
                        {
                          formatDateTime(busDetails?.estimatedArrivalAt)
                            .timeOnly
                        }
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex justify-between m-4">
                <span>1 Adults</span>
                <span className="font-bold">{busDetails?.price}</span>
              </div>
              <Separator />
              <div className="flex justify-between m-4">
                <span className="flex justify-between items-center">
                  Service Fee{" "}
                  <InfoCircledIcon
                    className="text-primary-500 ml-2"
                    cursor={"pointer"}
                  />
                </span>
                <span className="font-bold">1000</span>
              </div>

              <Separator />
              <div className="flex justify-between m-4">
                <span className="text-xl font-semibold">Total :</span>
                <span className="text-lg font-bold">8500</span>
              </div>
              <div className="mt-4 text-center">
                {/* <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Enter Voucher
            </button> */}
                <button className="p-3 w-full mx-1 bg-[#ffde59] rounded-md text-gray-800 hover:bg-[#ffcf10] transition duration-200">
                  Pay now
                </button>
              </div>
            </div>
          )}

          {/* Event */}
          {eventDetails && (
            <div className="">
              <h2 className="text-xl font-semibold text-center">
                Your Booking Event
              </h2>
              <div className="bg-white p-4 rounded-t-md mt-4 border border-gray-300 shadow-md shadow-[#00000025] m-3">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-md font-semibold">
                    {/* {formatDateTime(data.startUpAt).dateOnly} →{" "} */}
                    {/* {formatDateTime(data.estimatedArrivalAt).dateOnly} */}
                  </h1>
                  <p className="text-gray-600 font-poppins text-sm">
                    {/* رحلة من <span className="font-semibold">{data.from}</span>{" "} */}
                    {/* الى <span className="font-semibold">{data.to}</span> */}
                  </p>
                </div>
                <div className="relative grid grid-cols-2 gap-3 mt-2">
                  {/* <ul className="flex flex-col items-start m-0 p-0 relative justify-start">
                <li className="circle_book"></li>
                <li className="line"></li>
                <li className="circle_book last"></li>
              </ul> */}
                  <ul className="flex flex-col justify-center pl-6">
                    <li className="flex items-center">
                      {/* {data.from} */}
                      <span className="ml-2">
                        {/* {formatDateTime(data.startUpAt).timeOnly} */}
                      </span>
                    </li>
                    <li className="flex items-center">
                      {/* {data.to} */}
                      <span className="ml-2">
                        {/* {formatDateTime(data.estimatedArrivalAt).timeOnly} */}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex justify-between m-4">
                <span>1 Adults</span>
                {/* <span className="font-bold">{data.price}</span> */}
              </div>
              <Separator />
              <div className="flex justify-between m-4">
                <span className="flex justify-between items-center">
                  Service Fee{" "}
                  <InfoCircledIcon
                    className="text-primary-500 ml-2"
                    cursor={"pointer"}
                  />
                </span>
                <span className="font-bold">1000</span>
              </div>

              <Separator />
              <div className="flex justify-between m-4">
                <span className="text-xl font-semibold">Total :</span>
                <span className="text-lg font-bold">8500</span>
              </div>
              <div className="mt-4 text-center">
                {/* <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Enter Voucher
            </button> */}
                <button className="p-3 w-full mx-1 bg-[#ffde59] rounded-md text-gray-800 hover:bg-[#ffcf10] transition duration-200">
                  Pay now
                </button>
              </div>
            </div>
          )}

          {/* Tour */}
          {tourDetails && (
            <div className="">
              <h2 className="text-xl font-semibold text-center">
                Your Booking Tour
              </h2>
              <div className="bg-white p-4 rounded-t-md mt-4 border border-gray-300 shadow-md shadow-[#00000025] m-3">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-md font-semibold">
                    {/* {formatDateTime(data.startUpAt).dateOnly} →{" "} */}
                    {/* {formatDateTime(data.estimatedArrivalAt).dateOnly} */}
                  </h1>
                  <p className="text-gray-600 font-poppins text-sm">
                    {/* رحلة من <span className="font-semibold">{data.from}</span>{" "} */}
                    {/* الى <span className="font-semibold">{data.to}</span> */}
                  </p>
                </div>
                <div className="relative grid grid-cols-2 gap-3 mt-2">
                  {/* <ul className="flex flex-col items-start m-0 p-0 relative justify-start">
                <li className="circle_book"></li>
                <li className="line"></li>
                <li className="circle_book last"></li>
              </ul> */}
                  <ul className="flex flex-col justify-center pl-6">
                    <li className="flex items-center">
                      {/* {data.from} */}
                      <span className="ml-2">
                        {/* {formatDateTime(data.startUpAt).timeOnly} */}
                      </span>
                    </li>
                    <li className="flex items-center">
                      {/* {data.to} */}
                      <span className="ml-2">
                        {/* {formatDateTime(data.estimatedArrivalAt).timeOnly} */}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex justify-between m-4">
                <span>1 Adults</span>
                {/* <span className="font-bold">{data.price}</span> */}
              </div>
              <Separator />
              <div className="flex justify-between m-4">
                <span className="flex justify-between items-center">
                  Service Fee{" "}
                  <InfoCircledIcon
                    className="text-primary-500 ml-2"
                    cursor={"pointer"}
                  />
                </span>
                <span className="font-bold">1000</span>
              </div>

              <Separator />
              <div className="flex justify-between m-4">
                <span className="text-xl font-semibold">Total :</span>
                <span className="text-lg font-bold">8500</span>
              </div>
              <div className="mt-4 text-center">
                {/* <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Enter Voucher
            </button> */}
                <button className="p-3 w-full mx-1 bg-[#ffde59] rounded-md text-gray-800 hover:bg-[#ffcf10] transition duration-200">
                  Pay now
                </button>
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

const BookingSection = ({ number, title, children }) => (
  <section className="bg-white p-4 rounded-md mt-4 border border-gray-300 shadow-md shadow-[#00000025]">
    <h1 className="font-bold text-lg mb-2">
      <span className="text-lg font-semibold px-4 py-1.5 bg-[#ffde59] rounded-lg">
        {number}
      </span>{" "}
      {title}
    </h1>
    {children}
  </section>
);

const PassengerForm = ({ index }) => (
  <div className="mb-4 bg-white rounded-md p-2">
    <h4 className="font-semibold">{index}. Adult</h4>
    <div className="flex space-x-4">
      <InputField
        id={`first-name-${index}`}
        label="First name"
        name={`passengers.${index - 1}.firstName`}
        className="flex-1"
      />
      <InputField
        id={`last-name-${index}`}
        label="Last name"
        name={`passengers.${index - 1}.lastName`}
        className="flex-1"
      />
    </div>
  </div>
);

const InputField = ({
  id,
  label,
  type = "text",
  name,
  defaultValue,
  className,
}) => (
  <div className={className}>
    <label htmlFor={id} className="block text-sm">
      {label}
    </label>
    <Input
      type={type}
      id={id}
      name={name}
      className="border border-gray-300 p-2 rounded w-full"
      defaultValue={defaultValue}
      autoComplete={type === "email" ? "email" : "off"}
    />
  </div>
);

export default CheckOut;
