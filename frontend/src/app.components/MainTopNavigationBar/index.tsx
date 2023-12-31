"use client";
import React from "react";
import styled from "styled-components";
import ScreenNavigationBarSearchInput from "@/app.feature/navigationBar.search/screen/ScreenNavigationBarSearchInput";
import MenuLinkTabBar from "@/app.components/MainTopNavigationBar/MenuLinkTabBar";

const MainTopNavigationBar = () => {
  return (
    <StyledWrapper>
      <h2>Mini-Tracker</h2>
      <MenuLinkTabBar />
      <ScreenNavigationBarSearchInput />
    </StyledWrapper>
  );
};

export default MainTopNavigationBar;

const StyledWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  align-items: center;
  gap: 50px;
  height: 70px;
  padding: 0 40px;
`;
