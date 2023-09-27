"use client";
import React from "react";
import styled from "styled-components";
import ChartsContainer from "@/app.feature/dashboard.entry/component/ChartsContainer";
import TabBar from "@/app.components/TabBar";
const ScreenDashboardEntry = () => {
  return (
    <StyledWrapper>
      <h2>Mini Dashboard</h2>
      <TabBar />
      <ChartsContainer />
    </StyledWrapper>
  );
};

export default ScreenDashboardEntry;

const StyledWrapper = styled.section`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  padding: 40px;
  h2 {
    font-size: 24px;
  }
`;
