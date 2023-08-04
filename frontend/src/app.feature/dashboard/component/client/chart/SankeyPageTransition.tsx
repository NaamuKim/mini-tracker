"use client";
import React from "react";
import DashboardBackground from "@/app.feature/dashboard/component/client/DashboardBackground";
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
} from "@/app.feature/dashboard/module/format";
import { PageTransition } from "@/app.feature/dashboard/types/pageTransition";

const SankeyPageTransition = () => {
  const { data } = useQueryFn(["/event/page-transitions"], {
    select: (data) => formatDataForSankeyChart(data as PageTransition[]),
  });
  if (!data) return null;

  return (
    <DashboardBackground title="Page Transitions">
      <ResponsiveContainer aspect={2 / 1}>
        <Sankey
          data={data as SankeyData}
          node={({ x, y, height, index, payload, containerWidth }) => {
            const width = 20;
            const isOut = x + width + 6 > containerWidth;
            return (
              <Layer key={`CustomNode${index}`}>
                <Rectangle
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill="var(--link-color)"
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
          margin={{ top: 0, right: 120, bottom: 80, left: 80 }}
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
