import React from "react";
import styled from "styled-components";
import { Label } from "recharts";

type TProps = {
  title: string | React.ReactNode;
  children: React.ReactNode;
  hasAnimation?: boolean;
  width: string | number;
};

const DashboardBackground: React.FC<TProps> = ({
  children,
  title,
  hasAnimation = false,
  width = "100%",
}) => {
  return (
    <StyledWrapper hasAnimation={hasAnimation} width={width}>
      <h3>{title}</h3>
      <div>{children}</div>
    </StyledWrapper>
  );
};

export default DashboardBackground;

const StyledWrapper = styled.section<{
  hasAnimation: boolean;
  width: number | string;
}>`
  position: relative;
  width: ${({ width }) => width};
  height: fit-content;
  background-color: var(--upper-background-color);
  border-radius: 1vw;
  h3 {
    position: absolute;
    margin: 0;
    top: 30px;
    left: 25px;
    display: flex;
    font-size: 16px;
    font-weight: 500;
  }

  animation: ${({ hasAnimation }) => hasAnimation && "fadein 2s"};

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
