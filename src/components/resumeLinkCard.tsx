import React from 'react';
import '../components/scss/resumeLinkCard.scss';

interface CardProps {
    title: string,
    subtitle: string,
    url: string,
    image: string,
};

const ResumeLinkCard = ({ title, subtitle, url, image }: CardProps) => (
    <div className="mainCard">
        <div className="cardTitle">
            {title}
        </div>
        <div className="cardContent">
            <div className="contentText">
                {subtitle}
            </div>
            <img className="cardImage" src={url} alt="Portfolio Site Screenshot" />
        </div>
    </div>
) 

export default ResumeLinkCard;
