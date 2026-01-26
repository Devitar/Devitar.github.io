/** Converts an alpha number into a pixel width measurement of the screen's width. */
const usePDFWidth = (widthAlpha: number, maxWidth: number) => {
  const screenWidth = window.innerWidth < 1350 ? window.innerWidth : 1350;
  const remainder = 1 - widthAlpha;
  const width = Math.min(screenWidth - screenWidth * remainder, maxWidth);

  return { width };
};

/** Exports */

export default usePDFWidth;
