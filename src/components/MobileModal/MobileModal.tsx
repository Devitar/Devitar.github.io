import { useState } from 'react';
import './MobileModal.css';
import Button from '../Button/Button';

type Props = {
  title: string;
  content: string;
  buttonText: string;
  onClose?: () => void;
};

const MobileModal = ({ title, content, buttonText, onClose }: Props) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  return (
    <div className='mobile-modal-overlay'>
      <div className='mobile-modal'>
        <h2 className='mobile-modal-title'>{title}</h2>
        <p className='mobile-modal-content'>{content}</p>
        <Button onClick={handleClose}>{buttonText}</Button>
      </div>
    </div>
  );
};

export default MobileModal;
