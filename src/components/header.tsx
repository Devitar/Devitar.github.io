import styled from "styled-components";
import { FADE_IN_TIME } from "./View";

/** Constants */

export const HEADER_HEIGHT = 55;

/** Types */

type Props = {
  text: string;
};

/** Renders text as a header. */
const Header = ({ text }: Props) => (
  <HeaderStyle>
    <HeaderText>{text}</HeaderText>
  </HeaderStyle>
);

/** Styles */

const HeaderStyle = styled.div`
  width: 100%;
  height: ${() => `${HEADER_HEIGHT}px`};
  min-height: 55px;
  font-size: 22px;
  background-color: #e4e4e4;
  z-index: 1;
  box-shadow: 0px 1px 21px 0px rgba(0, 0, 0, 0.4);
`;
const HeaderText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  opacity: 0;
  animation: fadeIn ${FADE_IN_TIME}s linear 250ms forwards;
  -webkit-animation: fadeIn ${FADE_IN_TIME}s linear 250ms forwards;
  -moz-animation: fadeIn ${FADE_IN_TIME}s linear 250ms forwards;
  -o-animation: fadeIn ${FADE_IN_TIME}s linear 250ms forwards;
  -ms-animation: fadeIn ${FADE_IN_TIME}s linear 250ms forwards;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @-moz-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @-o-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @-ms-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

/** Exports */

export default Header;
