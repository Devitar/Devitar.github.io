import type { ReactNode } from 'react';
import './Header.css';

type Props = {
  children: ReactNode;
  className?: string;
  /** Background color of the header. Default: #8b1e2f (maroon) */
  color?: string;
};

const Header = ({ children, className = '', color }: Props) => {
  return (
    <div
      className={`binder-header ${className}`}
      style={color ? { backgroundColor: color } : undefined}
    >
      <h1 className="binder-header-text">{children}</h1>
    </div>
  );
};

export default Header;
