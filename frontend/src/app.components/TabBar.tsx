import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { useSearchParams } from "next/navigation";

const TabNames = [
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
] as const;

type Tab = (typeof TabNames)[number];

const isCurrentTab = ({
  tabParam,
  currentTab,
}: {
  tabParam: Tab["param"];
  currentTab: string;
}) => currentTab === tabParam;

const TabBar = () => {
  const currentTab = useSearchParams().get("tab") || "overview";

  const handleClickLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (href !== TabNames[0].href) {
      alert("This feature is still in development");
      return;
    }

    window.history.pushState(null, "", href);
  };

  return (
    <StyledWrapper>
      {TabNames.map((tab) => (
        <Link
          key={tab.name}
          href={tab.href}
          onClick={handleClickLink}
          className={
            isCurrentTab({ tabParam: tab.param, currentTab })
              ? "active"
              : undefined
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
  gap: 20px;
  font-size: 18px;
  > a {
    height: 30px;
    position: relative;
    text-decoration: none;
    color: var(--text-secondary-color);

    &:hover,
    &:focus {
      color: var(--text-color);
    }

    &.active {
      color: var(--text-color);
      &::after {
        content: "";
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        width: 40%;
        min-width: 20px;
        height: 3px;
        background-color: var(--link-hover-color);
        border-radius: 10px;
      }
    }
  }
`;
