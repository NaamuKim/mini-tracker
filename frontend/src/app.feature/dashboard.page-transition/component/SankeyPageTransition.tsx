"use client";
import React from "react";
import {
  Layer,
  Rectangle,
  ResponsiveContainer,
  Sankey,
  Tooltip,
} from "recharts";
import useQueryFn from "@/app.module/react-query/useQueryFn";
import {
  formatDataForSankeyChart,
  SankeyData,
} from "@/app.feature/dashboard.entry/module/format";
import { PageTransition } from "@/app.feature/dashboard.entry/types/pageTransition";
import { API_SANKEY_TRANSITION } from "@/app.module/constant/api/app.dashboard/transition";
import DashboardBackground from "@/app.components/dashboard/DashboardBackground";

const SankeyPageTransition = () => {
  const { data } = useQueryFn<PageTransition[], SankeyData>(
    [API_SANKEY_TRANSITION],
    {
      select: (data) => formatDataForSankeyChart(data),
    },
  );

  if (!data) return null;

  return (
    <DashboardBackground title="Page Transitions" hasAnimation>
      <ResponsiveContainer aspect={5 / 2} width={600}>
        <Sankey
          data={data}
          node={({ x, y, height, index, payload, containerWidth }) => {
            const width = 15;
            const isOut = x + width + 6 > containerWidth;
            return (
              <Layer key={`CustomNode${index}`}>
                <Rectangle
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill="var(--primary-color)"
                  fillOpacity="1"
                />
                <text
                  textAnchor={isOut ? "end" : "start"}
                  x={isOut ? x - 6 : x + width + 6}
                  y={y + height / 2}
                  fontSize="14"
                  stroke="var(--text-color)"
                  fill="var(--text-color)"
                >
                  {"/" + payload.name.split("/").slice(-2).join("/")}
                </text>
                <text
                  textAnchor={isOut ? "end" : "start"}
                  x={isOut ? x - 6 : x + width + 6}
                  y={y + height / 2 + 13}
                  fontSize="14"
                  stroke="var(--text-secondary-color)"
                  fill="var(--text-secondary-color)"
                >
                  {payload.value}
                </text>
              </Layer>
            );
          }}
          margin={{ top: 0, right: 100, bottom: 80, left: 0 }}
          link={{
            stroke: "var(--sub-color)",
            strokeWidth: 40,
            strokeOpacity: 1,
          }}
        >
          <Tooltip />
        </Sankey>
      </ResponsiveContainer>
    </DashboardBackground>
  );
};

export default SankeyPageTransition;
