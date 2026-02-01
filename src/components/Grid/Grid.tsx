import { type ReactNode, useCallback } from 'react';
import './Grid.css';

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
      <div
        key={Math.random()}
        className='grid-column'
        style={{ margin: `0px ${gutter}px 0px ${gutter}px` }}
      >
        {child}
      </div>
    ),
    [gutter]
  );

  return (
    <div className={`grid-container ${center ? 'grid-center' : ''}`}>
      {children.map((c) => wrapChild(c))}
    </div>
  );
};

/** Exports */

export default Grid;
