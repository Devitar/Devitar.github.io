import "./Divider.css";

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
    <div
      className="vertical-divider"
      style={{
        backgroundColor: color,
        margin: `0px ${spacing}px 0px ${spacing}px`
      }}
    />
  ) : (
    <div
      className="horizontal-divider"
      style={{
        backgroundColor: color,
        margin: `${spacing}px 0px ${spacing}px 0px`
      }}
    />
  );

/** Exports */

export default Divider;
