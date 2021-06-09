import { ReactNode } from "react";
import styled from "styled-components";

/** Types */

type Props = {
  /** Whether to justify the text to the center, left, right, top or bottom. Default: left */
  align?: "center" | "left" | "right";
  /** Bolds the text. Default: false */
  bold?: boolean;
  /** Colors the text. Default: black */
  color?: string;
  /** Sets the font size in pixels. Default: 14 */
  fontSize?: number;
  /** Flags the text as a link (of a certain type if chosen, will use a generic if not),
   * and will be rendered as an <a> tag instead. Default: false */
  link?: boolean | "email" | "telephone" | "textMessage";
  /** Masks a link with different text. Ignored if the text is not a link. */
  mask?: string;
  /** Indicates whether to open a link in a new tab or not. Default: true */
  newTab?: boolean;
  children?: ReactNode;
};

/** A malleable component for rendering text or links. */
const Text = ({
  align = "left",
  bold = false,
  color = "black",
  fontSize = 14,
  link = false,
  mask,
  newTab = true,
  children,
}: Props) =>
  !link ? (
    <TextRenderer align={align} bold={bold} color={color} fontSize={fontSize}>
      {children}
    </TextRenderer>
  ) : (
    <LinkRenderer
      href={
        link === "email"
          ? `mailto:${children as string}`
          : link === "telephone"
          ? `tel:${children as string}`
          : link === "textMessage"
          ? `sms:${children as string}`
          : (children as string)
      }
      target={newTab ? "_blank" : undefined}
    >
      {mask ? mask : children}
    </LinkRenderer>
  );

/** Styles */

const TextRenderer = styled.div<Omit<Props, "children" | "link">>`
  background-color: transparent;
  display: flex;
  text-align: ${({ align }) => align};
  font-weight: ${({ bold }) => (bold ? "bold" : 400)};
  font-size: ${({ fontSize }) => `${fontSize}px`};
  color: ${({ color }) => color};
`;
const LinkRenderer = styled.a<Omit<Props, "children" | "link">>`
  background-color: transparent;
  display: flex;
  text-align: ${({ align }) => align};
  font-weight: ${({ bold }) => (bold ? "bold" : 400)};
  font-size: ${({ fontSize }) => `${fontSize}px`};
  color: ${({ color }) => color};
`;

/** Exports */

export default Text;
