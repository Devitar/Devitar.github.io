import React, { ReactNode, useCallback, useState } from "react";
import styled from "styled-components";
import * as Views from "../views";

/** Controls displaying of views and navigation. */
const NavBar = () => {
  const ViewType = Views as Record<string, () => ReactNode>;
  const [currentRoute, setCurrentRoute] = useState<string>("Portfolio");

  const getRoutes = useCallback(() => {
    const viewNames = Object.keys(Views);

    return viewNames.map((viewName, index) => (
      <NavBarItem
        key={index}
        onRouteSelect={setCurrentRoute}
        viewName={viewName}
        isSelected={currentRoute === viewName}
      />
    ));
  }, [currentRoute]);

  return (
    <PageWrapper>
      <NavBarStyle>{getRoutes()}</NavBarStyle>
      {ViewType[currentRoute]?.()}
    </PageWrapper>
  );
};

type NavBarItemProps = {
  viewName: string;
  onRouteSelect: (viewName: string) => void;
  isSelected: boolean;
};
const NavBarItem = ({
  viewName,
  onRouteSelect,
  isSelected,
}: NavBarItemProps) => {
  const formatRouteName = useCallback(
    () => viewName.replace(/((?<=[a-z])[A-Z]|[A-Z](?=[a-z]))/g, " $1"),
    [viewName]
  );

  return (
    <NavBarItemStyle
      isSelected={isSelected}
      onClick={() => onRouteSelect(viewName)}
    >
      {formatRouteName()}
    </NavBarItemStyle>
  );
};

/** Styles */

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const NavBarStyle = styled.div`
  width: 100vw;
  height: 55px;
  font-size: 22px;
  background-color: #e4e4e4;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 18px;
  z-index: 2;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;

const NavBarItemStyle = styled.div<{ isSelected: boolean }>`
  user-select: none;
  cursor: pointer;
  border-right: 1px solid black;
  padding-right: 12px;
  margin-right: 12px;
  border-bottom: ${({ isSelected }) =>
    isSelected ? "1px solid black" : "none"};
`;

/** Exports */

export default NavBar;
