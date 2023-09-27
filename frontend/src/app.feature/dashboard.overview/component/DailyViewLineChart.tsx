"use client";

import React from "react";
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useQueryFn from "@/app.module/react-query/useQueryFn";
import { API_DAILY_VIEW } from "@/app.module/constant/api/app.dashboard";
import {
  formatMMDD,
  formatYYYYMMDD,
  getNextDay,
  getSevenDaysAgo,
} from "@/app.module/utils/date";

const DailyViewLineChart = () => {
  const { data: dailyViewData } = useQueryFn<
    { visitors: Array<{ date: Date; count: number }> },
    Array<{
      name: string;
      viewCount: number;
    }>
  >(
    [
      API_DAILY_VIEW,
      {
        startDate: formatYYYYMMDD(getSevenDaysAgo(new Date())),
        endDate: formatYYYYMMDD(getNextDay(new Date())),
      },
    ],
    {
      select: (res) => {
        return res.visitors.map((item) => ({
          name: formatMMDD(new Date(item.date)),
          viewCount: item.count,
        }));
      },
    },
  );

  return (
    <ResponsiveContainer width="70%" height={300}>
      <LineChart
        data={dailyViewData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="viewCount" stroke="var(--link-color)" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DailyViewLineChart;
