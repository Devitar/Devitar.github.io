import { Fragment, ReactNode, useCallback, useState } from "react";
import styled from "styled-components";
import { Divider } from ".";
import * as Views from "../views";

/** Constants */

export const NAV_BAR_HEIGHT = 55;

/** Controls displaying of views and navigation. */
const NavBar = () => {
  const ViewType = Views as Record<string, () => ReactNode>;
  const [currentRoute, setCurrentRoute] = useState<string>("Portfolio");

  const getRoutes = useCallback(() => {
    const viewNames = Object.keys(Views);

    return viewNames.map((viewName, index) => (
      <Fragment key={index}>
        <NavBarItem
          onRouteSelect={setCurrentRoute}
          viewName={viewName}
          isSelected={currentRoute === viewName}
        />
        <Divider vertical spacing={24} />
      </Fragment>
    ));
  }, [currentRoute]);

  return (
    <PageWrapper>
      <NavBarStyle
        style={{
          boxShadow:
            window.innerWidth < 600
              ? "0px 1px 21px 0px rgba(0, 0, 0, 0.4)"
              : undefined,
        }}
      >
        {getRoutes()}
      </NavBarStyle>
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
  height: ${() => `${NAV_BAR_HEIGHT}px`};
  font-size: 22px;
  background-color: #e4e4e4;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 0px 0px 18px;
  z-index: 2;
  box-sizing: border-box;
`;

const NavBarItemStyle = styled.div<{ isSelected: boolean }>`
  user-select: none;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-sizing: border-box;
  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: ${({ isSelected }) =>
    isSelected ? "1px solid black" : "none"};

  transition: transform 250ms;
  :hover {
    transform: translateY(-10px);
  }
`;

/** Exports */

export default NavBar;
