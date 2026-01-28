import { type ReactNode } from "react";
import "./Text.css";

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
    <p
      className="text-renderer"
      style={{
        backgroundColor: backgroundColor ?? "transparent",
        color: color,
        fontSize: `${fontSize}px`,
        fontWeight: bold ? "bold" : 400,
        textAlign: align,
      }}
    >
      {children}
    </p>
  ) : (
    <a
      className="link-renderer"
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
      style={{
        backgroundColor: backgroundColor ?? "transparent",
        color: color,
        fontSize: `${fontSize}px`,
        fontWeight: bold ? "bold" : 400,
        textAlign: align,
      }}
    >
      {mask ? mask : children}
    </a>
  );

/** Exports */

export default Text;
