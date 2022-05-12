import { Fragment, ReactNode, useCallback } from "react";
import { Link as ScrollLink } from "react-scroll";
import styled from "styled-components";
import { Divider, Text } from ".";
import * as Views from "../views";

/** Constants */

export const NAV_BAR_HEIGHT = window.innerWidth < 600 ? 90 : 75;

/** Order in which the pages appear in the nav bar and content. */
const NAV_ORDER: Record<string, number> = {
  "Portfolio": 1,
  "Resume": 2,
  "ContactMe": 3,
}

/** Controls displaying of views and navigation. */
const NavBar = () => {
  const ViewType = Views as Record<string, (viewName: string) => ReactNode>;
  const isSmall = window.innerWidth < 600;

  const getRoutes = useCallback(() => {
    const viewNames = Object.keys(Views).sort((a, b) => NAV_ORDER[a] - NAV_ORDER[b]);

    return viewNames.map((viewName, index) => (
      <Fragment key={index}>
        <NavBarItemWrapper>
          <ScrollLink to={viewName} spy smooth duration={800} offset={-NAV_BAR_HEIGHT}>
            <NavBarItem
              viewName={viewName}
              isSmall={isSmall}
            />
          </ScrollLink>
        </NavBarItemWrapper>
        {index !== viewNames.length - 1 && <Divider vertical spacing={24} />}
      </Fragment>
    ));
  }, [isSmall]);

  const renderPages = useCallback(() => 
    Object.keys(ViewType)
      .sort((a, b) => NAV_ORDER[a] - NAV_ORDER[b])
      .map(viewName => ViewType[viewName](viewName))
  , [ViewType])

  return (
    <PageWrapper>
      {/* Spacer for the fixed nav bar, so the first page's content isn't underneath. */}
      <div style={{ height: NAV_BAR_HEIGHT }}></div>
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
      {renderPages()}
    </PageWrapper>
  );
};

type NavBarItemProps = {
  viewName: string;
  isSmall: boolean;
};
const NavBarItem = ({
  viewName,
  isSmall,
}: NavBarItemProps) => {
  const formatRouteName = useCallback(() => {
    const formattedViewName = viewName.replace(/([A-Z]+)/g, " $1").trim();
    const shortenedViewName = formattedViewName.replace(/ .*/, "");

    return isSmall ? shortenedViewName : formattedViewName;
  }, [isSmall, viewName]);

  return (
    <NavBarItemStyle>
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
  width: 100%;
  height: ${() => `${NAV_BAR_HEIGHT}px`};
  background-color: #e4e4e4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  position: fixed;
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
const NavBarItemWrapper = styled.div`
  .active div {
    color: RGBA(0, 0, 0, 1);
    border-bottom: 1px solid black;
  }
`
const NavBarItemStyle = styled.div`
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

  /* These will swap out based on if the ScrollLink above it is 'active'. */
  color: RGBA(0, 0, 0, 0.5);
  border-bottom: none;

  transition: transform 250ms;
  &:hover {
    transform: translateY(-4px);
  }
`;

/** Exports */

export default NavBar;