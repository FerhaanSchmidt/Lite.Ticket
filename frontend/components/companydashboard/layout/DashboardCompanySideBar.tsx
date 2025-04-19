import Link from "next/link";
import React from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";

const DashboardCompanySideBar = ({ active }) => {
  return (
    <div className="w-full h-[100vh] bg-gray-800 shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* dashboard item */}
      <div className="w-full flex items-center p-4">
        <Link href="/dashboard" className="w-full flex items-center">
          <RxDashboard
            size={30}
            color={`${active === 1 ? "crimson" : "white"}`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400] ${
              active === 1 ? "text-[crimson]" : "text-white"
            }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>

      {/* orders item */}
      <div className="w-full flex items-center p-4">
        <Link href="/dashboard/all-orders" className="w-full flex items-center">
          <FiShoppingBag
            size={30}
            color={`${active === 2 ? "crimson" : "white"}`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400] ${
              active === 2 ? "text-[crimson]" : "text-white"
            }`}
          >
            All Orders
          </h5>
        </Link>
      </div>

      {/* products item */}
      <div className="w-full flex items-center p-4">
        <Link
          href="/dashboard/all-transports"
          className="w-full flex items-center"
        >
          <FiPackage
            size={30}
            color={`${active === 3 ? "crimson" : "white"}`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400] ${
              active === 3 ? "text-[crimson]" : "text-white"
            }`}
          >
            All Transports
          </h5>
        </Link>
      </div>

      {/* create product item */}
      <div className="w-full flex items-center p-4">
        <Link
          href="/dashboard/create-transport"
          className="w-full flex items-center"
        >
          <AiOutlineFolderAdd
            size={30}
            color={`${active === 4 ? "crimson" : "white"}`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400] ${
              active === 4 ? "text-[crimson]" : "text-white"
            }`}
          >
            Create Transport
          </h5>
        </Link>
      </div>

      {/* events item */}
      <div className="w-full flex items-center p-4">
        <Link
          href="/dashboard/all-drivers"
          className="w-full flex items-center"
        >
          <MdOutlineLocalOffer
            size={30}
            color={`${active === 5 ? "crimson" : "white"}`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400] ${
              active === 5 ? "text-[crimson]" : "text-white"
            }`}
          >
            All Drivers
          </h5>
        </Link>
      </div>

      {/* create events item */}
      <div className="w-full flex items-center p-4">
        <Link
          href="/dashboard/create-driver"
          className="w-full flex items-center"
        >
          <VscNewFile
            size={30}
            color={`${active === 6 ? "crimson" : "white"}`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400] ${
              active === 6 ? "text-[crimson]" : "text-white"
            }`}
          >
            Create Driver
          </h5>
        </Link>
      </div>

      {/* withdraw item */}
      {/* <div className="w-full flex items-center p-4">
        <Link
          href="/dashboard-withdraw-money"
          className="w-full flex items-center"
        >
          <CiMoneyBill
            size={30}
            color={`${active === 7 ? "crimson" : "white"}`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400] ${
              active === 7 ? "text-[crimson]" : "text-white"
            }`}
          >
            Withdraw Money
          </h5>
        </Link>
      </div> */}

      {/* messages item */}
      {/* <div className="w-full flex items-center p-4">
        <Link href="/dashboard-messages" className="w-full flex items-center">
          <BiMessageSquareDetail
            size={30}
            color={`${active === 8 ? "crimson" : "white"}`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400] ${
              active === 8 ? "text-[crimson]" : "text-white"
            }`}
          >
            Shop Inbox
          </h5>
        </Link>
      </div> */}

      {/* coupouns item */}
      {/* <div className="w-full flex items-center p-4">
        <Link href="/dashboard-coupouns" className="w-full flex items-center">
          <AiOutlineGift
            size={30}
            color={`${active === 9 ? "crimson" : "white"}`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400] ${
              active === 9 ? "text-[crimson]" : "text-white"
            }`}
          >
            Discount Codes
          </h5>
        </Link>
      </div> */}

      {/* refunds item */}
      {/* <div className="w-full flex items-center p-4">
        <Link href="/dashboard-refunds" className="w-full flex items-center">
          <HiOutlineReceiptRefund
            size={30}
            color={`${active === 10 ? "crimson" : "white"}`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400] ${
              active === 10 ? "text-[crimson]" : "text-white"
            }`}
          >
            Refunds
          </h5>
        </Link>
      </div> */}

      {/* settings item */}
      <div className="w-full flex items-center p-4">
        <Link href="/dashboard/settings" className="w-full flex items-center">
          <CiSettings
            size={30}
            color={`${active === 11 ? "crimson" : "white"}`}
          />
          <h5
            className={`hidden md:block pl-2 text-[18px] font-[400] ${
              active === 11 ? "text-[crimson]" : "text-white"
            }`}
          >
            Settings
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default DashboardCompanySideBar;
