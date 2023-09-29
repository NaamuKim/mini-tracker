import React from "react";
import DailyViewLineChart from "@/app.feature/dashboard.overview/component/DailyViewLineChart";
import SessionGaugeChart from "@/app.feature/dashboard.overview/component/SessionGaugeChart";
import styled from "styled-components";
import TopVisitedPagesBarChart from "@/app.feature/dashboard.overview/component/TopVisitedPagesBarChart";

const ScreenOverViewDashboard = () => {
  return (
    <StyledWrapper>
      <div id="top-chart-section">
        <DailyViewLineChart />
        <SessionGaugeChart />
      </div>
      <TopVisitedPagesBarChart />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  #top-chart-section {
    display: flex;
  }
`;

export default ScreenOverViewDashboard;
