import type { ReactNode, ButtonHTMLAttributes } from 'react';
import './Button.css';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
};

const Button = ({ children, variant = 'primary', className = '', ...props }: Props) => {
  return (
    <button className={`binder-button binder-button--${variant} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
