import "./FlipCard.css";

/** Types */

type Props = {
	/** The title of the card, displayed at the top. */
	title: string;
	/** The first subtitle for the hover state of the card. */
	subtitle: string;
	/** The second subtitle for the hover state of the card. */
	subtitle2: string;
	/** The url to navigate to when the card is clicked on. */
	url: string;
	/** The image to display on the card. */
	image: string;
};

/** A card that flips to reveal an image and button on hover. */
const FlipCard = ({ title, subtitle, subtitle2, url, image }: Props) => {

	return (
		<div className="flip-card-wrapper">
			<div className="flip-card-inner">
				<div className="flip-card-front">
					<h1>{title}</h1>
					<p>{subtitle}</p>
					<p>{subtitle2}</p>
				</div>
				<div className="flip-card-back">
					<img className="flip-card-image" src={image} alt="Portfolio Site Screenshot" />
					<button className="flip-card-button" onClick={() => window.open(url, "")}>View Project</button>
				</div>
			</div>
		</div>
	)
}

/** Exports */

export default FlipCard;
