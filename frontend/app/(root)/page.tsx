"use client";
import Card from "@/components/shared/Card";
import Pagenation from "@/components/shared/Pagenation";
import SearchBar from "@/components/shared/SearchBar";
import SearchBus from "@/components/shared/SearchBus";
import { SkeletonCard } from "@/components/shared/SkeletonCard";
import { Button } from "@/components/ui/button";
import { formUrlQuery } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const base_url = process.env.BASE_URL || "http://localhost:4242/api/v1";

type BusTicket = {
  // Define the BusTicket type according to your API response
  id: string; // Example property
  // other properties based on the API response
};

export default function Home({ searchParams }: SearchParamProps) {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const name = searchParams?.name || "";
  const location = searchParams?.location || "";
  const capacity = Number(searchParams?.capacity) || 10;
  const [currentType, setCurrentType] = useState("");

  // -------------------------------------------

  const [dataBus, setDataBus] = useState<BusTicket | null>(null);
  const [loadingDataBus, setLoadingDataBus] = useState(false);
  const [errorDataBus, setErrorDataBus] = useState<string | null>(null);
  // --------------------------------------------

  const itemsPerPage = 8;
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);

  // --------------------------------------------

  useEffect(() => {
    // Retrieve currentType from local storage on mount
    const storedType = localStorage.getItem("currentType");
    if (storedType) {
      setCurrentType(storedType);
    }
  }, []);

  useEffect(() => {
    // Store currentType in local storage whenever it changes
    localStorage.setItem("currentType", currentType);
  }, [currentType]);

  const fetchUrl = () => {
    const baseUrl =
      currentType === "events"
        ? `${base_url}/events/search/getEventsBySearch?name=${name}&page=${page}&limit=${itemsPerPage}`
        : `${base_url}/tours/search/getToursBySearch?name=${name}&page=${page}&limit=${itemsPerPage}`;

    return baseUrl; // Returning the baseUrl directly
  };

  const fetchData = async () => {
    const url = fetchUrl();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch data.");
      }
      const result = await res.json();
      setTotalItems(result.count || 0);
      setData(result.data || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = (type: string) => {
    setCurrentType(type);
    setPage(1);
  };

  useEffect(() => {
    fetchData();
    // scroll: false;
  }, [page, itemsPerPage, currentType, name, location, capacity]);

  const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUrl = formUrlQuery({
      params: router.asPath,
      key: "name",
      value: name,
    });
    router.push(newUrl);
  };

  // --------------------------------------
  // const [error, setError] = useState<string | null>(null);
  // const [loading, setLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    const fetchBusTicket = async () => {
      setLoadingDataBus(true);
      try {
        const response = await fetch(`${base_url}/bus`); // Adjust API endpoint as necessary
        if (!response.ok) {
          throw new Error("Failed to fetch bus ticket data.");
        }
        const dataBus = await response.json();
        setDataBus(dataBus.data); // Assuming the API returns a bus ticket object directly
      } catch (err: any) {
        setErrorDataBus(err.message);
      } finally {
        setLoadingDataBus(false); // Set loading to false
      }
    };

    fetchBusTicket();
    setCurrentType("");
  }, []);

  const handleSelectTrip = () => {
    console.log("Selected trip:", dataBus);
    // Call the backend API to create a bus ticket if needed
  };

  return (
    <>
      {/* {loading && <h4>loading ...........</h4>} */}
      {error && <h4>{error}</h4>}
      <section className="bg-gray-100  bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-8 md:grid-cols-2 2xl:gap-8">
          <div className="flex flex-col justify-center gap-8 lg:text-start text-center">
            {currentType !== "transportbus" && (
              <>
                <h1 className="h1-bold">
                  Lite Ticket Your Events , Our Platform
                </h1>
                <p className="p-regular-20 md:p-regular-24">
                  Book your events with us , more 4500+ mentors in world-class
                  compaies with our global
                </p>
              </>
            )}
            <div className="flex items-center justify-center">
              <Button
                size="lg"
                asChild
                className="button w-full mx-1 bg-blue-500 hover:bg-blue-600"
                onClick={() => handleButtonClick("tours")}
              >
                <Link href="">الرحلات</Link>
              </Button>
              <Button
                size="lg"
                asChild
                className="button w-full mx-1 bg-purple-600 hover:bg-purple-700"
                onClick={() => handleButtonClick("events")}
              >
                <Link href="">الحفلات</Link>
              </Button>
              <Button
                size="lg"
                asChild
                className="button w-full mx-1 bg-[#ffde59] text-gray-800 rounded-md hover:bg-[#ffcf10] transition duration-200"
                onClick={() => handleButtonClick("transportbus")}
              >
                <Link href="">باص النقل</Link>
              </Button>
            </div>
          </div>
          {currentType !== "transportbus" && (
            <div className="hero__content hero__img-box  grid grid-cols-3">
              <Image
                src="/assets/images/LiteTicket_Hero.webp"
                alt="Lite Ticket Hero Image"
                width={1000}
                height={1000}
                className="px-1 lg:h-[320px] h-[250px]"
              />
              <video
                src="/assets/images/Lite Ticket Post.mp4"
                width={1000}
                height={1000}
                className="px-1 lg:mt-4 mt-0 lg:h-[320px] h-[250px]"
                controls
                muted
              />
              <Image
                src="/assets/images/LiteTicket_Hero.webp"
                alt="Lite Ticket Hero Image"
                width={1000}
                height={1000}
                className="px-1 lg:mt-8 mt-0 lg:h-[320px] h-[250px]"
              />
            </div>
          )}
        </div>
      </section>
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        {currentType === "tours" && (
          <h2 className="h2-bold">
            Explore our <br /> Platform of Tours
          </h2>
        )}
        {currentType === "events" && (
          <h2 className="h2-bold">
            Trust by <br /> Thousands of Events
          </h2>
        )}
        {currentType === "transportbus" && (
          <h1 className="flex flex-col h2-bold font-bold mb-6">
            أحجز سفرتك معنا بكل سهولة
            <span className="mt-2 text-3xl">أكثر من 3000 رحلة مختلفة</span>
          </h1>
        )}
        {currentType !== "tours" &&
          currentType !== "events" &&
          currentType !== "transportbus" &&
          loading === true && (
            <h2 className="h2-bold items-center justify-center bg-red-400 text-center rounded-lg p-10 text-white">
              This Page Coming Soon
            </h2>
          )}

        {currentType === "transportbus" ? (
          <div className="">
            <SearchBus />
          </div>
        ) : (
          <div className="flex w-full flex-col gap-5 md:flex-row">
            <div className="w-full">
              {currentType !== "transportbus" && (
                <SearchBar
                  nameState={name} // Example: Pass down state to the SearchBar
                  locationState={location}
                  capacityState={capacity}
                  onSubmit={handleSubmitSearch} // handle submit function in SearchBar
                />
              )}
            </div>
          </div>
        )}

        <>
          {loading ? (
            <div className="grid w-full gap-4 items-center justify-center md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : (
            <div
              className={
                currentType !== "transportbus"
                  ? "grid w-full gap-4 items-center justify-center md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
                  : "w-full"
              }
            >
              {currentType === "transportbus" ? (
                <div className="mx-auto">
                  {dataBus && dataBus.length > 0 ? (
                    dataBus.map((item: any, index: any) => (
                      <ul key={index}>
                        {/* <CardBus
                          dataBus={item}
                          loadingDataBus={loadingDataBus}
                        /> */}
                        {/* You can add more <CardBus /> components here */}
                      </ul>
                    ))
                  ) : (
                    <h4>No Data Bus</h4>
                  )}
                </div>
              ) : data && data.length > 0 ? (
                data.map((item: any, index: any) => (
                  <Card key={index} data={item} type={currentType} />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center text-center rounded-lg p-10 text-gray-500">
                  <div role="status">
                    {/* Loading Spinner */}
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </>

        <div className="pagination-controls">
          {currentType !== "transportbus" && totalItems > itemsPerPage && (
            <Pagenation
              page={page}
              setPage={setPage}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
            />
          )}
        </div>
      </section>
    </>
  );
}
