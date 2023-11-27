import React from "react";
import { NextPage } from "next";
import MainTopNavigationBar from "@/app.components/MainTopNavigationBar";
import ScreenDashboardEntry from "@/app.feature/dashboard.entry/screen/ScreenDashboardEntry";

const DashboardPage: NextPage = () => {
  return (
    <>
      <MainTopNavigationBar />
      <ScreenDashboardEntry />
    </>
  );
};

export default DashboardPage;
