import type { ReactNode } from 'react';
import './Header.css';

type Props = {
  children: ReactNode;
  className?: string;
};

const Header = ({ children, className = '' }: Props) => {
  return (
    <div className={`binder-header ${className}`}>
      <h1 className="binder-header-text">{children}</h1>
    </div>
  );
};

export default Header;
