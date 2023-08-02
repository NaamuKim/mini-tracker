import React from "react";
import styled from "styled-components";

type TProps = {
  title: string | React.ReactNode;
  children: React.ReactNode;
};

const DashboardBackground: React.FC<TProps> = ({ children, title }) => {
  return (
    <StyledWrapper>
      <h2>{title}</h2>
      {children}
    </StyledWrapper>
  );
};

export default DashboardBackground;

const StyledWrapper = styled.section`
  max-width: 1000px;
  background-color: var(--upper-background-color);
  z-index: 1;
  border-radius: 30px;
  h2 {
    width: 100%;
    margin: 0;
    padding: 30px;
  }

  animation: fadein 2s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
