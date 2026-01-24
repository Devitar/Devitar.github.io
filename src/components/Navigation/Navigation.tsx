import { type ReactNode, useState, useMemo } from "react";
import { Link as ScrollLink } from "react-scroll";
import * as Views from "../../views";
import "./Navigation.css";

/** Order in which the pages appear in the nav bar and content. */
const NAV_ORDER = {
  Portfolio: 1,
  Resume: 2,
  ContactMe: 3,
  Test: 4,
} as const;

/** Component */
const Navigation = () => {
  const [activeIcon, setActiveIcon] = useState<number>(1);
  const ViewType = Views as Record<keyof typeof NAV_ORDER, (viewName: string) => ReactNode>;

  const renderPages = useMemo(
    () =>
      (Object.keys(ViewType) as Array<keyof typeof ViewType>)
        .sort((a, b) => NAV_ORDER[a] - NAV_ORDER[b])
        .map((viewName) => ViewType[viewName](viewName)),
    [ViewType]
  );

  return (
    <div className="page-wrapper">
      <div className="navigation-container">
        <ul>
          <li
            className={`navigation-list ${activeIcon === 1 ? "active" : ""}`}
          >
            <span className="navigation-icon" style={{ background: activeIcon === 1 ? "#d73b3e" : undefined }}>
              <ScrollLink
                to={"Portfolio"}
                spy
                smooth
                duration={800}
                onSetActive={() => setActiveIcon(1)}

              >
                <p>Portfolio</p>
              </ScrollLink>
            </span>
          </li>
          <li
            className={`navigation-list ${activeIcon === 2 ? "active" : ""}`}
          >
            <span className="navigation-icon" style={{ background: activeIcon === 2 ? "#3cb371" : undefined }}>
              <ScrollLink
                to={"Resume"}
                spy
                smooth
                duration={800}
                onSetActive={() => setActiveIcon(2)}
              >
                <p>Resume</p>
              </ScrollLink>
            </span>
          </li>
          <li
            className={`navigation-list ${activeIcon === 3 ? "active" : ""}`}
          >
            <span className="navigation-icon" style={{ background: activeIcon === 3 ? "#4169e1" : undefined }}>
              <ScrollLink
                to={"ContactMe"}
                spy
                smooth
                duration={800}
                onSetActive={() => setActiveIcon(3)}
              >
                <p>Contact</p>
              </ScrollLink>
            </span>
          </li>
          <li
            className={`navigation-list ${activeIcon === 4 ? "active" : ""}`}
          >
            <span className="navigation-icon" style={{ background: activeIcon === 4 ? "#09ff00" : undefined }}>
              <ScrollLink
                to={"Test"}
                spy
                smooth
                duration={800}
                onSetActive={() => setActiveIcon(4)}
              >
                <p>Test</p>
              </ScrollLink>
            </span>
          </li>
          <div className="navigation-indicator"></div>
        </ul>
      </div>
      {renderPages}
    </div>
  );
};

/** Exports */

export default Navigation;
