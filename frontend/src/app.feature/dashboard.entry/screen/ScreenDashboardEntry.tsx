"use client";
import React from "react";
import styled from "styled-components";
import ChartsContainer from "@/app.feature/dashboard.entry/component/ChartsContainer";
import TabBar from "@/app.components/TabBar";
import MainTopNavigationBar from "@/app.components/MainTopNavigationBar";
import { useSearchParams } from "next/navigation";
import { ENV_CONSTANTS } from "@/app.module/constant/env";
import { REGEX } from "@/app.module/utils/REGEX";
const ScreenDashboardEntry = () => {
  const queriedUrl =
    useSearchParams().get("queriedUrl") || ENV_CONSTANTS.APP_EXAMPLE_PAGE_URL;
  return (
    <StyledWrapper>
      <h2>{queriedUrl.replace(REGEX.SIMPLIFY_URL_PREFIX, "")}</h2>
      <TabBar />
      <ChartsContainer />
    </StyledWrapper>
  );
};

export default ScreenDashboardEntry;

const StyledWrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 40px;
  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }
`;
