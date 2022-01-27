import { ReactNode } from "react";
import styled from "styled-components";

/** Types */

type Props = {
  /** Whether to justify the text to the center, left, right, top or bottom. Default: left */
  align?: "center" | "left" | "right";
  /** Sets a background color on the text (for readability in some situations). */
  backgroundColor?: string;
  /** Bolds the text. Default: false */
  bold?: boolean;
  children?: ReactNode;
  /** Colors the text. Default: black */
  color?: string;
  /** Sets the font size in pixels. Default: 14 */
  fontSize?: number;
  /** Flags the text as a link (of a certain type if chosen, will use a generic if not),
   * and will be rendered as an `<a>` tag instead. Default: false */
  link?: boolean | "email" | "telephone" | "textMessage";
  /** Masks a link with different text. Ignored if the text is not a link. */
  mask?: string;
  /** Indicates whether to open a link in a new tab or not. Default: true */
  newTab?: boolean;
};

/** A malleable component for rendering text or links. */
const Text = ({
  align = "left",
  backgroundColor,
  bold = false,
  children,
  color = "black",
  fontSize = 14,
  link = false,
  mask,
  newTab = true,
}: Props) =>
  !link ? (
    <TextRenderer align={align} bold={bold} color={color} fontSize={fontSize} backgroundColor={backgroundColor}>
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
      backgroundColor={backgroundColor}
      color={color}
    >
      {mask ? mask : children}
    </LinkRenderer>
  );

/** Styles */

const TextRenderer = styled.div<Omit<Props, "children" | "link">>`
  background-color: ${({ backgroundColor }) => backgroundColor ?? "transparent"};
  color: ${({ color }) => color};
  display: flex;
  font-size: ${({ fontSize }) => `${fontSize}px`};
  font-weight: ${({ bold }) => (bold ? "bold" : 400)};
  text-align: ${({ align }) => align};
`;
const LinkRenderer = styled.a<Omit<Props, "children" | "link">>`
  background-color: ${({ backgroundColor }) => backgroundColor ?? "transparent"};
  color: ${({ color }) => color};
  display: flex;
  font-size: ${({ fontSize }) => `${fontSize}px`};
  font-weight: ${({ bold }) => (bold ? "bold" : 400)};
  text-align: ${({ align }) => align};
`;

/** Exports */

export default Text;
