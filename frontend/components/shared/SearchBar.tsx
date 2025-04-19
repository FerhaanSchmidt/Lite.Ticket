"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const SearchBar = ({
  nameState,
  locationState,
  capacityState,
  onSubmit,
}: {
  nameState: string;
  locationState: string;
  capacityState: number;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState("");

  // Effect to manage search URL updates
  useEffect(() => {
    const debounceFn = setTimeout(() => {
      let newUrl;
      if (query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "name",
          value: query,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["query", "name"],
        });
      }
      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(debounceFn);
  }, [query, searchParams, router]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    onSubmit(e); // Call the passed in onSubmit function
    setQuery(""); // Clear the input state after submitting
    router.push("/desired-path"); // Navigate to your desired page
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
        />
        <Input
          type="text"
          placeholder="Search Tours And Events"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          className="p-regular-16 border-0 bg-grey-50 outline-offset-0 placeholder:text-gray-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
    </form>
  );
};

export default SearchBar;
