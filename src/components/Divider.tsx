import styled from "styled-components";

/** Types */

type Props = {
  /** Color of the divider. Default: black */
  color?: string;
  /** How much space in pixels should be to the left and right of the divider. Default: 12 */
  spacing?: number;
  /** Changes the divider to be vertical. Default: false */
  vertical?: boolean;
};

/** A horizontal or vertical divider. */
const Divider = ({ color = "black", spacing = 12, vertical = false }: Props) =>
  vertical ? (
    <VerticalDivider color={color} spacing={spacing} />
  ) : (
    <HorizontalDivider color={color} spacing={spacing} />
  );

/** Styles */

const HorizontalDivider = styled.div<Omit<Props, "vertical">>`
  width: 100%;
  height: 1px;
  background-color: ${({ color }) => color};
  margin: ${({ spacing }) => `${spacing}px 0px ${spacing}px 0px`};
`;
const VerticalDivider = styled.div<Omit<Props, "vertical">>`
  width: 1px;
  height: 100%;
  background-color: ${({ color }) => color};
  margin: ${({ spacing }) => `0px ${spacing}px 0px ${spacing}px`};
`;

/** Exports */

export default Divider;
