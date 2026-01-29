import { type ReactNode, useMemo } from "react";
import * as Views from "~/views";
import "./Navigation.css";

/** Order in which the pages appear in the nav bar and content. */
const NAV_ORDER = {
  Portfolio: 1,
  Resume: 2,
  ContactMe: 3,
} as const;

/** Types  */
const ViewType = Views as Record<keyof typeof NAV_ORDER, (viewName: string) => ReactNode>;

/** Renders the navigation and pages based on NAV_ORDER. */
const Navigation = () => {
  const renderPages = useMemo(
    () =>
      (Object.keys(ViewType) as Array<keyof typeof ViewType>)
        .sort((a, b) => NAV_ORDER[a] - NAV_ORDER[b])
        .map((viewName) => ViewType[viewName](viewName)),
    [ViewType]
  );

  return (
    <div className="page-wrapper">
      {renderPages}
    </div>
  );
};

/** Exports */

export default Navigation;
