import './ViewHeader.css';

/** Constants */

export const HEADER_HEIGHT = 55;

/** Types */

type Props = {
  text: string;
};

/** Renders text as a header. */
const ViewHeader = ({ text }: Props) => (
  <div className="view-header">
    <div className="view-header-text">{text}</div>
  </div>
);

/** Exports */

export default ViewHeader;
