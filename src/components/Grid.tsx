import { ReactNode, useCallback } from "react";
import styled from "styled-components";

/** Types */

type Props = {
  /** Centers the content horizontally. Default: true */
  center?: boolean;
  /** Adds a gutter between each child, in pixels. Default: 16 */
  gutter?: number;
  children: ReactNode[];
};

/** Displays items in a grid, changing to a column on small screens. */
const Grid = ({ center = true, gutter = 16, children }: Props) => {
  const wrapChild = useCallback(
    (child: ReactNode) => (
      <FlexColumn key={Math.random()} gutter={gutter}>
        {child}
      </FlexColumn>
    ),
    [gutter]
  );

  return (
    // <FlexGrid center={center}>{children}</FlexGrid>
    <FlexGrid center={center}>{children.map((c) => wrapChild(c))}</FlexGrid>
  );
};

/** Styles */

const FlexGrid = styled.div<{ center: boolean }>`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: ${({ center }) => (center ? "center" : undefined)};

  @media (max-width: 600px) {
    display: block;
  }
`;
const FlexColumn = styled.div<{ gutter: number }>`
  margin: ${({ gutter }) => `0px ${gutter}px 0px ${gutter}px`};
`;

/** Exports */

export default Grid;
