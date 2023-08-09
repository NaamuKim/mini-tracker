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
        <article>
          <h4>1200</h4>
          <p>Outgoing</p>
        </article>
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
        <article>
          <h4>2000</h4>
          <p>Incoming</p>
        </article>
      </section>
    </StyledWrapper>
  );
};

export default GoingPageView;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  gap: 30px;
  padding: 30px;
  background-color: var(--upper-background-color);
  border-radius: 20px;
  section {
    display: flex;
    align-items: center;
    gap: 20px;
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
    > article {
      display: flex;
      flex-direction: column;
      h4 {
        font-size: 18px;
        margin: 0;
      }
      p {
        font-size: 12px;
        margin-bottom: 0;
        margin-top: 3px;
        color: var(--text-secondary-color);
      }
    }
  }
`;
