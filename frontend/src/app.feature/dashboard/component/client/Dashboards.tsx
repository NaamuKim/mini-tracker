import React from "react";
import styled from "styled-components";
import BarPageTransition from "@/app.feature/dashboard/component/client/chart/BarPageTransition";
import SankeyPageTransition from "@/app.feature/dashboard/component/client/chart/SankeyPageTransition";
import GoingPageView from "@/app.feature/dashboard/page-view/component/chart/GoingPageView";

const Dashboards = () => {
  return (
    <StyledWrapper>
      <div className="quad-section">
        <GoingPageView />
        <div>hi</div>
        <div>hi</div>
        <div>hi</div>
      </div>
      <BarPageTransition />
      <SankeyPageTransition />
    </StyledWrapper>
  );
};

export default Dashboards;

const StyledWrapper = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 30px;
  .quad-section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;
