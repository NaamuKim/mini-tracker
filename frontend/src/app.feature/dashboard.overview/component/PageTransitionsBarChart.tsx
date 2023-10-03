import React, { useState } from "react";
import { Bar, BarChart, Cell, ResponsiveContainer } from "recharts";
import styled from "styled-components";
import DashboardBackground from "@/app.components/dashboard/DashboardBackground";
import { TTopPageTransitions } from "@/app.feature/dashboard.overview/module/type/APIResponseType";
import useQueryFn from "@/app.module/react-query/useQueryFn";
import { API_TOP_PAGE_TRANSITIONS } from "@/app.module/constant/api/app.dashboard/overview";
import { REGEX } from "@/app.module/utils/REGEX";
import { useSearchParams } from "next/navigation";

const PageTransitionsBarChart = () => {
  const queriedUrl = useSearchParams().get("queriedUrl");
  const { data: topPageTransitions } = useQueryFn<
    TTopPageTransitions,
    TTopPageTransitions["topPageTransitions"]
  >(
    [
      API_TOP_PAGE_TRANSITIONS,
      {
        queriedUrl,
      },
    ],
    {
      select: (data) =>
        data.topPageTransitions.map((item) => ({
          ...item,
          from: item.from.replace(REGEX.SLICE_FIRST_SLASH, ""),
          to: item.to.replace(REGEX.SLICE_FIRST_SLASH, ""),
        })),
    },
  );

  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (data: TTopPageTransitions, index: number) => {
    setActiveIndex(index);
  };

  if (!topPageTransitions) return null;

  return (
    <StyledWrapper>
      <DashboardBackground title="Top Page Transitions">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={topPageTransitions}>
            <Bar dataKey="count" onClick={handleClick}>
              {topPageTransitions?.map((entry, index) => (
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
          From:{" "}
          <span className="span-from">
            {topPageTransitions[activeIndex].from}
          </span>
          To:{" "}
          <span className="span-to">{topPageTransitions[activeIndex].to}</span>
          Total:{" "}
          <span className="span-value">
            {topPageTransitions[activeIndex].count}
          </span>
        </p>
      </DashboardBackground>
    </StyledWrapper>
  );
};

export default PageTransitionsBarChart;

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
