import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import DashboardBackground from "@/app.components/dashboard/DashboardBackground";
import PieChartRenderLabel from "@/app.components/dashboard/chart/PieChartRenderLabel";

const data = [
  {
    name: "Group A",
    value: 400,
  },
  {
    name: "Group B",
    value: 300,
  },
  {
    name: "Group C",
    value: 300,
  },
  {
    name: "Group D",
    value: 200,
  },
  {
    name: "Group E",
    value: 278,
  },
  {
    name: "Group F",
    value: 189,
  },
];

const COLORS = [
  "var(--primary-color)",
  "var(--sub-color)",
  "var(--section-blue)",
  "var(--section-green)",
] as const;

const ReferrerSourcesPieChart = () => {
  return (
    <div>
      <DashboardBackground title="Referrer Sources">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              labelLine={false}
              label={PieChartRenderLabel("name")}
              dataKey="value"
              nameKey="name"
              outerRadius="80%"
              cx="50%"
              cy="50%"
              data={data}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`referrer-pie-char-cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </DashboardBackground>
    </div>
  );
};

export default ReferrerSourcesPieChart;
