import React from "react";
import styled from "styled-components";
import SankeyPageTransition from "@/app.feature/dashboard/component/client/SankeyPageTransition";

const Dashboards = () => {
  return (
    <StyledWrapper>
      <SankeyPageTransition />
    </StyledWrapper>
  );
};

export default Dashboards;

const StyledWrapper = styled.div`
  margin-top: 30px;
`;
