import React, { ReactNode } from "react";
import styled from "styled-components";
import { Header } from ".";

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
  height: auto;
  width: 100vw;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: rgb(245, 245, 245);
`;

type BodyStyleType = {
  paddingX?: number;
  center?: boolean;
};
const BodyStyle = styled.div<BodyStyleType>`
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
`;

/** Exports */

export default View;
