import './ImageButton.css';

type Props = {
  image: string;
  alt?: string;
  width?: string;
  height?: string;
  onClick: () => void;
};

const ImageButton = ({ image, alt, width = '5rem', height = '5rem', onClick }: Props) => (
  <button
    className="image-button"
    style={{ width, height }}
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
  >
    <img src={image} alt={alt || ''} className="image-button-image" />
  </button>
);

export default ImageButton;
