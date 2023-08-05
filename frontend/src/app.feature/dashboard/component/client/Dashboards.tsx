import React from "react";
import styled from "styled-components";
import BarPageTransition from "@/app.feature/dashboard/component/client/chart/BarPageTransition";
import SankeyPageTransition from "@/app.feature/dashboard/component/client/chart/SankeyPageTransition";

const Dashboards = () => {
  return (
    <StyledWrapper>
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
`;
