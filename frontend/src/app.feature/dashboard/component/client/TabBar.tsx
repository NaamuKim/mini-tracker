import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { useSearchParams } from "next/navigation";

type Tab = {
  name: string;
  href: string;
  param: string;
};

const TabNames: ReadonlyArray<Tab> = [
  {
    name: "Overview",
    href: "/dashboard?tab=overview",
    param: "overview",
  },
  {
    name: "Page Transition",
    href: "/dashboard?tab=page-transition",
    param: "page-transition",
  },
  {
    name: "Click",
    href: "/dashboard?tab=click",
    param: "click",
  },
];
const isCurrentTab = ({
  tabParam,
  currentTab,
}: {
  tabParam: Pick<Tab, "param">;
  currentTab: Pick<Tab, "param">;
}) => currentTab === tabParam;

const TabBar = () => {
  const currentTab =
    (useSearchParams().get("tab") as unknown as Pick<Tab, "param">) ||
    "overview";

  return (
    <StyledWrapper>
      {TabNames.map((tab) => (
        <Link
          key={tab.name}
          href={tab.href}
          className={
            isCurrentTab({
              tabParam: tab.param as unknown as Pick<Tab, "param">,
              currentTab,
            })
              ? "active"
              : ""
          }
        >
          {tab.name}
        </Link>
      ))}
    </StyledWrapper>
  );
};

export default TabBar;

const StyledWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 300px;
  > a {
    text-decoration: none;
    color: var(--text-secondary-color);
    &:hover {
      color: var(--link-hover-color);
    }
    &.active {
      color: var(--link-hover-color);
    }
  }
`;
