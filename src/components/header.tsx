import styled from "styled-components";

/** Constants */

export const HEADER_HEIGHT = 55;

/** Types */

type Props = {
  text: string;
};

/** Renders text as a header. */
const Header = ({ text }: Props) => <HeaderStyle>{text}</HeaderStyle>;

/** Styles */

const HeaderStyle = styled.div`
  width: 100%;
  height: ${() => `${HEADER_HEIGHT}px`};
  min-height: 55px;
  font-size: 22px;
  background-color: #e4e4e4;
  z-index: 1;
  box-shadow: 0px 1px 21px 0px rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

/** Exports */

export default Header;
