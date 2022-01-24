import styled from "styled-components";

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

/** Component */

const FlipCard = ({ title, subtitle, subtitle2, url, image }: Props) => {

    return (
        <Wrapper>
            <InnerWrap id='innerWrap'>
                <div className="flip-card-front">
                    <h1>{title}</h1>
                    <p>{subtitle}</p>
                    <p>{subtitle2}</p>
                </div>
                <div className="flip-card-back">
                    <CardImage src={image} alt="Portfolio Site Screenshot" />
                    <Button onClick={() => window.open(url, "")}>View Project</Button>
                </div>
            </InnerWrap>
        </Wrapper>
    )
}

/** Styles */

const Wrapper = styled.div`
    background-color: transparent;
    height: 300px;
    margin: 18px;
    perspective: 1000px;
    width: 300px;
    
    h1, p {
        color: #000;
    }

    &:hover{
        #innerWrap {
            transform: rotateY(180deg);
        }
    }

    .flip-card-front, .flip-card-back {
        -webkit-backface-visibility: hidden; /* Safari */
        backface-visibility: hidden;
        border-radius: 8px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
        height: 100%;
        overflow: hidden;
        position: absolute;
        width: 100%;
    }

    .flip-card-front {
        align-items: center;
        background-color: #e4e4e4;
        box-sizing: border-box;
        color: black;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0px 12px;
    }

    .flip-card-back {
        background-color: #bbb;
        color: white;
        transform: rotateY(180deg);
    }
`
const InnerWrap = styled.div`
    height: 100%;
    position: relative;
    text-align: center;
    transform-style: preserve-3d;
    transition: transform 0.4s;
    width: 100%;
`
const CardImage = styled.img<{ width?: string }>`
  height: auto;
  width: 100%;
`
const Button = styled.button`
    background-color: #F2A65A;
    border-radius: 4px;
    border: 0px;
    bottom: 10%;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    color: #fff;
    font-size: 1.2rem;
    height: 50px;
    left: 10%;
    position: absolute;
    width: 80%;

    &:hover {
        cursor: pointer;
        background-color: #f59a3e;
    }
`

/** Exports */

export default FlipCard