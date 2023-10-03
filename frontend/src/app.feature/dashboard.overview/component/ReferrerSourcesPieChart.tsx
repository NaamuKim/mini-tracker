import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import DashboardBackground from "@/app.components/dashboard/DashboardBackground";
import PieChartRenderLabel from "@/app.components/dashboard/chart/PieChartRenderLabel";
import useQueryFn from "@/app.module/react-query/useQueryFn";
import { TReferrers } from "@/app.feature/dashboard.overview/module/type/APIResponseType";
import { API_REFERRERS } from "@/app.module/constant/api/app.dashboard/overview";
import { formatReferrer } from "@/app.feature/dashboard.overview/module/util/format";
import { useSearchParams } from "next/navigation";

const COLORS = [
  "var(--primary-color)",
  "var(--sub-color)",
  "var(--section-blue)",
  "var(--section-green)",
] as const;

const ReferrerSourcesPieChart = () => {
  const queriedUrl = useSearchParams().get("queriedUrl");
  const { data: referrersData } = useQueryFn<
    TReferrers,
    TReferrers["referrers"]
  >(
    [
      API_REFERRERS,
      {
        queriedUrl,
      },
    ],
    {
      select: (data) =>
        data.referrers.map((item) => ({
          ...item,
          name: formatReferrer(item.referrer),
        })),
    },
  );

  if (!referrersData) return null;

  return (
    <div>
      <DashboardBackground title="Referrer Sources">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              labelLine={false}
              label={PieChartRenderLabel("name")}
              dataKey="count"
              nameKey="name"
              outerRadius="80%"
              cx="50%"
              cy="50%"
              data={referrersData}
            >
              {referrersData.map((entry, index) => (
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
