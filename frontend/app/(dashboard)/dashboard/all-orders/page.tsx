import React from "react";
import DashboardCompanyHeader from "@/components/companydashboard/layout/DashboardCompanyHeader";
import DashboardCompanySideBar from "@/components/companydashboard/layout/DashboardCompanySideBar";
import DashboardCompanyAllOrders from "@/components/companydashboard/DashboardCompanyAllOrders";

const AllOrders = () => {
  return (
    <div className="">
      <DashboardCompanyHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] md:w-[230px] border-r border-gray-900 shadow-md ">
          <DashboardCompanySideBar active={2} />
        </div>
        <DashboardCompanyAllOrders />
      </div>
    </div>
  );
};

export default AllOrders;
