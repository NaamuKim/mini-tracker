import React from "react";
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";
import useQueryFn from "@/app.module/react-query/useQueryFn";
import { BestPageTransition } from "@/app.feature/dashboard/types/pageTransition";
import DashboardBackground from "@/app.feature/dashboard/component/client/DashboardBackground";
import { API_BEST_BARS_TRANSITION } from "@/app.module/constant/api/app.dashboard";

const BarPageTransition = () => {
  const { data } = useQueryFn<
    BestPageTransition[],
    { name: string; value: number }[]
  >([API_BEST_BARS_TRANSITION], {
    select: (data) => {
      return data.map((item: BestPageTransition) => ({
        name:
          item.previous_page.split("/").pop() +
          " -> " +
          item.current_page.split("/").pop(),
        value: item.transition_count,
      }));
    },
  });

  if (!data) return null;

  return (
    <DashboardBackground title="Best Page Transition">
      <BarChart
        width={300}
        height={300}
        data={data}
        margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <XAxis dataKey="name" />
        <YAxis width={20} />
        <Tooltip
          labelStyle={{
            color: "var(--text-secondary-color)",
          }}
        />
        <Bar dataKey="value" fill="var(--link-color)" barSize={30} />
      </BarChart>
    </DashboardBackground>
  );
};

export default BarPageTransition;
