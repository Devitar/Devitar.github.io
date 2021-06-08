import React, { ReactNode } from "react";
import styled from "styled-components";
import { Header } from ".";

/** Types */

type Props = {
  /** Text displayed on the header of the page. */
  headerText?: string;
  /** Padding applied to the X axis of the page. */
  padding?: number;
  /** Centers content in the body of the view. Default: true */
  center?: boolean;
  children?: ReactNode;
};

/** Base view component. */
const View = ({ headerText, children, ...passThrough }: Props) => {
  return (
    <ViewStyle>
      {headerText && <Header text={headerText} />}
      <BodyStyle {...passThrough}>{children}</BodyStyle>
    </ViewStyle>
  );
};

/** Styles */

const ViewStyle = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

type BodyStyleType = {
  padding?: number;
  center?: boolean;
};
const BodyStyle = styled.div<BodyStyleType>`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: ${({ center }) => {
    if (center === undefined) center = true;
    return center ? "center" : undefined;
  }};
  padding: 12px ${({ padding }) => (padding ? `${padding}px` : "0px")} 0px
    ${({ padding }) => (padding ? `${padding}px` : "0px")};
`;

/** Exports */

export default View;
