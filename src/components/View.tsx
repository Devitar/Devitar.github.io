import { ReactNode } from "react";
import styled from "styled-components";
import { Header } from ".";
import { HEADER_HEIGHT } from "./Header";
import { NAV_BAR_HEIGHT } from "./NavBar";

/** Constants */

export const FADE_IN_TIME = 0.45;

/** Types */

type Props = {
  /** Text displayed on the header of the page. */
  headerText?: string;
  /** Padding applied to the X axis of the page. */
  paddingX?: number;
  /** Centers content in the body of the view. Default: true */
  center?: boolean;
  children?: ReactNode;
};
type BodyStyleType = {
  paddingX?: number;
  center?: boolean;
  minHeight: number;
};

/** Base view component. */
const View = ({ headerText, children, ...passThrough }: Props) => {
  const windowHeight = window.innerHeight;
  const heightCalc =
    headerText && window.innerWidth > 600
      ? windowHeight - (NAV_BAR_HEIGHT + HEADER_HEIGHT)
      : windowHeight - NAV_BAR_HEIGHT;

  return (
    <ViewStyle key={Math.random()}>
      {headerText && window.innerWidth > 600 && <Header text={headerText} />}
      <BodyStyle minHeight={heightCalc} {...passThrough}>
        {children}
      </BodyStyle>
    </ViewStyle>
  );
};

/** Styles */

const ViewStyle = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  /* Invisible, to show the background image. */
  background-color: rgba(245, 245, 245, 0);
`;
const BodyStyle = styled.div<BodyStyleType>`
  min-height: ${({ minHeight }) => `${minHeight}px`};
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  align-items: ${({ center }) => {
    if (center === undefined) center = true;
    return center ? "center" : undefined;
  }};
  padding: 24px ${({ paddingX }) => (paddingX ? `${paddingX}px` : "0px")} 0px
    ${({ paddingX }) => (paddingX ? `${paddingX}px` : "0px")};

  opacity: 0;
  animation: fadeIn ${FADE_IN_TIME}s linear 250ms forwards;
  transition: linear;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

/** Exports */

export default View;
