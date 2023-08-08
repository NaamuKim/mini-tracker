import React from "react";
import styled from "styled-components";
import Image from "next/image";

const GoingPageView = () => {
  return (
    <StyledWrapper>
      <section>
        <div className="arrow-wrapper red">
          <Image
            width={25}
            height={25}
            src="/images/red-high-arrow.svg"
            alt="outgoing-arrow"
          />
        </div>
        <div>
          <h4>1200</h4>
          <p>outgoing</p>
        </div>
      </section>
      <section>
        <div className="arrow-wrapper yellow">
          <Image
            width={25}
            height={25}
            src="/images/yellow-lower-arrow.svg"
            alt="outgoing-arrow"
          />
        </div>
        <div>
          <h4>2000</h4>
          <p>incoming</p>
        </div>
      </section>
    </StyledWrapper>
  );
};

export default GoingPageView;

const StyledWrapper = styled.div`
  section {
    display: flex;
    > .arrow-wrapper {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 12px;
      &.red {
        background-color: #342c2f;
      }
      &.yellow {
        background-color: #3f3c2e;
      }
    }
  }
`;
