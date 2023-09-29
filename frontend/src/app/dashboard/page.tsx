import React from "react";
import { NextPage } from "next";
import ScreenDashboardEntry from "@/app.feature/dashboard.entry/screen/ScreenDashboardEntry";
import MainTopNavigationBar from "@/app.components/MainTopNavigationBar";

const DashboardPage: NextPage = () => {
  return (
    <>
      <MainTopNavigationBar />
      <ScreenDashboardEntry />
    </>
  );
};

export default DashboardPage;
