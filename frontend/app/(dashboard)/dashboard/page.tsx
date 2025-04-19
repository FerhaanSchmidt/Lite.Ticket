import React from "react";
import DashboardCompanyHero from "@/components/companydashboard/DashboardCompanyHero";
import DashboardCompanyHeader from "@/components/companydashboard/layout/DashboardCompanyHeader";
import DashboardCompanySideBar from "@/components/companydashboard/layout/DashboardCompanySideBar";

const DashboardCompany = () => {
  return (
    <div className="">
      <DashboardCompanyHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] md:w-[230px] border-r border-gray-900 shadow-md ">
          <DashboardCompanySideBar active={1} />
        </div>
        <DashboardCompanyHero />
      </div>
    </div>
  );
};

export default DashboardCompany;
