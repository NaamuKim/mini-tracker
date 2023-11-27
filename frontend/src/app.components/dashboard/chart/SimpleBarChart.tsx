import React, { useMemo } from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Text,
} from "recharts";

const YAxisLeftTick = ({
  y,
  payload: { value },
}: {
  y: number;
  payload: {
    value: string | number;
  };
}) => {
  return (
    <Text y={y + 5} fill="var(--text-color)">
      {value}
    </Text>
  );
};

export const measureTextWidth = (
  text: string,
  {
    fontSize = 16,
    fontFamily = "Arial",
  }: { fontSize?: number; fontFamily?: string } = {},
) => {
  const ctx = document.createElement("canvas").getContext("2d");
  ctx!.font = fontSize + "px " + fontFamily;
  return ctx!.measureText(text).width;
};

const BAR_AXIS_SPACE = 10;

type TProps = {
  data: any[];
  yKey: string;
  xKey: string;
};
const SimpleBarChart: React.FC<TProps> = ({ data, yKey, xKey }) => {
  const maxTextWidth = useMemo(
    () =>
      data.reduce((acc, cur) => {
        const value = cur[yKey];
        const width = measureTextWidth(value.toLocaleString(), {
          fontSize: 16,
          fontFamily: "Arial",
        });
        if (width > acc) {
          return width;
        }
        return acc;
      }, 0),
    [data, yKey],
  );

  return (
    <ResponsiveContainer width="100%" height={50 * data.length} debounce={50}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{
          left: 20,
          right: maxTextWidth + (BAR_AXIS_SPACE - 8),
        }}
      >
        <XAxis hide axisLine={false} type="number" />
        <YAxis
          yAxisId={0}
          dataKey={xKey}
          type="category"
          axisLine={false}
          tickLine={false}
          fill="var(--text-color)"
          tick={YAxisLeftTick}
        />
        <YAxis
          orientation="right"
          yAxisId={1}
          dataKey={yKey}
          type="category"
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => value.toLocaleString()}
          mirror
          tick={{
            transform: `translate(${maxTextWidth + BAR_AXIS_SPACE})`,
            fill: "var(--text-color)",
          }}
        />
        <Bar dataKey={yKey} minPointSize={2} barSize={32}>
          {data.map((d, idx) => {
            return <Cell key={d[xKey]} fill="var(--primary-color)" />;
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SimpleBarChart;
