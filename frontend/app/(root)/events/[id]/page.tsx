"use client";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import { formatDateTime } from "@/lib/utils";
import { ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
const base_url = process.env.BASE_URL || "http://localhost:4242/api/v1";

const EventDetails = () => {
  const router = useRouter();
  const { id } = useParams();
  const { data, loading, error } = useFetch(`${base_url}/events/${id}`);
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false); // Add a loading state for the button

  // Handle the checkout button click
  const handleCheckout = () => {
    if (data && data?.ticketPrices?.length > 0) {
      setIsLoadingCheckout(true); // Set loading to true

      const pathname = "/checkout";
      const eventId = encodeURIComponent(data._id);
      // const ticketPrice = encodeURIComponent(data.ticketPrices[0].price);
      console.log("event id send from event deatils :", eventId);

      // Use setTimeout to simulate network delay for demonstration purposes
      setTimeout(() => {
        router.push(`${pathname}?eventId=${eventId}`);
        setIsLoadingCheckout(false); // Reset loading once redirected
      }, 500); // Simulate a 500ms delay for loading animation
    } else {
      console.error("Event data or ticket price is not available");
    }
  };

  if (loading) {
    return (
      <section className="flex justify-center items-center h-screen">
        <ReloadIcon className="mr-2 h-20 w-20 animate-spin" color="#ffde59" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex justify-center items-center h-screen">
        <p className="text-red-600">
          Error loading events details, please try again later.
        </p>
      </section>
    );
  }

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="justify-center items-center grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <Image
            src="/assets/images/liteTicket_Hero.webp"
            height={1000}
            width={1000}
            alt="Lite Ticket Tour Details"
            className="h-full min-h-[300px] object-cover object-center"
          />

          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className="h2-bold">{data.name}</h2>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                    ${data.ticketPrices[0]?.price}
                  </p>
                  <p className="p-medium-16 rounded-full bg-gray-500/10 px-4 py-2.5 text-grey-500">
                    Category
                  </p>
                </div>
                <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                  by{" "}
                  <span className="text-primary-500">
                    Brganizer | Organizer
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex gap-2 md:gap-3">
                <Image
                  src="/assets/icons/calendar.svg"
                  alt="calendar"
                  width={32}
                  height={32}
                />
                <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                  <p>
                    {formatDateTime(data.date).dateOnly} -{" "}
                    {formatDateTime(data.date).timeOnly}
                  </p>
                  <p>end tour time and date here </p>
                </div>
              </div>
              <div className="p-regular-20 flex items-center gap-3">
                <Image
                  src="/assets/icons/location.svg"
                  alt="location tour"
                  width={32}
                  height={32}
                />
                <p className="p-medium-16 lg:p-regular-20">{data.location}</p>
              </div>
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
                    Continue To Pay...
                  </span>
                ) : (
                  "Continue To Pay"
                )}
              </Button>
            </div>

            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-grey-600">What You'll Need:</p>
              <p className="p-regular-16 p-regular-18">
                {data.description} Lorem ipsum dolor sit amet consectetur
                adipiscing elit...
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Related Events</h2>

        {/* <Collection
          data={relatedEvents?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={3}
          page={searchParams.page as string}
          totalPages={relatedEvents?.totalPages}
        /> */}
      </section>
    </>
  );
};

export default EventDetails;
