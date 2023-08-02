import React from "react";
import {
  Layer,
  Rectangle,
  ResponsiveContainer,
  Sankey,
  Tooltip,
} from "recharts";
import DashboardBackground from "@/app.feature/dashboard/component/client/DashboardBackground";
import styled from "styled-components";

const Dashboards = () => {
  return (
    <StyledWrapper>
      <DashboardBackground title="Page Transition">
        <ResponsiveContainer aspect={2 / 1}>
          <Sankey
            data={{
              nodes: [
                { name: "1 page" },
                { name: "2 page" },
                { name: "3 page" },
                { name: "4 page" },
                { name: "5 page" },
              ],
              links: [
                { source: 0, target: 1, value: 3728 },
                { source: 0, target: 2, value: 3541 },
                { source: 2, target: 3, value: 6242 },
                { source: 2, target: 4, value: 2917 },
              ],
            }}
            node={({ x, y, width, height, index, payload, containerWidth }) => {
              const isOut = x + width + 6 > containerWidth;
              return (
                <Layer key={`CustomNode${index}`}>
                  <Rectangle
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    fill="#5192ca"
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
                    {payload.name}
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
            margin={{ top: 0, right: 80, bottom: 80, left: 40 }}
            link={{ stroke: "#77c878", strokeWidth: 8 }}
          >
            <Tooltip />
          </Sankey>
        </ResponsiveContainer>
      </DashboardBackground>
    </StyledWrapper>
  );
};

export default Dashboards;

const StyledWrapper = styled.div`
  margin-top: 30px;
`;
