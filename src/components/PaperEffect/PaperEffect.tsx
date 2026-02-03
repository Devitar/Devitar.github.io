import type { ReactNode } from 'react';
import './PaperEffect.css';

type Props = {
  children: ReactNode;
  className?: string;
  paperBackground?: boolean;
};

const PaperEffect = ({ children, className = '', paperBackground = true }: Props) => {
  const wrapperClass = `paper-wrapper ${paperBackground ? '' : 'no-paper-bg'} ${className}`.trim();
  const contentClass = paperBackground ? 'paper-effect' : '';

  return (
    <div className={wrapperClass}>
      <span className='tape tape-left' />
      <span className='tape tape-right' />
      <div className={contentClass}>{children}</div>
    </div>
  );
};

export default PaperEffect;
