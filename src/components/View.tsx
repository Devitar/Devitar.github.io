import { ReactNode } from "react";
import styled from "styled-components";
import ViewHeader, { HEADER_HEIGHT } from "./ViewHeader";

/** Types */

type Props = {
  /** Centers content in the body of the view. Default: true */
  center?: boolean;
  /** Text displayed on the header of the page. */
  headerText?: string;
  /** Padding applied to the X axis of the page. */
  paddingX?: number;
  /** Passes in inline styling to the page component. */
  style?: React.CSSProperties;
  /** Passes the name of the view as the ID. */
  viewId: string;
  children?: ReactNode;
};
type BodyStyleType = Pick<Props, "center" | "paddingX"> & { minHeight: number };

/** Base view component. */
const View = ({
  viewId,
  headerText,
  children,
  style,
  ...passThrough
}: Props) => {
  const windowHeight = window.innerHeight;
  const heightCalc =
    headerText && window.innerWidth > 600
      ? windowHeight - HEADER_HEIGHT
      : windowHeight;

  return (
    <ViewStyle id={viewId} style={style}>
      {headerText && window.innerWidth > 600 && (
        <ViewHeader text={headerText} />
      )}
      <BodyStyle minHeight={heightCalc} {...passThrough}>
        {children}
      </BodyStyle>
      <div style={{}}></div>
    </ViewStyle>
  );
};

/** Styles */

const ViewStyle = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 2;

  /* Invisible, to show the background image. */
  background-color: rgba(245, 245, 245, 0);
`;
const BodyStyle = styled.div<BodyStyleType>`
  align-items: ${({ center }) => {
    if (center === undefined) center = true;
    return center ? "center" : undefined;
  }};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: ${({ minHeight }) => `${minHeight}px`};
  padding: 24px ${({ paddingX }) => (paddingX ? `${paddingX}px` : "0px")} 0px
    ${({ paddingX }) => (paddingX ? `${paddingX}px` : "0px")};
  width: 100%;
`;

/** Exports */

export default View;
