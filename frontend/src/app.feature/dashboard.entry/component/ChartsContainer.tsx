import React from "react";
import styled from "styled-components";
import { useSearchParams } from "next/navigation";
import ScreenOverViewDashboard from "@/app.feature/dashboard.overview/screen/ScreenOverViewDashboard";

const DashboardTabMap = {
  overview: <ScreenOverViewDashboard />,
};

const ChartsContainer = () => {
  const currentTab = useSearchParams().get("tab") || "overview";

  return (
    <StyledWrapper>
      {currentTab &&
        DashboardTabMap[currentTab as keyof typeof DashboardTabMap]}
    </StyledWrapper>
  );
};

export default ChartsContainer;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 30px;
  .quad-section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  > div {
    display: flex;
  }
  .quad-section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 30px;
  }
`;
