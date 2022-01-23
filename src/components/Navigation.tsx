import { Fragment, ReactNode, useCallback, useState } from "react";
import styled from "styled-components";
import { Divider, Text } from ".";
import * as Views from "../views";

/** Constants */

export const NAV_BAR_HEIGHT = window.innerWidth < 600 ? 90 : 75;

/** Controls displaying of views and navigation. */
const NavBar = () => {
  const ViewType = Views as Record<string, () => ReactNode>;
  const [currentRoute, setCurrentRoute] = useState<string>("Portfolio");
  const isSmall = window.innerWidth < 600;

  const getRoutes = useCallback(() => {
    const viewNames = Object.keys(Views);

    return viewNames.map((viewName, index) => (
      <Fragment key={index}>
        <NavBarItem
          onRouteSelect={setCurrentRoute}
          viewName={viewName}
          isSelected={currentRoute === viewName}
          isSmall={isSmall}
        />
        {index !== viewNames.length - 1 && <Divider vertical spacing={24} />}
      </Fragment>
    ));
  }, [currentRoute, isSmall]);

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
        <NavBarItemContainer>{getRoutes()}</NavBarItemContainer>
        {!isSmall && (
          <NavBarItemContainer style={{ flexDirection: "column" }}>
            <Text align="right" fontSize={32}>
              Devin Curtis
            </Text>
            <Text fontSize={26} link mask="My LinkedIn">
              https://www.linkedin.com/in/devin-curtis/
            </Text>
          </NavBarItemContainer>
        )}
      </NavBarStyle>
      {ViewType[currentRoute]?.()}
    </PageWrapper>
  );
};

type NavBarItemProps = {
  viewName: string;
  onRouteSelect: (viewName: string) => void;
  isSelected: boolean;
  isSmall: boolean;
};
const NavBarItem = ({
  viewName,
  onRouteSelect,
  isSelected,
  isSmall,
}: NavBarItemProps) => {
  const formatRouteName = useCallback(() => {
    const formattedViewName = viewName.replace(/([A-Z]+)/g, " $1").trim();
    const shortenedViewName = formattedViewName.replace(/ .*/, "");

    return isSmall ? shortenedViewName : formattedViewName;
  }, [isSmall, viewName]);

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
  background-color: #e4e4e4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  /* Disable these if the views have headers. */
  box-shadow: 0px 1px 21px 0px rgba(0, 0, 0, 0.4);
  border-radius: 0px 0px 15px 15px;
`;
const NavBarItemContainer = styled.div`
  height: ${() => `${NAV_BAR_HEIGHT}px`};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 8px 8px 18px;
  box-sizing: border-box;
`;
const NavBarItemStyle = styled.div<{ isSelected: boolean }>`
  user-select: none;
  cursor: pointer;
  height: 100%;
  font-size: 22px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-sizing: border-box;
  padding-bottom: 8px;
  margin-bottom: 8px;
  text-align: center;

  color: ${({isSelected}) => isSelected ? "RGBA(0, 0, 0, 1)" : "RGBA(0, 0, 0, 0.5)"};

  border-bottom: ${({ isSelected }) =>
    isSelected ? "1px solid black" : "none"};

  transition: transform 250ms;
  :hover {
    transform: translateY(-4px);
  }
`;

/** Exports */

export default NavBar;
