import React from "react";
import DailyViewLineChart from "@/app.feature/dashboard.overview/component/DailyViewLineChart";
import SessionGaugeChart from "@/app.feature/dashboard.overview/component/SessionGaugeChart";
import styled from "styled-components";
import TopVisitedPagesBarChart from "@/app.feature/dashboard.overview/component/TopVisitedPagesBarChart";
import ReferrerSourcesPieChart from "@/app.feature/dashboard.overview/component/ReferrerSourcesPieChart";

const ScreenOverViewDashboard = () => {
  return (
    <StyledWrapper>
      <div id="top-chart-section">
        <DailyViewLineChart />
        <SessionGaugeChart />
      </div>
      <TopVisitedPagesBarChart />
      <div id="bottom-chart-section">
        <ReferrerSourcesPieChart />
        <div>Page Transitions</div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  #top-chart-section {
    display: flex;
  }
  #bottom-chart-section {
    display: flex;
    gap: 10px;
    > div {
      flex: 1;
    }
  }
`;

export default ScreenOverViewDashboard;
