import React from "react";
import styled from "styled-components";

type TProps = {
  title: string | React.ReactNode;
  children: React.ReactNode;
  hasAnimation?: boolean;
  width?: string | number;
};

const DashboardBackground: React.FC<TProps> = ({
  children,
  title,
  hasAnimation,
  width = "100%",
}) => {
  return (
    <StyledWrapper width={width}>
      <h3 className="inline-block p-5 m-0 top-8 left-6 text-base font-medium">
        {title}
      </h3>
      <div>{children}</div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.section<{
  width: number | string;
}>`
  width: ${({ width }) => width};
  height: fit-content;
  background-color: var(--upper-background-color);
  border-radius: 1vw;
  //h3 {
  //  display: inline-block;
  //  padding: 20px;
  //  margin: 0;
  //  top: 30px;
  //  left: 25px;
  //  font-size: 16px;
  //  font-weight: 500;
  //}
  > div {
    padding: 0 20px;
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export default DashboardBackground;
