import React from "react";
import DailyViewLineChart from "@/app.feature/dashboard.overview/component/DailyViewLineChart";
import SessionGaugeChart from "@/app.feature/dashboard.overview/component/SessionGaugeChart";
import styled from "styled-components";

const ScreenOverViewDashboard = () => {
  return (
    <StyledWrapper>
      <DailyViewLineChart />
      <SessionGaugeChart />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
`;

export default ScreenOverViewDashboard;
