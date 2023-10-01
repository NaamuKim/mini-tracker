import React, { useState } from "react";
import { Bar, BarChart, Cell, ResponsiveContainer } from "recharts";
import styled from "styled-components";
import DashboardBackground from "@/app.components/dashboard/DashboardBackground";
import { TTopPageTransitions } from "@/app.feature/dashboard.overview/module/type/APIResponseType";

const data = [
  {
    from: "naamukim",
    to: "nanana",
    count: 400,
  },
  {
    from: "nanana",
    to: "jiji",
    count: 300,
  },
  {
    from: "jiji",
    to: "lala",
    count: 200,
  },
  {
    from: "lala",
    to: "papa",
    count: 100,
  },
  {
    from: "papa",
    to: "naamukim",
    count: 50,
  },
];

const PageTransitionBarChart = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (data: TTopPageTransitions, index: number) => {
    setActiveIndex(index);
  };

  return (
    <StyledWrapper>
      <DashboardBackground title="Top Page Transitions">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <Bar
              dataKey="count"
              label={({ count }) => <div>{count}</div>}
              onClick={handleClick}
            >
              {data.map((entry, index) => (
                <Cell
                  cursor="pointer"
                  fill={
                    index === activeIndex
                      ? "var(--primary-color)"
                      : "var(--sub-color)"
                  }
                  key={`cell-${index}`}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="description">
          From: <span className="span-from">{data[activeIndex].from}</span>
          To: <span className="span-to">{data[activeIndex].to}</span>
          Total: <span className="span-value">{data[activeIndex].count}</span>
        </p>
      </DashboardBackground>
    </StyledWrapper>
  );
};

export default PageTransitionBarChart;

const StyledWrapper = styled.div`
  width: 50%;
  .description {
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    margin: 0;
    padding: 0;

    span {
      margin: 0 5px;
    }

    .span-from {
      color: var(--primary-color);
    }

    .span-to {
      color: var(--sub-color);
    }

    .span-value {
      color: var(--section-green);
    }
  }
`;
