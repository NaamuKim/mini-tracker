import React, { useMemo } from "react";
import styled from "styled-components";
import { usePathname } from "next/navigation";
import Link from "next/link";

const currentMenuMap = {
  dashboard: "home",
  example: "example",
} as const;
const getCurrentMenuName = (pathname: string) => {
  const currentMenu = pathname.split("/")[0] as keyof typeof currentMenuMap;
  return currentMenuMap[currentMenu]
    ? currentMenuMap[currentMenu]
    : currentMenuMap.dashboard;
};

const MenuLinkTabBar = () => {
  const pathname = usePathname();

  const currentMenuName = useMemo(
    () => getCurrentMenuName(pathname),
    [pathname],
  );

  return (
    <StyledWrapper>
      <Link href="/">
        <h2
          className={
            currentMenuName === currentMenuMap.dashboard ? "active" : ""
          }
        >
          Home
        </h2>
      </Link>
      <Link href="/example/1">
        <h2
          className={currentMenuName === currentMenuMap.example ? "active" : ""}
        >
          Example Page
        </h2>
      </Link>
    </StyledWrapper>
  );
};

export default MenuLinkTabBar;

const StyledWrapper = styled.section`
  display: flex;
  gap: 15px;
  h2 {
    cursor: pointer;
    word-spacing: -2px;
    font-size: 16px;
    font-weight: 400;
    color: var(--text-color);
    &.active {
      font-weight: 600;
      color: var(--link-color);
    }
  }
`;
