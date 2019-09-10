import React from 'react';
import '../components/scss/resumeLinkCard.scss';

interface CardProps {
    title: string,
    subtitle: string,
    subtitle2: string,
    url: string,
    image: string,
};

function navigateToUrl(url: string) {
    window.open(url,'');
}

const ResumeLinkCard = ({ title, subtitle, subtitle2, url, image }: CardProps) => (
    <div 
    className="mainCard"
    onClick={() => navigateToUrl(url)}
    >
        <div className="cardTitle">
            {title} 
        </div>
        <div className="cardContent">
            <div className="overlay"></div>
            <div className="contentText">
                {subtitle}
                <br />
                {subtitle2}
            </div>
            <div className="imageContainer">
                <img className="cardImage" src={image} alt="Portfolio Site Screenshot" />
            </div>
        </div>
    </div>
) 

export default ResumeLinkCard;
