import type { ReactNode } from 'react';
import './PaperEffect.css';

type Props = {
  children: ReactNode;
  className?: string;
};

const PaperEffect = ({ children, className = '' }: Props) => {
  return (
    <div className={`paper-wrapper ${className}`}>
      <span className="tape tape-left" />
      <span className="tape tape-right" />
      <div className="paper-effect">{children}</div>
    </div>
  );
};

export default PaperEffect;
