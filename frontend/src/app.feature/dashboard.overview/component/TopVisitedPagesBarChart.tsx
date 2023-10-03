import React from "react";
import SimpleBarChart from "@/app.components/dashboard/chart/SimpleBarChart";
import DashboardBackground from "@/app.components/dashboard/DashboardBackground";
import useQueryFn from "@/app.module/react-query/useQueryFn";
import { API_TOP_VISITED } from "@/app.module/constant/api/app.dashboard/overview";
import { TTopVisited } from "@/app.feature/dashboard.overview/module/type/APIResponseType";
import { useSearchParams } from "next/navigation";

const TopVisitedPagesBarChart = () => {
  const queriedUrl = useSearchParams().get("queriedUrl");
  const { data: topVisitedPagesData } = useQueryFn<
    TTopVisited,
    Array<{
      name: string;
      count: number;
    }>
  >(
    [
      API_TOP_VISITED,
      {
        queriedUrl,
      },
    ],
    {
      select: (data) => {
        return data.topVisited.map(({ pageLocation, count }) => ({
          name: pageLocation.startsWith("/")
            ? pageLocation.slice(1)
            : pageLocation,
          count,
        }));
      },
    },
  );

  if (!topVisitedPagesData) return null;

  return (
    <DashboardBackground width="100%" title="Top visited pages">
      <SimpleBarChart data={topVisitedPagesData} xKey="name" yKey="count" />
    </DashboardBackground>
  );
};

export default TopVisitedPagesBarChart;
