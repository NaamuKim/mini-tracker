"use client";
import React from "react";
import styled from "styled-components";
import TabBar from "@/app.feature/dashboard/component/client/TabBar";
import Dashboards from "@/app.feature/dashboard/component/client/Dashboards";
const ScreenDashboard = () => {
  return (
    <StyledWrapper>
      <h2>Mini Dashboard</h2>
      <TabBar />
      <Dashboards />
    </StyledWrapper>
  );
};

export default ScreenDashboard;

const StyledWrapper = styled.section`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  padding: 40px;
  h2 {
    font-size: 24px;
  }
`;
