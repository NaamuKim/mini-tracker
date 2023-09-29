import React from "react";
import { NextPage } from "next";
import ScreenDashboardEntry from "@/app.feature/dashboard.entry/screen/ScreenDashboardEntry";
import Index from "@/app.components/MainTopNavigationBar";

const DashboardPage: NextPage = () => {
  return (
    <>
      <Index />
      <ScreenDashboardEntry />
    </>
  );
};

export default DashboardPage;
