import type { ReactNode } from 'react';
import './BinderView.css';

type Props = {
  children: ReactNode;
  className?: string;
};

const BinderView = ({ children, className = '' }: Props) => {
  return <div className={`binder-view ${className}`}>{children}</div>;
};

export default BinderView;
