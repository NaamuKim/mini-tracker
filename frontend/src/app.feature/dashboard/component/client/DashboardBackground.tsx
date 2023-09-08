import React from "react";
import styled from "styled-components";

type TProps = {
  title: string | React.ReactNode;
  children: React.ReactNode;
  hasAnimation?: boolean;
};

const DashboardBackground: React.FC<TProps> = ({
  children,
  title,
  hasAnimation = false,
}) => {
  return (
    <StyledWrapper hasAnimation={hasAnimation}>
      <h3>{title}</h3>
      <div>{children}</div>
    </StyledWrapper>
  );
};

export default DashboardBackground;

const StyledWrapper = styled.section<{ hasAnimation: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1000px;
  height: fit-content;
  background-color: var(--upper-background-color);
  z-index: 1;
  border-radius: 30px;
  h3 {
    width: 100%;
    margin: 0;
    padding: 35px 0 0 30px;
    font-weight: 500;
  }

  > div {
    width: 100%;
    padding: 30px;
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
