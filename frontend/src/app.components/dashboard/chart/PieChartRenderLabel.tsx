import React from "react";
import { PieLabelRenderProps } from "recharts";

const PieChartRenderLabel =
  (propsKey?: string) =>
  // eslint-disable-next-line react/display-name
  ({
    cx = 0,
    cy = 0,
    midAngle = 0,
    innerRadius = 0,
    outerRadius = 0,
    percent = 0,
    ...props
  }: PieLabelRenderProps) => {
    const RADIAN = Math.PI / 180;
    const radius =
      Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.5;

    const offset = 20;
    const x =
      Number(cx) +
      radius * Math.cos(-midAngle * RADIAN) +
      offset * Math.cos(-midAngle * RADIAN);
    const y =
      Number(cy) +
      radius * Math.sin(-midAngle * RADIAN) +
      offset * Math.sin(-midAngle * RADIAN);
    const content =
      props[propsKey as string] || `${(percent * 100).toFixed(0)}%`;

    return (
      <text
        x={x}
        y={y}
        fill="var(--text-color)"
        fontWeight={600}
        fontSize={14}
        textAnchor="middle"
        dominantBaseline="central"
      >
        {content}
      </text>
    );
  };

export default PieChartRenderLabel;
