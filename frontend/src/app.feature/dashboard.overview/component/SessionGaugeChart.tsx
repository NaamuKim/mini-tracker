import React from "react";
import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip } from "recharts";
import DashboardBackground from "@/app.components/dashboard/DashboardBackground";
import useQueryFn from "@/app.module/react-query/useQueryFn";
import { API_TOP_STAYED } from "@/app.module/constant/api/app.dashboard/overview";
import { TTopStayed } from "@/app.feature/dashboard.overview/module/type/APIResponseType";
import PieChartRenderLabel from "@/app.components/dashboard/chart/PieChartRenderLabel";
import { useSearchParams } from "next/navigation";

const COLORS = [
  "var(--sub-color)",
  "var(--text-secondary-color)",
  "var(--primary-color)",
];

const SessionGaugeChart = () => {
  const queriedUrl = useSearchParams().get("queriedUrl");
  const { data: mostStayedPages } = useQueryFn<
    TTopStayed,
    Array<{
      name: string;
      value: number;
    }>
  >(
    [
      API_TOP_STAYED,
      {
        queriedUrl,
      },
    ],
    {
      select: (data) =>
        data.topStayed.map((item) => ({
          name: item.pageLocation.startsWith("/")
            ? item.pageLocation.slice(1)
            : item.pageLocation,
          value: item.duration,
        })),
    },
  );

  return (
    <DashboardBackground width="30%" title="Long Stayed Pages">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            dataKey="value"
            outerRadius="80%"
            startAngle={180}
            endAngle={0}
            fill="#8884d8"
            cx="50%"
            cy="70%"
            data={mostStayedPages}
            labelLine={false}
            label={PieChartRenderLabel()}
          >
            {mostStayedPages?.map((entry, index) => (
              <Cell
                key={`mostStayedCell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [value, name]} />
        </PieChart>
      </ResponsiveContainer>
    </DashboardBackground>
  );
};

export default SessionGaugeChart;
