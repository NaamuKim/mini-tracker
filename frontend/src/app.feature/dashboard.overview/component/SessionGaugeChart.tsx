import React from "react";
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Cell,
  Tooltip,
  PieLabelRenderProps,
} from "recharts";
import DashboardBackground from "@/app.components/dashboard/DashboardBackground";
import useQueryFn from "@/app.module/react-query/useQueryFn";
import { API_TOP_STAYED } from "@/app.module/constant/api/app.dashboard/overview";
import { TTopStayed } from "@/app.feature/dashboard.overview/module/type/APIResponseType";

const COLORS = [
  "var(--sub-color)",
  "var(--text-secondary-color)",
  "var(--link-color)",
];

const renderLabel = ({
  cx = 0,
  cy = 0,
  midAngle = 0,
  innerRadius = 0,
  outerRadius = 0,
  percent = 0,
}: PieLabelRenderProps) => {
  const RADIAN = Math.PI / 180;
  const radius =
    Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.5; // 레이블이 위치할 반경 설정
  const x = Number(cx) + radius * Math.cos(-midAngle * RADIAN);
  const y = Number(cy) + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="var(--text-color)"
      fontWeight={700}
      textAnchor={x > Number(cx) ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const SessionGaugeChart = () => {
  const { data: mostStayedPages } = useQueryFn<
    TTopStayed,
    Array<{
      name: string;
      value: number;
    }>
  >([API_TOP_STAYED], {
    select: (data) =>
      data.topStayed.map((item) => ({
        name: item.pageLocation.startsWith("/")
          ? item.pageLocation.slice(1)
          : item.pageLocation,
        value: item.duration,
      })),
  });

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
            label={renderLabel}
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
