"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button"; // Ensure this button component is styled correctly.
import SelectLocation from "../shared/SelectLocation";
import { AuthContext } from "@/context/(companyAuth)/AuthContext";
import Cookies from "js-cookie";

const base_url = process.env.BASE_URL || "http://localhost:4242/api/v1";

interface Driver {
  id: number;
  name: string;
  licenseNumber: string;
  phone: string;
}

const DashboardCompanyCreateTransport = () => {
  const { state } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [itemsDriver, setItemsDriver] = useState<Driver[]>([]);

  const today = new Date().toISOString().split("T")[0];
  const now = new Date();
  const [travelDate, setTravelDate] = useState(today);

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    startUpAt: "",
    estimatedArrivalAt: "",
    price: "",
    totalSeats: "",
    availableSeats: "",
    busNumber: "",
    driver: "",
    amenities: "",
    restStops: "",
  });

  const formatCurrentTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const [travelTime, setTravelTime] = useState(formatCurrentTime(now));
  const [downTime, setDownTime] = useState(formatCurrentTime(now));

  useEffect(() => {
    const fetchData = async () => {
      if (state.company && state.company._id) {
        try {
          const response = await fetch(
            `${base_url}/company/drivers/company/${state.company._id}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch drivers");
          }

          const data = await response.json();
          setItemsDriver(data.data || []);
        } catch (fetchError) {
          console.error("Fetch error:", fetchError);
          setError(fetchError.message);
        } finally {
          setLoading(false);
        }
      } else {
        setError("Company not found");
        setLoading(false);
      }
    };

    if (state.company) {
      fetchData();
    }
  }, [state.company]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      fd.append(key, value);
    });

    fd.append("startUpAt", `${travelDate}T${travelTime}`);
    fd.append("estimatedArrivalAt", `${travelDate}T${downTime}`);

    try {
      const token = Cookies.get("accessToken"); // Retrieve token
      console.log("Token from cookies:", token); // Log token for debugging
      const response = await fetch(`${base_url}/bus`, {
        method: "POST",
        body: fd,
        headers: {
          Authorization: `Bearer ${token}`, // Get the token from the cookie
        },
        // credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to create bus ticket");
      }

      const result = await response.json();
      console.log("Bus ticket created:", result);
    } catch (error) {
      console.error("Create bus ticket error:", error);
      setError(error.message);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-400 flex justify-center">
      <div className="m-10 w-full bg-white border border-gray-400 shadow-lg p-6 rounded-md max-h-[70vh]">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                الانطلاق من
              </label>
              <SelectLocation name="from" onChange={handleChange} />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                الوصول الى
              </label>
              <SelectLocation name="to" onChange={handleChange} />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                تاريخ الانطلاق
              </label>
              <input
                type="date"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={travelDate}
                min={today}
                onChange={(e) => setTravelDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                تاريخ الوصول
              </label>
              <input
                type="date"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={travelDate}
                min={today}
                onChange={(e) => setTravelDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                ساعة الانطلاق
              </label>
              <input
                type="time"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={travelTime}
                min={formatCurrentTime(now)}
                onChange={(e) => {
                  setTravelTime(e.target.value);
                  if (downTime < e.target.value) {
                    setDownTime(e.target.value);
                  }
                }}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                ساعة الوصول
              </label>
              <input
                type="time"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={downTime}
                min={travelTime}
                onChange={(e) => setDownTime(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                عدد مقاعد الحافلة
              </label>
              <input
                type="number"
                name="totalSeats"
                onChange={handleChange}
                placeholder="Bus Seats (30,40,45 Seats) or ... 50"
                required
                min={30}
                max={56}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                رقم الحافلة
              </label>
              <input
                type="text"
                name="busNumber"
                onChange={handleChange}
                placeholder="دمشق 123456"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                السائق
              </label>
              <select
                name="driver"
                onChange={handleChange}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="">أختر سائق الحافلة</option>
                {itemsDriver.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                عدد الاستراحات
              </label>
              <input
                type="number"
                name="restStops"
                onChange={handleChange}
                placeholder="1,2,5 ...."
                required
                min={1}
                max={20}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                سعر الرحلة
              </label>
              <input
                type="number"
                name="price"
                onChange={handleChange}
                placeholder="2000  3000  7500"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button
            type="submit"
            className="mt-4 w-full bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg text-sm px-5 py-2.5"
          >
            إنشاء تذكرة حافلة
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DashboardCompanyCreateTransport;
