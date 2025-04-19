"use client";
import { useEffect, useState } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        if (!res.ok) {
          // setError("faild to fetch");
          // throw new Error("Failed to fetch");
          console.log(`Faild to fetch, ${Error}`);
        }

        const result = await res.json();
        setData(result.data);
        setLoading(false);
      } catch (error: any) {
        // Specify error type
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return {
    data,
    error,
    loading,
  };
};

export default useFetch;
