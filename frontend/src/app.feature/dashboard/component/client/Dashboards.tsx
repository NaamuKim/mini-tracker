import React from "react";
import styled from "styled-components";
import BarPageTransition from "@/app.feature/dashboard/component/client/chart/BarPageTransition";
import SankeyPageTransition from "@/app.feature/dashboard/component/client/chart/SankeyPageTransition";
import GoingPageView from "@/app.feature/dashboard/page-view/component/chart/GoingPageView";

import SimpleBarChart from "@/app.components/dashboard/SimpleBarChart";
import DashboardBackground from "@/app.feature/dashboard/component/client/DashboardBackground";

const Dashboards = () => {
  return (
    <StyledWrapper>
      <div>
        <div className="quad-section">
          <GoingPageView />
          <GoingPageView />
          <GoingPageView />
          <GoingPageView />
        </div>
        <BarPageTransition />
        <SankeyPageTransition />
      </div>
      <DashboardBackground title="Top Pages">
        <SimpleBarChart
          data={[
            { name: "Page A", view: 240 },
            { name: "Page B", view: 2210 },
            { name: "Page C", view: 2300 },
            { name: "Page D", view: 2000 },
            { name: "Page E", view: 0 },
            { name: "Page F", view: 123 },
            { name: "Page G", view: 2091 },
          ]}
          xKey="name"
          yKey="view"
        />
      </DashboardBackground>
    </StyledWrapper>
  );
};

export default Dashboards;

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
    gap: 30px;
  }
  .quad-section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 30px;
  }
`;
