import React from "react";
import SimpleBarChart from "@/app.components/dashboard/SimpleBarChart";
import DashboardBackground from "@/app.components/dashboard/DashboardBackground";

const TopPagesBarChart = () => {
  return (
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
  );
};

export default TopPagesBarChart;
