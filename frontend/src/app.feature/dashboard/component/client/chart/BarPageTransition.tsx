import React from "react";
import DashboardBackground from "@/app.feature/dashboard/component/client/DashboardBackground";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useQueryFn from "@/app.module/react-query/useQueryFn";
import { BestPageTransition } from "@/app.feature/dashboard/types/pageTransition";

const BarPageTransition = () => {
  const { data } = useQueryFn<BestPageTransition[]>(
    ["/event/page-transition-best"],
    {
      select: (data) => {
        return data.map((item: BestPageTransition) => ({
          name:
            item.previous_page.split("/").pop() +
            " -> " +
            item.current_page.split("/").pop(),
          value: item.transition_count,
        }));
      },
    },
  );

  if (!data) return null;

  return (
    <DashboardBackground title="Page Transition Bar">
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="var(--link-color)" />
      </BarChart>
    </DashboardBackground>
  );
};

export default BarPageTransition;
