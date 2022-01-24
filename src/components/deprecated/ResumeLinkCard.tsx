import styled from "styled-components";

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
  /** Size of the inner image */
  imgSize?: string;
};

/** Displays a project and project information in a compact card. */
const ResumeLinkCard = ({ title, subtitle, subtitle2, url, image, imgSize = "75%" }: Props) => (
  <MainCard onClick={() => window.open(url, "")}>
    <CardTitle>{title}</CardTitle>
    <CardContent>
      <Overlay />
      <ContentText>
        {subtitle}
        <br />
        {subtitle2}
      </ContentText>
      <ImageContainer>
        <CardImage width={imgSize} src={image} alt="Portfolio Site Screenshot" />
      </ImageContainer>
    </CardContent>
  </MainCard>
);

/** Styles */

const MainCard = styled.div`
  padding: 0;
  height: 375px;
  width: 365px;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  margin: 18px;
  background-color: rgb(255, 255, 255);
  overflow: hidden;

  @media (max-width: 500px) {
    max-width: 95vw;
    margin-bottom: 3%;
  }
`;
const CardTitle = styled.div`
  width: 100%;
  height: 6%;
  text-align: center;
  display: block;
  font-family: "Livvic";
  font-size: 24px;
`;
const CardContent = styled.div`
  color: black;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100%;
  max-width: 100%;
  position: relative;
  padding-top: 5px;
`;
const ContentText = styled.div`
  display: none;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-family: "Livvic";
  font-size: 20px;

  ${CardContent}:hover & {
    display: block;
  }
`;
const Overlay = styled.div`
  display: none;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 89%;
  width: 105%;
  border-radius: 0 0 15px 15px;

  ${CardContent}:hover & {
    display: block;
  }
`;
const ImageContainer = styled.div`
  width: 100%;
  height: 90%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  object-fit: contain;
`;
const CardImage = styled.img<{width: string}>`
  height: 75%;
  width: ${({width}) => width};
`;

export default ResumeLinkCard;
