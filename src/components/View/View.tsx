import { type ReactNode } from "react";
import ViewHeader, { HEADER_HEIGHT } from "~/components/ViewHeader/ViewHeader";
import "./View.css";

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

/** Base view component. */
const View = ({
  viewId,
  headerText,
  children,
  style,
  center = true,
  paddingX,
}: Props) => {
  const windowHeight = window.innerHeight;
  const heightCalc =
    headerText && window.innerWidth > 600
      ? windowHeight - HEADER_HEIGHT
      : windowHeight;

  return (
    <div className="view-style" id={viewId} style={style}>
      {headerText && window.innerWidth > 600 && (
        <ViewHeader text={headerText} />
      )}
      <div
        className="view-body"
        style={{
          alignItems: center ? "center" : undefined,
          minHeight: `${heightCalc}px`,
          padding: `24px ${paddingX ? `${paddingX}px` : "0px"} 0px ${paddingX ? `${paddingX}px` : "0px"}`,
        }}
      >
        {children}
      </div>
      <div style={{}}></div>
    </div>
  );
};

/** Exports */

export default View;
