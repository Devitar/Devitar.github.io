import styled from "styled-components";

/** Constants */

export const HEADER_HEIGHT = 55;

/** Types */

type Props = {
  text: string;
};

/** Renders text as a header. */
const ViewHeader = ({ text }: Props) => (
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
  animation: fadeIn ${0.45 / 2}s linear 250ms forwards;
  transition: linear;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

/** Exports */

export default ViewHeader;
